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

interface Application {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  sort_order: number;
  published: boolean;
}

const ApplicationsManager = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
    sort_order: 0,
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } else {
      setApplications(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("applications")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update application",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Application updated" });
        setEditingId(null);
        resetForm();
        fetchApplications();
      }
    } else {
      const { error } = await supabase.from("applications").insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create application",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Application created" });
        resetForm();
        fetchApplications();
      }
    }
  };

  const handleEdit = (app: Application) => {
    setEditingId(app.id);
    setFormData({
      title: app.title,
      description: app.description,
      image: app.image,
      url: app.url,
      sort_order: app.sort_order,
      published: app.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    const { error } = await supabase.from("applications").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Application deleted" });
      fetchApplications();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      url: "",
      sort_order: 0,
      published: true,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add New"} Application</CardTitle>
          <CardDescription>
            Manage your applications that appear on the homepage
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
                <Label htmlFor="url">URL Path</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="/applications/example"
                  required
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
        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{app.title}</CardTitle>
                  <CardDescription>{app.url}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(app)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(app.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{app.description}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Order: {app.sort_order}</span>
                <span>Status: {app.published ? "Published" : "Draft"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsManager;
