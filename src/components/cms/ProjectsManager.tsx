import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string | null;
  challenge: string | null;
  solution: string | null;
  outcomes: string | null;
  technologies: string | null;
  gallery_urls: string[];
  sort_order: number;
  published: boolean;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
    category: "", challenge: "", solution: "", outcomes: "", technologies: "", gallery_urls: [] as string[],
    sort_order: 0,
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Project updated" });
        setEditingId(null);
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create project",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Project created" });
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      url: project.url,
      category: project.category || "", challenge: project.challenge || "", solution: project.solution || "", outcomes: project.outcomes || "", technologies: project.technologies || "", gallery_urls: project.gallery_urls || [],
      sort_order: project.sort_order,
      published: project.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Project deleted" });
      fetchProjects();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      url: "",
    category: "", challenge: "", solution: "", outcomes: "", technologies: "", gallery_urls: [] as string[],
      sort_order: 0,
      published: true,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add New"} Project</CardTitle>
          <CardDescription>
            Manage your project showcase items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">External URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://example.com (optional)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="/placeholder.svg"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label htmlFor="category">Category</Label><Input id="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} /></div>
              <div><Label htmlFor="technologies">Technologies (comma separated)</Label><Input id="technologies" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} /></div>
            </div>
            {([ ["challenge", "The challenge"], ["solution", "Our solution"], ["outcomes", "Outcomes"] ] as const).map(([key, label]) => <div key={key}><Label htmlFor={key}>{label}</Label><Textarea id={key} rows={4} value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })} /></div>)}
            <div><Label htmlFor="gallery">Gallery image URLs (one per line)</Label><Textarea id="gallery" rows={4} value={formData.gallery_urls.join("\n")} onChange={e => setFormData({ ...formData, gallery_urls: e.target.value.split("\n").map(url => url.trim()).filter(Boolean) })} /></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {editingId ? "Update" : "Create"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.url}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Order: {project.sort_order}</span>
                <span>Status: {project.published ? "Published" : "Draft"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
