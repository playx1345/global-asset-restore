import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bitcoin,
  Landmark,
  MessageCircle,
  Instagram,
  Mail,
  Database,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "12495275672";

type Incident = { id: string; label: string; hint: string; icon: LucideIcon };

const incidents: Incident[] = [
  { id: "crypto", label: "Crypto / DeFi Loss", hint: "Stolen or lost coins, wallet drains", icon: Bitcoin },
  { id: "exchange", label: "Exchange or Investment Fraud", hint: "Fake platforms, blocked withdrawals", icon: Landmark },
  { id: "messaging", label: "WhatsApp / Messaging Account", hint: "Hacked, banned or locked account", icon: MessageCircle },
  { id: "social", label: "Social Media Account", hint: "Instagram, Facebook, other hijacks", icon: Instagram },
  { id: "email", label: "Email / Phishing", hint: "Compromised mailbox or phishing", icon: Mail },
  { id: "data", label: "Data Recovery", hint: "Devices, cloud, corrupted files", icon: Database },
];

const lossRanges = [
  { id: "none", label: "No money lost" },
  { id: "lt1k", label: "Under $1,000" },
  { id: "1k-10k", label: "$1,000 – $10,000" },
  { id: "10k-100k", label: "$10,000 – $100,000" },
  { id: "gt100k", label: "Over $100,000" },
];

