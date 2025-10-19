import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut } from "lucide-react";
import ApplicationsManager from "@/components/cms/ApplicationsManager";
import ProjectsManager from "@/components/cms/ProjectsManager";
import InsightsManager from "@/components/cms/InsightsManager";
import TestimonialsManager from "@/components/cms/TestimonialsManager";

const Dashboard = () => {
  const { user, isLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSignOut} className="w-full">
              Sign Out
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tian Group Innovation CMS</h1>
            <p className="text-sm text-muted-foreground">
              Manage your website content
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/")} variant="outline">
              View Site
            </Button>
            <Button onClick={handleSignOut} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <ApplicationsManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="insights">
            <InsightsManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
