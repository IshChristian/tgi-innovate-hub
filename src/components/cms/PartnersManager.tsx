import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Partner = Database["public"]["Tables"]["partners"]["Row"];
const empty = { name: "", logo_url: "", website_url: "", sort_order: 0, published: true };
const PartnersManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();
  const refresh = async () => {
    const { data, error } = await supabase.from("partners").select("*").order("sort_order");
    if (error) toast({ title: "Could not load partners", description: error.message, variant: "destructive" });
    else setPartners(data || []);
  };
  useEffect(() => { void refresh(); }, []);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...form, website_url: form.website_url || null };
    const { error } = editingId
      ? await supabase.from("partners").update(payload).eq("id", editingId)
      : await supabase.from("partners").insert(payload);
    if (error) return toast({ title: "Could not save partner", description: error.message, variant: "destructive" });
    setEditingId(null); setForm(empty); void refresh(); toast({ title: "Partner saved" });
  };
  const remove = async (id: string) => {
    if (!window.confirm("Delete this partner?")) return;
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) toast({ title: "Could not delete partner", description: error.message, variant: "destructive" });
    else void refresh();
  };
  return <div className="space-y-6"><Card><CardHeader><CardTitle>{editingId ? "Edit partner" : "Add partner"}</CardTitle></CardHeader><CardContent>
    <form onSubmit={save} className="space-y-4">
      <div><Label htmlFor="partner-name">Name</Label><Input id="partner-name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
      <div><Label htmlFor="partner-logo">Logo URL</Label><Input id="partner-logo" required value={form.logo_url} onChange={e => setForm({ ...form, logo_url: e.target.value })} placeholder="https://example.com/logo.svg" /></div>
      <div><Label htmlFor="partner-site">Website URL (optional)</Label><Input id="partner-site" type="url" value={form.website_url} onChange={e => setForm({ ...form, website_url: e.target.value })} /></div>
      <div><Label htmlFor="partner-order">Display order</Label><Input id="partner-order" type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) || 0 })} /></div>
      <div className="flex items-center gap-3"><Switch id="partner-published" checked={form.published} onCheckedChange={value => setForm({ ...form, published: value })} /><Label htmlFor="partner-published">Published</Label></div>
      <div className="flex gap-2"><Button type="submit">Save partner</Button>{editingId && <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</Button>}</div>
    </form></CardContent></Card>
    {partners.map(partner => <Card key={partner.id}><CardContent className="p-5 flex items-center justify-between gap-4"><div className="flex items-center gap-4"><img src={partner.logo_url} alt="" className="w-20 h-12 object-contain" /><div><strong>{partner.name}</strong><p className="text-sm text-muted-foreground">{partner.published ? "Published" : "Draft"}</p></div></div><div className="flex gap-2"><Button variant="outline" onClick={() => { setEditingId(partner.id); setForm({ name: partner.name, logo_url: partner.logo_url, website_url: partner.website_url || "", sort_order: partner.sort_order, published: partner.published }); }}>Edit</Button><Button variant="destructive" onClick={() => void remove(partner.id)}>Delete</Button></div></CardContent></Card>)}
  </div>;
};
export default PartnersManager;
