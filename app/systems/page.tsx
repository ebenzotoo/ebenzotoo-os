import { Server, Database, Smartphone, Layout, Workflow, GitBranch, TrendingUp, SearchCode, MousePointer2, Globe, AppWindow } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";

const nodes = [
  {
    title: "Cross-Platform Ecosystems",
    icon: <Smartphone className="w-5 h-5 text-bp-secondary" />,
    description: "Building responsive mobile and web applications utilizing Flutter for dynamic frontends paired seamlessly with Supabase for robust backend management.",
    status: "ACTIVE",
  },
  {
    title: "Data & Logic Infrastructure",
    icon: <Database className="w-5 h-5 text-bp-primary" />,
    description: "Python-driven data processing and backend architecture. Leveraging IBM-certified Data Science methodologies to structure scalable PostgreSQL databases and API endpoints.",
    status: "OPTIMIZED",
  },
  {
    title: "Web Architecture",
    icon: <Layout className="w-5 h-5 text-bp-text-muted" />,
    description: "End-to-end web development utilizing modern frameworks and advanced WordPress implementations to deliver high-performance, user-centric corporate platforms.",
    status: "ONLINE",
  },
  {
    title: "Project Management Ops",
    icon: <Workflow className="w-5 h-5 text-bp-gold" />,
    description: "Orchestrating complex digital deployments using the Critical Path Method (CPM) and precedence network diagrams to calculate floats, optimize timelines, and ensure efficient project duration.",
    status: "ACTIVE",
  },
];

const services = [
  { icon: TrendingUp,    title: "Business Strategy",       desc: "Optimising processes to maximise profitability, eliminate costs, and align technology with business goals." },
  { icon: Globe,         title: "Web Design & Full Stack", desc: "End-to-end web experiences — responsive, performant, and pixel-perfect from Figma to production." },
  { icon: AppWindow,     title: "App Development",         desc: "Complete development cycle from architecture to launch, with a focus on clean code and scalable systems." },
  { icon: Smartphone,    title: "Mobile App Development",  desc: "Cross-platform iOS and Android apps using Flutter, built to pixel-perfect specs with smooth UX." },
  { icon: SearchCode,    title: "SEO Optimisation",        desc: "Technical and content-level SEO strategies that improve ranking, discoverability, and organic traffic." },
  { icon: MousePointer2, title: "UX Consulting",           desc: "User research, prototyping, and design systems that put the end-user at the centre of every decision." },
];

const process = [
  { step: "01", title: "Discovery",   desc: "Understanding the problem space, goals, constraints, and user needs before a single line of code is written." },
  { step: "02", title: "Design",      desc: "Architecting the system and UX — wireframes, data models, API contracts, and component hierarchy." },
  { step: "03", title: "Development", desc: "Building iteratively with clean, documented code. Regular check-ins, no surprises." },
  { step: "04", title: "Delivery",    desc: "Deployment, handoff, and post-launch monitoring. The project doesn't end at launch." },
];

export default function Systems() {
  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.03 — SYSTEM ARCHITECTURE" sheet="03/06" />

        <div className="p-6 md:p-10 flex flex-col gap-14">
          <h1 className="sr-only">Systems Architecture — Ebenezer Zotoo</h1>

          {/* Nodes */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="fig-label mb-0">FIG.03A — ARCHITECTURE NODES</h2>
              <div className="flex items-center gap-2 text-sm font-mono text-bp-primary">
                <span className="w-2 h-2 rounded-full bg-bp-primary animate-pulse" />
                ALL SYSTEMS NOMINAL
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nodes.map((node) => (
                <div key={node.title} className="sheet-card p-7 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-white/[0.04] border border-bp-border rounded-lg">{node.icon}</div>
                    <span className="text-[12px] font-mono tracking-widest text-bp-text-muted px-2.5 py-1.5 rounded bg-black/20 border border-bp-border">
                      STATUS: <span className={node.status === "ACTIVE" ? "text-bp-secondary" : "text-bp-primary"}>{node.status}</span>
                    </span>
                  </div>
                  <h3 className="text-bp-text-main font-medium text-xl mb-3">{node.title}</h3>
                  <p className="text-base text-bp-text-muted leading-relaxed flex-1">{node.description}</p>
                  <div className="mt-6 pt-4 border-t border-bp-border flex items-center gap-2 text-sm font-mono text-bp-text-muted w-fit">
                    <Server className="w-4 h-4" />
                    INSPECT_NODE
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="fig-label">FIG.03B — SERVICES OFFERED</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <div key={service.title} className="sheet-card p-6">
                  <div className="p-2.5 bg-white/[0.04] border border-bp-border rounded-lg w-fit mb-4">
                    <service.icon className="w-5 h-5 text-bp-gold" />
                  </div>
                  <h3 className="text-bp-text-main font-heading font-semibold text-base mb-2">{service.title}</h3>
                  <p className="text-sm text-bp-text-muted leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="fig-label flex items-center gap-2"><GitBranch className="w-3.5 h-3.5" /> FIG.03C — PROCESS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((phase) => (
                <div key={phase.step} className="sheet-card p-6 relative overflow-hidden">
                  <div className="absolute top-3 right-4 text-[44px] font-heading font-extrabold text-white/[0.04] leading-none select-none">
                    {phase.step}
                  </div>
                  <p className="text-[12px] font-mono text-bp-secondary tracking-widest mb-3">{phase.step}</p>
                  <h3 className="text-bp-text-main font-heading font-semibold text-lg mb-2">{phase.title}</h3>
                  <p className="text-sm text-bp-text-muted leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </PageTransition>
    </main>
  );
}