const timeframes = [
  { id: "24h", label: "Within 24 hours" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
  { id: "older", label: "More than a month ago" },
];

const detailsSchema = z.object({
  platform: z.string().trim().min(2, "Tell us the platform or asset involved").max(100),
  reference: z.string().trim().max(200).optional(),
  summary: z
    .string()
    .trim()
    .min(20, "Please describe what happened (at least 20 characters)")
    .max(1500, "Please keep this under 1500 characters"),
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
});

type Priority = "low" | "medium" | "high" | "urgent";

const computePriority = (loss: string, when: string): Priority => {
  if (loss === "gt100k" || (when === "24h" && loss !== "none" && loss !== "lt1k")) return "urgent";
  if (loss === "10k-100k" || when === "24h") return "high";
  if (loss === "1k-10k" || when === "week") return "medium";
  return "low";
};

const triageInfo: Record<Priority, { label: string; eta: string }> = {
  urgent: { label: "Urgent", eta: "Specialist review within 2 hours" },
  high: { label: "High", eta: "Specialist review within 6 hours" },
  medium: { label: "Standard", eta: "Specialist review within 24 hours" },
  low: { label: "Standard", eta: "Specialist review within 24 hours" },
};

const steps = ["Incident", "Details", "Assessment", "Submit"];

const IntakeWizard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [incident, setIncident] = useState<string>("");
  const [loss, setLoss] = useState("");
  const [when, setWhen] = useState("");
  const [details, setDetails] = useState({ platform: "", reference: "", summary: "" });
  const [contact, setContact] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const incidentLabel = incidents.find((i) => i.id === incident)?.label ?? "";
  const lossLabel = lossRanges.find((l) => l.id === loss)?.label ?? "";
  const whenLabel = timeframes.find((t) => t.id === when)?.label ?? "";
  const priority = useMemo(() => computePriority(loss, when), [loss, when]);

  const brief = useMemo(
    () =>
      [
        "Hello SPECTRA TRACE, I'd like a case assessment.",
        `Incident: ${incidentLabel}`,
        `Platform/asset: ${details.platform}`,
        details.reference ? `Reference: ${details.reference}` : "",
        `Estimated loss: ${lossLabel}`,
        `When: ${whenLabel}`,
        `Summary: ${details.summary}`,
        contact.name ? `Name: ${contact.name}` : "",
        contact.email ? `Email: ${contact.email}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    [incidentLabel, details, lossLabel, whenLabel, contact]
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;

  const next = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !incident) e.incident = "Select the type of incident to continue";
    if (step === 1) {
      const r = detailsSchema.safeParse(details);
      if (!r.success) r.error.issues.forEach((i) => (e[String(i.path[0])] = i.message));
      if (!loss) e.loss = "Select an estimated loss";
      if (!when) e.when = "Select when it happened";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
  };

  const validateContact = () => {
    const r = contactSchema.safeParse(contact);
    const e: Record<string, string> = {};
    if (!r.success) r.error.issues.forEach((i) => (e[String(i.path[0])] = i.message));
    setErrors(e);
    return r.success;
  };

  const submitToPortal = async () => {
    if (!user || !validateContact()) return;
    setSubmitting(true);
    const { error } = await supabase.from("cases").insert({
      client_id: user.id,
      title: `${incidentLabel} — ${details.platform}`.slice(0, 200),
      description: brief.slice(0, 4000),
      priority,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not submit", description: "Please try again or use WhatsApp.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    if (!validateContact()) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const pillClass = (active: boolean) =>
    `px-4 py-2.5 rounded-xl border text-sm text-left transition-all duration-300 ${
      active
        ? "border-primary bg-primary/15 text-foreground shadow-glow"
        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
    }`;

  if (submitted) {
    return (
      <Card variant="neon" className="p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex p-4 rounded-full bg-primary/15 mb-6">
          <Check className="h-10 w-10 text-primary icon-glow" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">Case submitted</h2>
        <p className="text-muted-foreground mb-8">
          Your case is in the secure portal. A specialist will review it and update you there.
        </p>
        <Button variant="neon" size="lg" asChild>
          <Link to="/portal">Open My Portal</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <ol className="flex items-center justify-between mb-8 gap-2" aria-label="Progress">
        {steps.map((label, i) => (
          <li key={label} className="flex-1 flex flex-col items-center gap-2">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold border transition-all duration-300 ${
                i < step
                  ? "bg-primary text-primary-foreground border-primary"
                  : i === step
                  ? "border-primary text-primary shadow-glow"
                  : "border-border text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <Card variant="neon" className="p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">What happened?</h2>
                <p className="text-sm text-muted-foreground mb-5">Choose the option that fits best.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {incidents.map((i) => (
                    <button
                      type="button"
                      key={i.id}
                      onClick={() => setIncident(i.id)}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                        incident === i.id
                          ? "border-primary bg-primary/15 shadow-glow"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <i.icon className="h-6 w-6 text-primary shrink-0 icon-glow" />
                      <span>
                        <span className="block font-semibold text-foreground">{i.label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{i.hint}</span>
                      </span>
                    </button>
                  ))}
                </div>
                {errors.incident && <p className="text-sm text-destructive mt-3">{errors.incident}</p>}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">Case details</h2>
                  <p className="text-sm text-muted-foreground">Share what you know. Never send passwords or seed phrases.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform, asset or account</Label>
                  <Input
                    id="platform"
                    maxLength={100}
                    placeholder="e.g. Binance, USDT, @myhandle"
                    value={details.platform}
                    onChange={(e) => setDetails({ ...details, platform: e.target.value })}
                  />
                  {errors.platform && <p className="text-sm text-destructive">{errors.platform}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Wallet address or transaction hash (optional)</Label>
                  <Input
                    id="reference"
                    maxLength={200}
                    placeholder="0x… / bc1…"
                    value={details.reference}
                    onChange={(e) => setDetails({ ...details, reference: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estimated loss</Label>
                  <div className="flex flex-wrap gap-2">
                    {lossRanges.map((l) => (
                      <button type="button" key={l.id} onClick={() => setLoss(l.id)} className={pillClass(loss === l.id)}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                  {errors.loss && <p className="text-sm text-destructive">{errors.loss}</p>}
                </div>
                <div className="space-y-2">
                  <Label>When did it happen?</Label>
                  <div className="flex flex-wrap gap-2">
                    {timeframes.map((t) => (
                      <button type="button" key={t.id} onClick={() => setWhen(t.id)} className={pillClass(when === t.id)}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {errors.when && <p className="text-sm text-destructive">{errors.when}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary">What happened?</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    maxLength={1500}
                    placeholder="Briefly describe the incident in your own words."
                    value={details.summary}
                    onChange={(e) => setDetails({ ...details, summary: e.target.value })}
                  />
                  {errors.summary && <p className="text-sm text-destructive">{errors.summary}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Preliminary assessment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">Priority</p>
                    <p className="text-xl font-bold gradient-text">{triageInfo[priority].label}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">Response time</p>
                    <p className="text-sm font-semibold text-foreground">{triageInfo[priority].eta}</p>
                  </div>
                </div>
                <dl className="text-sm space-y-2 p-4 rounded-xl border border-border">
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Incident</dt><dd className="text-foreground text-right">{incidentLabel}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Platform</dt><dd className="text-foreground text-right break-all">{details.platform}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Estimated loss</dt><dd className="text-foreground text-right">{lossLabel}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">When</dt><dd className="text-foreground text-right">{whenLabel}</dd></div>
                </dl>
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  This is a triage estimate only. Recovery outcomes are never guaranteed and are confirmed after a specialist review.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">Send your case</h2>
                  <p className="text-sm text-muted-foreground">Your details stay confidential.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input id="name" maxLength={100} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" maxLength={255} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button variant="neon" size="lg" className="gap-2" onClick={openWhatsApp}>
                    <MessageCircle className="h-5 w-5" /> Send brief on WhatsApp
                  </Button>
                  {user ? (
                    <Button variant="cyber" size="lg" className="gap-2" onClick={submitToPortal} disabled={submitting}>
                      <Send className="h-5 w-5" /> {submitting ? "Submitting…" : "Submit to my secure portal"}
                    </Button>
                  ) : (
                    <Button variant="cyber" size="lg" asChild>
                      <Link to="/auth">Sign in to track this case in the portal</Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 gap-3">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < 3 && (
            <Button variant="neon" onClick={next} className="gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default IntakeWizard;
