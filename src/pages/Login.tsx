import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "You can now sign in with your credentials.",
        });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1624] relative overflow-hidden p-4">
      {/* Glow blobs in the background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/15 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Navigation back */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portal
        </Button>

        <Card className="border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
          {/* Accent border bar on top */}
          <div className="w-full h-1 bg-gradient-to-r from-accent to-accent/30"></div>

          <CardHeader className="space-y-4 pt-8 pb-4 text-center">
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/25 shadow-inner">
              <ShieldCheck className="h-7 w-7 text-accent" />
            </div>
            
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-bold text-white tracking-tight">
                {isSignUp ? "Create Admin Credentials" : "Admin Console Login"}
              </CardTitle>
              <CardDescription className="text-white/60 text-sm">
                {isSignUp
                  ? "Define administrative login credentials below."
                  : "Enter credentials to access the Content Management System."}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-white/80 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-white/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@tiangroup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus:border-accent/50 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-white/80 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-white/40" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus:border-accent/50 focus:ring-accent"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Authenticating...
                  </span>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In to Console"
                )}
              </Button>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white hover:bg-white/5 rounded-xl text-xs"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={isLoading}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Need administrative access? Request Signup"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
