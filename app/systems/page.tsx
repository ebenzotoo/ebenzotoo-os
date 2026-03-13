import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import { Server, Database, Smartphone, Layout, Workflow, GitBranch } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import LiveClock from "@/components/LiveClock";


export default function Systems() {
  const nodes = [
    {
      title: "Cross-Platform Ecosystems",
      icon: <Smartphone className="w-5 h-5 text-os-accent-blue" />,
      description: "Building responsive mobile and web applications (e.g., mentmate) utilizing Flutter for dynamic frontends paired seamlessly with Supabase for robust backend management.",
      status: "ACTIVE"
    },
    {
      title: "Data & Logic Infrastructure",
      icon: <Database className="w-5 h-5 text-os-accent-green" />,
      description: "Python-driven data processing and backend architecture. Leveraging IBM-certified Data Science methodologies to structure scalable PostgreSQL databases and API endpoints.",
      status: "OPTIMIZED"
    },
    {
      title: "Web Architecture",
      icon: <Layout className="w-5 h-5 text-os-text-muted" />,
      description: "End-to-end web development utilizing modern frameworks and advanced WordPress implementations to deliver high-performance, user-centric corporate platforms.",
      status: "ONLINE"
    },
    {
      title: "Project Management Ops",
      icon: <Workflow className="w-5 h-5 text-[#ce9178]" />,
      description: "Orchestrating complex digital deployments using the Critical Path Method (CPM) and precedence network diagrams to calculate floats, optimize timelines, and ensure efficient project duration.",
      status: "ACTIVE"
    }
  ];

  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />


<div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">

        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
            <PageTransition>
          <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
            <span>🔔</span>
            <span>☁️</span>
            <span>~/ARCHITECTURE_NODES <LiveClock /></span>
          </div>
          
          <div className="p-6 md:p-10 flex-1 max-w-5xl w-full relative overflow-hidden">

            {/* Ghost watermark */}
            <div className="absolute top-4 right-0 text-[90px] font-heading font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
              SYSTEMS
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted font-sans">SYSTEM_ARCHITECTURE</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-os-accent-green">
                <span className="w-2 h-2 rounded-full bg-os-accent-green animate-pulse" />
                ALL SYSTEMS NOMINAL
              </div>
            </div>
            
            {/* Network Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              
              {/* Decorative connecting lines for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
              <div className="hidden md:block absolute top-0 left-1/2 w-[1px] h-full bg-white/5 -z-10" />

              {nodes.map((node, i) => (
                <div key={i} className="bg-[#111827]/60 border border-white/5 hover:border-[#D4AF37]/30 p-6 rounded-xl transition-all duration-300 group flex flex-col h-full backdrop-blur-sm relative overflow-hidden hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)] hover:-translate-y-1">
                  
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center justify-between mb-5 z-10">
                    <div className="p-2.5 bg-[#0A0F1C] border border-white/5 rounded-lg group-hover:scale-110 transition-transform">
                      {node.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-os-text-muted px-2 py-1 rounded bg-black/20 border border-white/5">
                      STATUS: <span className={node.status === 'ACTIVE' ? 'text-os-accent-blue' : 'text-os-accent-green'}>{node.status}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-white font-medium text-lg mb-3 z-10">{node.title}</h3>
                  <p className="text-sm text-os-text-muted leading-relaxed font-sans z-10 flex-1">
                    {node.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-os-text-muted group-hover:text-white transition-colors z-10 cursor-pointer w-fit">
                    <Server className="w-3.5 h-3.5" />
                    INSPECT_NODE
                  </div>
                </div>
              ))}
            </div>

            {/* Process Section */}
            <div className="mt-14 mb-10">
              <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-8 flex items-center gap-2">
                <GitBranch className="w-4 h-4" /> // process
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: "01", title: "Discovery", desc: "Understanding the problem space, goals, constraints, and user needs before a single line of code is written." },
                  { step: "02", title: "Design", desc: "Architecting the system and UX — wireframes, data models, API contracts, and component hierarchy." },
                  { step: "03", title: "Development", desc: "Building iteratively with clean, documented code. Regular check-ins, no surprises." },
                  { step: "04", title: "Delivery", desc: "Deployment, handoff, and post-launch monitoring. The project doesn't end at launch." },
                ].map((phase) => (
                  <div key={phase.step} className="bg-[#111827]/40 border border-white/5 rounded-xl p-5 relative overflow-hidden group hover:border-white/15 transition-all duration-300">
                    <div className="absolute top-3 right-4 text-[40px] font-heading font-black text-white/[0.04] leading-none select-none">
                      {phase.step}
                    </div>
                    <p className="text-[10px] font-mono text-os-accent-blue tracking-widest mb-3">{phase.step}</p>
                    <h3 className="text-white font-heading font-semibold text-base mb-2">{phase.title}</h3>
                    <p className="text-xs text-os-text-muted leading-relaxed font-sans">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Output snippet */}
            <div className="mt-10 bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-xs text-os-text-muted">
               <span className="text-os-accent-blue">ebenzotoo@core</span>:<span className="text-os-accent-green">~</span>$ systemctl status deployment
               <br />
               <span className="text-white mt-1 block">● deployment.service - Full Stack Application Orchestration</span>
               Loaded: loaded (/etc/systemd/system/deployment.service; enabled; vendor preset: enabled)
               <br />
               Active: <span className="text-os-accent-green">active (running)</span> since Wed 2026-03-11 21:22:51 GMT; 1h 5m ago
            </div>

          </div>
          </PageTransition>
        </main>
      </div>

      <SystemDock />
      <MobileDock />
    </div>
  );
}