-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- Full-time, Part-time, Internship, Contract
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT,
  github_url TEXT,
  cover_letter TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, reviewing, accepted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent errors
DO $$
BEGIN
    DROP POLICY IF EXISTS "Anyone can view published jobs" ON public.jobs;
    DROP POLICY IF EXISTS "Admins can manage jobs" ON public.jobs;
    DROP POLICY IF EXISTS "Anyone can insert job applications" ON public.job_applications;
    DROP POLICY IF EXISTS "Admins can view job applications" ON public.job_applications;
    DROP POLICY IF EXISTS "Admins can manage job applications" ON public.job_applications;
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- Policies for jobs
CREATE POLICY "Anyone can view published jobs"
ON public.jobs
FOR SELECT
USING (published = true);

CREATE POLICY "Admins can manage jobs"
ON public.jobs
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for job_applications
CREATE POLICY "Anyone can insert job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view job applications"
ON public.job_applications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage job applications"
ON public.job_applications
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for jobs updated_at if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_jobs_updated_at') THEN
    CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;
