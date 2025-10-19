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

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string | null;
  sort_order: number;
  published: boolean;
}

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    image: "",
    sort_order: 0,
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      });
    } else {
      setTestimonials(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("testimonials")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update testimonial",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Testimonial updated" });
        setEditingId(null);
        resetForm();
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase.from("testimonials").insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create testimonial",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Testimonial created" });
        resetForm();
        fetchTestimonials();
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      image: testimonial.image || "",
      sort_order: testimonial.sort_order,
      published: testimonial.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Testimonial deleted" });
      fetchTestimonials();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      image: "",
      sort_order: 0,
      published: true,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add New"} Testimonial</CardTitle>
          <CardDescription>
            Manage client testimonials and reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Testimonial</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="/placeholder.svg"
                />
              </div>
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
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label htmlFor="published">Published</Label>
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
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{testimonial.content}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Order: {testimonial.sort_order}</span>
                <span>Status: {testimonial.published ? "Published" : "Draft"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;
