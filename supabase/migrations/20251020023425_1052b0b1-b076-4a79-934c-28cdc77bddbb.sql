-- Create storage bucket for case attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'case-attachments',
  'case-attachments',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg', 'image/png', 'image/gif', 'application/zip']
);

-- Create case_attachments table
CREATE TABLE public.case_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create indexes for case_attachments
CREATE INDEX case_attachments_case_id_idx ON public.case_attachments(case_id);
CREATE INDEX case_attachments_created_at_idx ON public.case_attachments(created_at);

-- Enable RLS on case_attachments
ALTER TABLE public.case_attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_attachments
CREATE POLICY "Admins can view all attachments"
  ON public.case_attachments FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert attachments"
  ON public.case_attachments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete attachments"
  ON public.case_attachments FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view attachments on own cases"
  ON public.case_attachments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_attachments.case_id
      AND cases.client_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert attachments on own cases"
  ON public.case_attachments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_attachments.case_id
      AND cases.client_id = auth.uid()
    )
  );

-- Storage RLS policies for case-attachments bucket
CREATE POLICY "Admins can upload files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'case-attachments' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can view all files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'case-attachments' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'case-attachments' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Clients can upload files to own cases"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'case-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.cases WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Clients can view files on own cases"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'case-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.cases WHERE client_id = auth.uid()
    )
  );

-- Create case_messages table
CREATE TABLE public.case_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create indexes for case_messages
CREATE INDEX case_messages_case_id_idx ON public.case_messages(case_id);
CREATE INDEX case_messages_created_at_idx ON public.case_messages(created_at);
CREATE INDEX case_messages_case_id_created_at_idx ON public.case_messages(case_id, created_at);

-- Enable RLS on case_messages
ALTER TABLE public.case_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_messages
CREATE POLICY "Admins can view all messages"
  ON public.case_messages FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert messages"
  ON public.case_messages FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update messages"
  ON public.case_messages FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view messages on own cases"
  ON public.case_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_messages.case_id
      AND cases.client_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert messages on own cases"
  ON public.case_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_messages.case_id
      AND cases.client_id = auth.uid()
    )
  );

-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.case_attachments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.case_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cases;
ALTER PUBLICATION supabase_realtime ADD TABLE public.case_comments;