-- Create enum types for case status and priority
CREATE TYPE public.case_status AS ENUM ('pending', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.case_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create cases table
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status public.case_status NOT NULL DEFAULT 'pending',
  priority public.case_priority NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admins
CREATE POLICY "Admins can view all cases"
  ON public.cases
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert cases"
  ON public.cases
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all cases"
  ON public.cases
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cases"
  ON public.cases
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for clients
CREATE POLICY "Clients can view own cases"
  ON public.cases
  FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert own cases"
  ON public.cases
  FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update own cases"
  ON public.cases
  FOR UPDATE
  USING (auth.uid() = client_id);

-- Create indexes for performance
CREATE INDEX idx_cases_client_id ON public.cases(client_id);
CREATE INDEX idx_cases_status ON public.cases(status);
CREATE INDEX idx_cases_created_at ON public.cases(created_at DESC);

-- Add trigger for updated_at
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();