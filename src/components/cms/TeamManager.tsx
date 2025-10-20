import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  sort_order: number;
  published: boolean;
}

const TeamManager = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    image: "",
    sort_order: 0,
    published: true,
  });

  const queryClient = useQueryClient();

  const { data: team = [] } = useQuery({
    queryKey: ["team-members-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newMember: Omit<TeamMember, 'id'>) => {
      const { error } = await supabase.from("team_members").insert([newMember]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members-admin"] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast({ title: "Team member added successfully" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to add team member", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TeamMember> & { id: string }) => {
      const { error } = await supabase
        .from("team_members")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members-admin"] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast({ title: "Team member updated successfully" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to update team member", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members-admin"] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast({ title: "Team member deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete team member", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      image: "",
      sort_order: 0,
      published: true,
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData(member);
    setEditingId(member.id);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ ...formData, id: editingId } as TeamMember & { id: string });
    } else {
      createMutation.mutate(formData as Omit<TeamMember, 'id'>);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members</CardDescription>
          </div>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {(isAdding || editingId) && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published">Published</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {team.map((member) => (
            <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img src={member.image} alt={member.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground">Order: {member.sort_order}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${member.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {member.published ? 'Published' : 'Draft'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(member)}
                  disabled={isAdding || (editingId !== null && editingId !== member.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(member.id)}
                  disabled={isAdding || editingId !== null}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamManager;
