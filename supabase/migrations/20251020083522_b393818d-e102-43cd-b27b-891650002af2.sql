-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view published team members"
ON public.team_members
FOR SELECT
USING (published = true);

CREATE POLICY "Admins can manage team members"
ON public.team_members
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();