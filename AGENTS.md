# Project rules
- The case intake wizard lives in one component reused by the /start page; it hands off via a pre-filled WhatsApp link for everyone and inserts into `cases` only for signed-in users, because case rows require an authenticated owner under RLS.
- Homepage-specific styling is scoped under `.reference-home`, and navigation accepts a compact presentation mode, so reference-inspired homepage changes do not restyle other routes or change authentication behavior.
