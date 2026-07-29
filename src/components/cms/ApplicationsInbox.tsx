import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, FileText, CheckCircle, XCircle, Clock, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Application {
  id: string;
  job_id: string | null;
  job_title?: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string | null;
  github_url: string | null;
  cover_letter: string;
  status: string;
  created_at: string | null;
}

const ApplicationsInbox = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      // 1. Fetch from Supabase
      const { data: dbApps, error } = await supabase
        .from("job_applications")
        .select(`
          *,
          jobs (title)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform db response to match our interface
      const formattedDbApps: Application[] = (dbApps || []).map((app: any) => ({
        id: app.id,
        job_id: app.job_id,
        job_title: app.jobs?.title || "Unknown Position",
        name: app.name,
        email: app.email,
        phone: app.phone,
        resume_url: app.resume_url,
        github_url: app.github_url,
        cover_letter: app.cover_letter,
        status: app.status || "pending",
        created_at: app.created_at
      }));

      // 2. Fetch from Local Storage and combine
      const localAppsJson = localStorage.getItem("tgi_local_applications");
      const localApps: Application[] = localAppsJson ? JSON.parse(localAppsJson) : [];

      // Combine both lists, avoiding duplicate IDs if any
      const dbIds = new Set(formattedDbApps.map(app => app.id));
      const combined = [
        ...formattedDbApps,
        ...localApps.filter(app => !dbIds.has(app.id))
      ].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

      setApplications(combined);
    } catch (err) {
      console.warn("Could not fetch applications from Supabase, loading from localStorage");
      const localAppsJson = localStorage.getItem("tgi_local_applications");
      const localApps: Application[] = localAppsJson ? JSON.parse(localAppsJson) : [];
      setApplications(localApps.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Status Updated", description: `Application status changed to ${newStatus}` });
      fetchApplications();
    } catch (err) {
      // Local fallback edit
      const updatedApps = applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApps);
      localStorage.setItem("tgi_local_applications", JSON.stringify(updatedApps.filter(app => app.id.includes("-")))); // save local ones back
      
      toast({ title: "Status Updated (Local)", description: `Application status changed to ${newStatus}` });
      
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const { error } = await supabase
        .from("job_applications")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Application deleted" });
      fetchApplications();
    } catch (err) {
      const updatedApps = applications.filter(app => app.id !== id);
      setApplications(updatedApps);
      localStorage.setItem("tgi_local_applications", JSON.stringify(updatedApps));
      toast({ title: "Success (Local)", description: "Application deleted locally" });
      setIsDetailOpen(false);
    }
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Rejected</Badge>;
      case "reviewing":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Reviewing</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Candidate Applications Inbox
          </CardTitle>
          <CardDescription>
            Review job application submissions from the Careers Portal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {applications.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl">
              <Clock className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No job applications received yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-sm font-semibold text-primary/70">
                    <th className="py-4 px-4">Candidate</th>
                    <th className="py-4 px-4">Applied For</th>
                    <th className="py-4 px-4">Submission Date</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-muted/30 transition-colors text-sm">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-primary">{app.name}</div>
                        <div className="text-xs text-muted-foreground">{app.email}</div>
                      </td>
                      <td className="py-4 px-4 font-medium text-primary">
                        {app.job_title || "Unknown Position"}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg font-medium px-3"
                            onClick={() => handleViewDetails(app)}
                          >
                            <Eye className="h-4 w-4 mr-1.5" />
                            Review
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            onClick={() => handleDelete(app.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-xl rounded-2xl border border-border bg-background p-6">
          {selectedApp && (
            <>
              <DialogHeader className="space-y-1.5 pb-4 border-b">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold text-primary">
                    Application Details
                  </DialogTitle>
                  {getStatusBadge(selectedApp.status)}
                </div>
                <DialogDescription className="text-sm font-semibold text-accent">
                  Applied for: {selectedApp.job_title || "Unknown Position"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border border-border/80 rounded-xl bg-muted/20">
                    <Mail className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Email</div>
                      <a href={`mailto:${selectedApp.email}`} className="text-sm font-semibold text-primary hover:underline">
                        {selectedApp.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-border/80 rounded-xl bg-muted/20">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Phone</div>
                      <a href={`tel:${selectedApp.phone}`} className="text-sm font-semibold text-primary hover:underline">
                        {selectedApp.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Resume and Portfolio Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedApp.resume_url && (
                    <Button
                      variant="outline"
                      className="rounded-xl justify-start h-12 hover:border-accent/40"
                      onClick={() => window.open(selectedApp.resume_url || "#", "_blank")}
                    >
                      <FileText className="h-5 w-5 text-accent mr-3" />
                      <div className="text-left">
                        <div className="text-[9px] uppercase font-bold text-muted-foreground">Resume</div>
                        <div className="text-xs font-semibold text-primary line-clamp-1">View Candidate CV</div>
                      </div>
                    </Button>
                  )}
                  {selectedApp.github_url && (
                    <Button
                      variant="outline"
                      className="rounded-xl justify-start h-12 hover:border-accent/40"
                      onClick={() => window.open(selectedApp.github_url || "#", "_blank")}
                    >
                      <Github className="h-5 w-5 text-accent mr-3" />
                      <div className="text-left">
                        <div className="text-[9px] uppercase font-bold text-muted-foreground">GitHub/Portfolio</div>
                        <div className="text-xs font-semibold text-primary line-clamp-1">Visit Portfolio</div>
                      </div>
                    </Button>
                  )}
                </div>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cover Letter / Statement</div>
                  <div className="p-4 border border-border/80 rounded-xl bg-muted/20 text-sm text-primary leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                    {selectedApp.cover_letter}
                  </div>
                </div>

                {/* Review Controls */}
                <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-muted-foreground font-medium">
                    Submitted on {formatDate(selectedApp.created_at)}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 sm:flex-initial text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 rounded-xl"
                      onClick={() => handleStatusChange(selectedApp.id, "rejected")}
                    >
                      <XCircle className="h-4 w-4 mr-1.5" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 sm:flex-initial text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
                      onClick={() => handleStatusChange(selectedApp.id, "reviewing")}
                    >
                      <Clock className="h-4 w-4 mr-1.5" />
                      Review
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                      onClick={() => handleStatusChange(selectedApp.id, "accepted")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsInbox;
