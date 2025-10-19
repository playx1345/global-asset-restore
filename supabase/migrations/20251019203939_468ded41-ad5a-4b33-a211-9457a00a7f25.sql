-- Add assigned_to column to cases table
ALTER TABLE public.cases ADD COLUMN assigned_to uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX idx_cases_assigned_to ON public.cases(assigned_to);

-- Create case_comments table
CREATE TABLE public.case_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_case_comments_case_id ON public.case_comments(case_id);
CREATE INDEX idx_case_comments_created_at ON public.case_comments(created_at DESC);

-- Enable RLS on case_comments
ALTER TABLE public.case_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_comments
CREATE POLICY "Admins can view all comments"
  ON public.case_comments
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert comments"
  ON public.case_comments
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all comments"
  ON public.case_comments
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all comments"
  ON public.case_comments
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view comments on own cases"
  ON public.case_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_comments.case_id
        AND cases.client_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert comments on own cases"
  ON public.case_comments
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_comments.case_id
        AND cases.client_id = auth.uid()
    )
  );

-- Add trigger for updated_at on case_comments
CREATE TRIGGER update_case_comments_updated_at
  BEFORE UPDATE ON public.case_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Update RLS policy for assigned admins to view cases
CREATE POLICY "Assigned admins can view their cases"
  ON public.cases
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') AND assigned_to = auth.uid()
  );

CREATE POLICY "Assigned admins can update their cases"
  ON public.cases
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin') AND assigned_to = auth.uid()
  );