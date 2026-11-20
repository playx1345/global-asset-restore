# Project rules
- The case intake wizard lives in one component reused by the /start page; it hands off via a pre-filled WhatsApp link for everyone and inserts into `cases` only for signed-in users, because case rows require an authenticated owner under RLS.
- Homepage-specific styling is scoped under `.reference-home`, and navigation accepts a compact presentation mode, so reference-inspired homepage changes do not restyle other routes or change authentication behavior.
- Save assessment sign-in handoffs in validated sessionStorage and clear them after successful submission; this preserves confidential answers across route remounts without long-lived local storage.
- The auth page owns post-login navigation with an allowlisted assessment return path; auth state events must not redirect globally because session refreshes can interrupt active workflows.
