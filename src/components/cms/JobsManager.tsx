import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, Briefcase, MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  sort_order: number;
  published: boolean;
}

const JobsManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    sort_order: 0,
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase.from("jobs").select("*").order("sort_order", { ascending: true });
    if (error) toast({ title: "Could not load jobs", description: error.message, variant: "destructive" });
    else setJobs(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Edit flow
        const { error } = await supabase
          .from("jobs")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;

        toast({ title: "Success", description: "Job posting updated" });
        setEditingId(null);
        resetForm();
        fetchJobs();
      } else {
        // Create flow
        const { error } = await supabase.from("jobs").insert([formData]);

        if (error) throw error;

        toast({ title: "Success", description: "Job posting created" });
        resetForm();
        fetchJobs();
      }
    } catch (err: unknown) {
      toast({ title: "Job not saved", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    }
  };

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements,
      sort_order: job.sort_order || 0,
      published: job.published ?? true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;

      toast({ title: "Success", description: "Job deleted" });
      fetchJobs();
    } catch (err) {
      toast({ title: "Job not deleted", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: "",
      sort_order: 0,
      published: true,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-accent" />
            {editingId ? "Edit" : "Create New"} Job Opening
          </CardTitle>
          <CardDescription>
            Publish career opportunities on the client job portal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Lead Devops Engineer"
                  required
                  className="rounded-xl border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Engineering, Sales"
                  required
                  className="rounded-xl border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Kigali, Rwanda / Remote"
                  required
                  className="rounded-xl border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Employment Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Outline the responsibilities of this position..."
                required
                className="rounded-xl border-border resize-none"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Key Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List skills, experience, qualifications needed..."
                required
                className="rounded-xl border-border resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  className="rounded-xl border-border"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published" className="font-semibold cursor-pointer">Publish Listing</Label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="bg-primary hover:bg-accent text-white rounded-xl">
                {editingId ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {editingId ? "Update Job" : "Publish Job"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Jobs list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="border-border rounded-xl shadow-sm hover:border-accent/30 transition-all flex flex-col justify-between">
            <CardHeader className="p-5 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-lg font-bold text-primary">{job.title}</CardTitle>
                  <CardDescription className="text-xs font-semibold flex items-center gap-1 mt-1 text-accent">
                    {job.department} • {job.type}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() => handleEdit(job)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-2 space-y-3 flex-grow">
              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {job.description}
              </p>
              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-accent" />
                  {job.location}
                </span>
                <span>Status: <b className={job.published ? "text-green-600" : "text-amber-600"}>{job.published ? "Live" : "Draft"}</b></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsManager;
