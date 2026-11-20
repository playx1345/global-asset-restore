import { z } from "zod";

export const INTAKE_DRAFT_KEY = "spectra-intake-draft";
export const INTAKE_AUTH_PATH = "/auth?returnTo=%2Fstart";

const draftSchema = z.object({
  step: z.literal(3),
  incident: z.enum(["crypto", "exchange", "messaging", "social", "email", "data"]),
  loss: z.enum(["none", "lt1k", "1k-10k", "10k-100k", "gt100k"]),
  when: z.enum(["24h", "week", "month", "older"]),
  details: z.object({
    platform: z.string().max(100),
    reference: z.string().max(200),
    summary: z.string().max(1500),
  }),
  contact: z.object({ name: z.string().max(100), email: z.string().max(255) }),
});

export type IntakeDraft = z.infer<typeof draftSchema>;

export function readIntakeDraft(storage: Pick<Storage, "getItem">): IntakeDraft | null {
  try {
    const raw = storage.getItem(INTAKE_DRAFT_KEY);
    if (!raw) return null;
    const result = draftSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function saveIntakeDraft(storage: Pick<Storage, "setItem">, draft: unknown): boolean {
  try {
    storage.setItem(INTAKE_DRAFT_KEY, JSON.stringify(draftSchema.parse(draft)));
    return true;
  } catch {
    return false;
  }
}

export function clearIntakeDraft(storage: Pick<Storage, "removeItem">): void {
  try {
    storage.removeItem(INTAKE_DRAFT_KEY);
  } catch {
    // Storage may be disabled; a successful case submission must still be shown.
  }
}

// Only the assessment is an allowed alternative to the normal portal destination.
export function authReturnPath(search: string): "/start" | "/portal" {
  return new URLSearchParams(search).get("returnTo") === "/start" ? "/start" : "/portal";
}