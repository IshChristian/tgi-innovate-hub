import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Clock, Search, Building2, Send } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  sort_order: number | null;
  published: boolean | null;
}

const Careers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    github_url: "",
    resume_url: "",
    cover_letter: "",
  });

  const { data: jobs = [], isLoading, error: jobsError } = useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      const { data, error } = await supabase.from("jobs").select("*").eq("published", true).order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department)))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("job_applications").insert({
        job_id: selectedJob.id,
        name: formData.name.trim(), email: formData.email.trim(), phone: formData.phone.trim(),
        resume_url: formData.resume_url.trim() || null, github_url: formData.github_url.trim() || null,
        cover_letter: formData.cover_letter.trim(),
      });
      if (error) throw error;
      toast({ title: "Application submitted", description: "Thank you. Our hiring team has received your application." });
      resetForm();
    } catch {
      toast({ title: "Application not submitted", description: "Please try again later. Your details have not been sent.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      github_url: "",
      resume_url: "",
      cover_letter: "",
    });
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-background via-background to-muted/20">
      <Header />

      <main className="flex-grow pt-28 pb-16">
        {/* Careers Hero */}
        <section className="py-12 md:py-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>
          <div className="section-container relative z-10 space-y-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm bg-accent/10 text-accent font-semibold rounded-full border border-accent/20">
              Careers at Tian Group
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
              Build the Future With Us
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join a team of passionate engineers, designers, and innovators building cutting-edge solutions in AI, automation, and smart systems.
            </p>
          </div>
        </section>

        {/* Job Portal Search and Filters */}
        <section className="section-container pb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-border/80 shadow-sm mb-12">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or keyword..."
                className="pl-11 h-11 border-border rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(dept)}
                  className="rounded-xl px-4 py-2 font-medium"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Postings Grid */}
          {jobsError ? <p role="alert" className="text-center text-destructive py-10">Job listings could not load. Please try again later.</p> : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-background/40 rounded-2xl border border-dashed border-border p-8">
              <Building2 className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary">No positions found</h3>
              <p className="text-muted-foreground mt-2">
                We couldn't find any job openings matching your current search criteria.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-xl"
                onClick={() => { setSearchTerm(""); setSelectedDepartment("All"); }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(20,38,62,0.06)] hover:-translate-y-1"
                >
                  <CardHeader className="p-6 pb-2 space-y-4">
                    <div className="flex flex-wrap gap-2 justify-between items-start">
                      <Badge className="bg-secondary text-secondary-foreground font-semibold px-2.5 py-1 text-xs">
                        {job.department}
                      </Badge>
                      <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5 font-semibold text-xs">
                        {job.type}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold text-primary">
                      {job.title}
                    </CardTitle>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 border-b border-border/40 pb-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        {job.type}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1.5">Job Overview</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1.5">Key Requirements</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {job.requirements}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-accent text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-4"
                      onClick={() => handleApplyClick(job)}
                    >
                      Apply For This Position
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[90%] max-h-screen overflow-auto rounded-3xl border border-border bg-background p-8 sm:p-10 flex flex-col justify-center mx-auto">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="text-3xl font-extrabold text-primary text-center">
              Apply for {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center max-w-md mx-auto">
              Please fill out the form below to submit your application to our hiring team.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-primary">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                  className="rounded-xl h-11 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-primary">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting}
                  className="rounded-xl h-11 border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-primary">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+250 788 123 456"
                  required
                  disabled={isSubmitting}
                  className="rounded-xl h-11 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github_url" className="text-sm font-semibold text-primary">GitHub/Portfolio Link</Label>
                <Input
                  id="github_url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  placeholder="https://github.com/johndoe"
                  disabled={isSubmitting}
                  className="rounded-xl h-11 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume_url" className="text-sm font-semibold text-primary">Resume Link (PDF/Google Drive, optional)</Label>
              <Input
                id="resume_url"
                name="resume_url"
                value={formData.resume_url}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/..."
                disabled={isSubmitting}
                className="rounded-xl h-11 border-border"
              />
              
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_letter" className="text-sm font-semibold text-primary">Cover Letter / Message</Label>
              <Textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleInputChange}
                placeholder="Tell us why you are a great fit for this role..."
                required
                disabled={isSubmitting}
                rows={4}
                className="rounded-xl border-border resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isSubmitting}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-6 h-11"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4.5 w-4.5 border-b-2 border-white"></span>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Submit Application
                  </span>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Careers;
