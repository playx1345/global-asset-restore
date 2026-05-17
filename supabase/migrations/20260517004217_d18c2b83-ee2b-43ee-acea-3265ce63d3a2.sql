-- 1. case_comments: ensure clients can only insert with their own user_id
DROP POLICY IF EXISTS "Clients can insert comments on own cases" ON public.case_comments;
CREATE POLICY "Clients can insert comments on own cases"
  ON public.case_comments FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_comments.case_id
        AND cases.client_id = auth.uid()
    )
  );

-- 2. case_attachments: ensure clients can only insert attachments tied to themselves
DROP POLICY IF EXISTS "Clients can insert attachments on own cases" ON public.case_attachments;
CREATE POLICY "Clients can insert attachments on own cases"
  ON public.case_attachments FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_attachments.case_id
        AND cases.client_id = auth.uid()
    )
  );

-- 3. case_messages: ensure sender_id matches the authenticated user
DROP POLICY IF EXISTS "Clients can insert messages on own cases" ON public.case_messages;
CREATE POLICY "Clients can insert messages on own cases"
  ON public.case_messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_messages.case_id
        AND cases.client_id = auth.uid()
    )
  );

-- 4. cases: prevent client_id hijacking on UPDATE
DROP POLICY IF EXISTS "Clients can update own cases" ON public.cases;
CREATE POLICY "Clients can update own cases"
  ON public.cases FOR UPDATE
  USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);

-- 5. case_messages: allow admins to delete (moderation + GDPR)
CREATE POLICY "Admins can delete messages"
  ON public.case_messages FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Harden update_updated_at with fixed search_path
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;