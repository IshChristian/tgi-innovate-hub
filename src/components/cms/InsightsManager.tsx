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

interface Insight {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  image: string;
  category: string;
  author: string | null;
  published_date: string;
  published: boolean;
}

const InsightsManager = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
    published_date: new Date().toISOString().split("T")[0],
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch insights",
        variant: "destructive",
      });
    } else {
      setInsights(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("insights")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update insight",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Insight updated" });
        setEditingId(null);
        resetForm();
        fetchInsights();
      }
    } else {
      const { error } = await supabase.from("insights").insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create insight",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Insight created" });
        resetForm();
        fetchInsights();
      }
    }
  };

  const handleEdit = (insight: Insight) => {
    setEditingId(insight.id);
    setFormData({
      title: insight.title,
      excerpt: insight.excerpt,
      content: insight.content || "",
      image: insight.image,
      category: insight.category,
      author: insight.author || "",
      published_date: insight.published_date,
      published: insight.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this insight?")) return;

    const { error } = await supabase.from("insights").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete insight",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Insight deleted" });
      fetchInsights();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      author: "",
      published_date: new Date().toISOString().split("T")[0],
      published: true,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add New"} Insight</CardTitle>
          <CardDescription>
            Manage your blog posts and articles
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
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Content (Optional)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="published_date">Published Date</Label>
                <Input
                  id="published_date"
                  type="date"
                  value={formData.published_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      published_date: e.target.value,
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
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{insight.title}</CardTitle>
                  <CardDescription>
                    {insight.category} • {insight.published_date}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(insight)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(insight.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.excerpt}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                {insight.author && <span>By {insight.author}</span>}
                <span>Status: {insight.published ? "Published" : "Draft"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsightsManager;
