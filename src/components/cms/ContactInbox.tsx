import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
type Message = Database["public"]["Tables"]["contact_messages"]["Row"];
const ContactInbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const refresh = async () => {
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load messages", description: error.message, variant: "destructive" });
    else setMessages(data || []);
  };
  useEffect(() => { void refresh(); }, []);
  const remove = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast({ title: "Could not delete message", description: error.message, variant: "destructive" });
    else void refresh();
  };
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Contact messages</h2>{messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}{messages.map(item => <Card key={item.id}><CardContent className="p-6 space-y-3"><div className="flex justify-between gap-4"><div><strong>{item.name}</strong>{item.company && <span> · {item.company}</span>}<p className="text-sm text-muted-foreground">{new Date(item.created_at).toLocaleString()}</p></div><Button size="sm" variant="destructive" onClick={() => void remove(item.id)}>Delete</Button></div><a href={`mailto:${item.email}`} className="text-accent underline">{item.email}</a><p className="whitespace-pre-wrap">{item.message}</p></CardContent></Card>)}</div>;
};
export default ContactInbox;
