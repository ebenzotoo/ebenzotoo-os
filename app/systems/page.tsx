import { Server, Database, Smartphone, Layout, Workflow, GitBranch, TrendingUp, SearchCode, MousePointer2, Globe, AppWindow } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";


export default function Systems() {
  const nodes = [
    {
      title: "Cross-Platform Ecosystems",
      icon: <Smartphone className="w-5 h-5 text-os-secondary" />,
      description: "Building responsive mobile and web applications utilizing Flutter for dynamic frontends paired seamlessly with Supabase for robust backend management.",
      status: "ACTIVE"
    },
    {
      title: "Data & Logic Infrastructure",
      icon: <Database className="w-5 h-5 text-os-primary" />,
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
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
            <PageTransition>
          <div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex text-xs sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
            <NotificationBell />
            <CloudStatus />
            <span>~/ARCHITECTURE_NODES <LiveClock /></span>
          </div>

          <div className="p-6 md:p-10 flex-1 w-full relative">

            {/* Ghost watermark */}
            <div className="absolute top-4 right-0 text-[90px] font-sans font-extrabold text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
              SYSTEMS
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted font-sans">SYSTEM_ARCHITECTURE</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-os-primary">
                <span className="w-2 h-2 rounded-full bg-os-primary animate-pulse" />
                ALL SYSTEMS NOMINAL
              </div>
            </div>

            {/* Network Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

              {/* Decorative connecting lines for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-os-border -z-10" />
              <div className="hidden md:block absolute top-0 left-1/2 w-[1px] h-full bg-os-border -z-10" />

              {nodes.map((node, i) => (
                <div key={i} className="bg-os-surface border border-os-border hover:border-os-primary/35 p-6 rounded-xl transition-all duration-300 group flex flex-col h-full backdrop-blur-sm relative overflow-hidden group-hover:shadow-[0_8px_32px_rgba(11,206,175,0.07)] hover:-translate-y-1">

                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center justify-between mb-5 z-10">
                    <div className="p-2.5 bg-os-surface border border-os-border rounded-lg group-hover:scale-110 transition-transform">
                      {node.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-os-text-muted px-2 py-1 rounded bg-black/20 border border-os-border">
                      STATUS: <span className={node.status === 'ACTIVE' ? 'text-os-secondary' : 'text-os-primary'}>{node.status}</span>
                    </span>
                  </div>

                  <h3 className="text-os-text-main font-medium text-lg mb-3 z-10">{node.title}</h3>
                  <p className="text-sm text-os-text-muted leading-relaxed font-sans z-10 flex-1">
                    {node.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-os-border flex items-center gap-2 text-xs font-mono text-os-text-muted hover:text-os-text-main transition-colors z-10 cursor-pointer w-fit">
                    <Server className="w-3.5 h-3.5" />
                    INSPECT_NODE
                  </div>
                </div>
              ))}
            </div>

            {/* Services Section */}
            <div className="mt-14 mb-10">
              <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-8 flex items-center gap-2">
                <AppWindow className="w-4 h-4" /> // services_offered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: TrendingUp,    title: "Business Strategy",      desc: "Optimising processes to maximise profitability, eliminate costs, and align technology with business goals." },
                  { icon: Globe,         title: "Web Design & Full Stack", desc: "End-to-end web experiences — responsive, performant, and pixel-perfect from Figma to production." },
                  { icon: AppWindow,     title: "App Development",         desc: "Complete development cycle from architecture to launch, with a focus on clean code and scalable systems." },
                  { icon: Smartphone,    title: "Mobile App Development",  desc: "Cross-platform iOS and Android apps using Flutter, built to pixel-perfect specs with smooth UX." },
                  { icon: SearchCode,    title: "SEO Optimisation",        desc: "Technical and content-level SEO strategies that improve ranking, discoverability, and organic traffic." },
                  { icon: MousePointer2, title: "UX Consulting",           desc: "User research, prototyping, and design systems that put the end-user at the centre of every decision." },
                ].map((service) => (
                  <div key={service.title} className="group bg-os-surface border border-os-border hover:border-os-primary/35 rounded-xl p-5 transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(11,206,175,0.07)] hover:-translate-y-0.5">
                    <div className="p-2 bg-os-surface border border-os-border rounded-lg w-fit mb-4 hover:border-os-primary/35 transition-colors">
                      <service.icon className="w-4 h-4 text-os-gold" />
                    </div>
                    <h3 className="text-os-text-main font-heading font-semibold text-sm mb-2">{service.title}</h3>
                    <p className="text-xs text-os-text-muted leading-relaxed font-sans">{service.desc}</p>
                  </div>
                ))}
              </div>
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
                  <div key={phase.step} className="bg-os-surface border border-os-border rounded-xl p-5 relative overflow-hidden group hover:border-os-border transition-all duration-300">
                    <div className="absolute top-3 right-4 text-[40px] font-sans font-extrabold text-white/[0.04] leading-none select-none">
                      {phase.step}
                    </div>
                    <p className="text-[10px] font-mono text-os-secondary tracking-widest mb-3">{phase.step}</p>
                    <h3 className="text-os-text-main font-heading font-semibold text-base mb-2">{phase.title}</h3>
                    <p className="text-xs text-os-text-muted leading-relaxed font-sans">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Output snippet */}
            <div className="mt-10 bg-black/40 border border-os-border rounded-lg p-4 font-mono text-xs text-os-text-muted">
               <span className="text-os-secondary">ebenzotoo@core</span>:<span className="text-os-primary">~</span>$ systemctl status deployment
               <br />
               <span className="text-os-text-main mt-1 block">● deployment.service - Full Stack Application Orchestration</span>
               Loaded: loaded (/etc/systemd/system/deployment.service; enabled; vendor preset: enabled)
               <br />
               Active: <span className="text-os-primary">active (running)</span> since Wed 2026-03-11 21:22:51 GMT; 1h 5m ago
            </div>

          </div>
          </PageTransition>
    </main>
  );
}
