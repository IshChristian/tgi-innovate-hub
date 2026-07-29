import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake, Shield, Zap, Sparkles } from "lucide-react";

const Hero = () => {
  const handleExploreClick = () => {
    const target = document.getElementById("applications");
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#070d19] overflow-hidden pt-20">
      {/* Premium Tech Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Glowing background radial blur blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="section-container relative z-10 w-full py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Copywriting Content */}
          <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
            
            {/* Top Corporate Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span>Pioneering Digital Transformation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Innovating the Future of <span className="bg-gradient-to-r from-accent via-accent/80 to-white bg-clip-text text-transparent">Enterprise Systems</span>
            </h1>

            {/* Sub-headline description */}
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              Tian Group Innovation delivers production-ready systems and intelligence platforms across AI, IoT, automation, and cloud structures to drive sustainable growth.
            </p>

            {/* Actions Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-7 font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300"
                onClick={handleExploreClick}
              >
                <span>Explore Solutions</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl px-7 font-semibold transition-all duration-300"
                onClick={() => window.location.href = "https://forms.gle/AFTGqeos4s6doUiP7"}
              >
                <Handshake className="mr-2 h-5 w-5" />
                <span>Partner With Us</span>
              </Button>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-white/90">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">99.9%</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-white/40">System Uptime</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">3+ Years</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-white/40">Of Tech Growth</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">50+ Clients</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-white/40">Globally Supported</div>
              </div>
            </div>

          </div>

          {/* Column 2: Dashboard Mockup Visualization */}
          <div className="lg:col-span-5 relative hidden lg:block animate-scale-in" style={{ animationDelay: "200ms" }}>
            
            {/* Main Mockup container */}
            <div className="relative mx-auto w-full max-w-[440px] aspect-[4/3] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none"></div>
              
              {/* Header simulator */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-[10px] font-semibold text-white/40 tracking-wider">TIAN CORE ENGINE</span>
              </div>

              {/* Body Content Simulator */}
              <div className="pt-4 space-y-4">
                
                {/* Active Metric Badge */}
                <div className="p-3 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Zap className="h-4.5 w-4.5 text-accent animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/40 uppercase">Cluster Status</div>
                      <div className="text-xs font-bold text-white">All systems operational</div>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
                </div>

                {/* Simulated Chart Graph */}
                <div className="h-28 border border-white/10 rounded-xl bg-[#0b1322] p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-white/30 uppercase">CPU Usage Load</span>
                    <span className="text-[10px] font-semibold text-accent">14.2% (Optimal)</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16 pt-2">
                    <div className="w-full h-8 bg-accent/20 rounded-md"></div>
                    <div className="w-full h-10 bg-accent/20 rounded-md"></div>
                    <div className="w-full h-7 bg-accent/20 rounded-md"></div>
                    <div className="w-full h-12 bg-accent/30 rounded-md"></div>
                    <div className="w-full h-14 bg-accent/40 rounded-md"></div>
                    <div className="w-full h-6 bg-accent/20 rounded-md"></div>
                    <div className="w-full h-9 bg-accent/20 rounded-md animate-pulse"></div>
                  </div>
                </div>

                {/* Bottom Stats Card */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 border border-white/10 rounded-xl bg-white/5 text-center">
                    <div className="text-[9px] font-bold text-white/40 uppercase">Active Nodes</div>
                    <div className="text-sm font-bold text-white mt-0.5">128 / 128</div>
                  </div>
                  <div className="p-2.5 border border-white/10 rounded-xl bg-white/5 text-center">
                    <div className="text-[9px] font-bold text-white/40 uppercase">Latency Rate</div>
                    <div className="text-sm font-bold text-white mt-0.5">4.2 ms</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Small Floating badge */}
            <div className="absolute top-[10%] right-[-5%] p-3.5 rounded-xl border border-white/10 bg-[#0d1726]/90 backdrop-blur-md shadow-xl flex items-center gap-2.5 max-w-[180px] animate-bounce" style={{ animationDuration: '4s' }}>
              <Shield className="h-5 w-5 text-accent shrink-0" />
              <div>
                <span className="text-[9px] font-bold text-white/40 uppercase block">Security Gate</span>
                <span className="text-xs font-semibold text-white">SSL Encrypted</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bounce scroll down arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity" onClick={handleExploreClick}>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-white/80 rounded-full animate-bounce"></div>
        </div>
      </div>

    </section>
  );
};

export default Hero;