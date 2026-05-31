import { Terminal, ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import Link from "next/link";

const clients = [
  { name: "Ghana Law Society",          logo: "/clients/gls.png"     },
  { name: "National Service Authority", logo: "/clients/nsa.png"     },
  { name: "Aurateq",                    logo: "/clients/aurateq.png" },
  { name: "Ani Medical Consult",        logo: "/clients/ani.png"     },
  { name: "God Alone Int Ministry",     logo: "/clients/gaim.png"    },
  { name: "NASPA Ghana",                logo: "/clients/naspa.png"   },
];

const jobs = [
  { role: "Senior Web & Graphics Designer",   company: "Industrial Coatings Africa",    year: "2025 – Present", desc: "Designed and implemented digital solutions to enhance brand visibility and user engagement."                                                      },
  { role: "Technical Lead",                   company: "National Service Authority",     year: "2021 – 2025",   desc: "Led the design and development of digital platforms that improved service delivery and operational efficiency."                               },
  { role: "Head, Brands & Design",            company: "Swedec Ghana",                  year: "2015 – 2021",   desc: "Led branding, digital strategy, and design execution across multiple initiatives."                                                           },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018",   desc: "Managed IT systems and digital infrastructure supporting organizational operations."                                                         },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
      <PageTransition>

        {/* ========== OS VERSION ========== */}
        <div className="os-only">
          <div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-xs gap-5 hidden md:flex sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
            <NotificationBell />
            <CloudStatus />
            <span>SYSTEM_INFO <LiveClock /></span>
          </div>

          <div className="p-6 md:p-10 flex-1 w-full relative">
            {/* Ghost watermark */}
            <div className="absolute top-6 right-0 text-[100px] font-sans font-extrabold text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
              ABOUT
            </div>

            {/* ── HERO BANNER ─────────────────────────────────────── */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#1a0800] to-os-bg mb-8">
              {/* Ambient glow */}
              <div className="absolute top-[-60px] right-[80px] w-[280px] h-[280px] bg-os-primary/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Mobile avatar — top-right corner, desktop hidden */}
              <div className="absolute top-25 right-4 md:hidden z-20">
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-os-primary/30 ring-2 ring-os-primary/10 shadow-lg shadow-os-primary/10">
                  <img src="/avatar.png" alt="Ebenezer Zotoo" className="w-full h-full object-cover object-top" />
                </div>
              </div>

              <div className="relative z-10 flex items-stretch min-h-[280px]">
                {/* Text side */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-os-primary font-semibold uppercase mb-4">
                      Full-Stack Developer · Systems Architect · UI/UX Designer
                    </p>
                    <h1 className="text-[36px] md:text-[44px] font-black text-os-text-main leading-[1.05] mb-6">
                      Building<br />Digital<br />
                      <span className="text-os-primary">Products.</span>
                    </h1>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/contact"
                        className="px-5 py-2.5 bg-os-primary hover:bg-os-primary/90 text-black text-[13px] font-bold rounded-lg transition-colors duration-150">
                        Start a Project
                      </Link>
                      <Link href="/projects"
                        className="px-5 py-2.5 bg-os-primary/10 border border-os-primary/30 hover:border-os-primary/60 text-os-primary text-[13px] font-semibold rounded-lg transition-colors duration-150 flex items-center gap-1.5">
                        View Work <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Photo side */}
                <div className="hidden md:block relative w-[260px] shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-os-primary/10 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1a0800] to-transparent z-10" />
                  <img
                    src="/avatar.png"
                    alt="Ebenezer Zotoo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Stats bar */}
              <div className="relative z-10 grid grid-cols-4 border-t border-white/[0.06] bg-black/40 backdrop-blur-sm">
                {[
                  { value: "8+",     label: "Years Exp."  },
                  { value: "30+",    label: "Projects"    },
                  { value: "15+",    label: "Clients"     },
                  { value: "1,000+", label: "Users Built" },
                ].map((stat, i, arr) => (
                  <div key={stat.label} className={`flex flex-col items-center py-4 ${i < arr.length - 1 ? "border-r border-white/[0.06]" : ""}`}>
                    <p className="text-[20px] font-black text-os-primary leading-none">{stat.value}</p>
                    <p className="text-[10px] font-medium text-os-text-muted tracking-wider mt-1 uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── MARQUEE STRIP ──────────────────────────────────────── */}
            <div className="overflow-hidden mb-8 border-y border-white/[0.04] py-3">
              <div className="marquee-track gap-0">
                {[
                  "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Node.js",
                  "Flutter", "PostgreSQL", "UI/UX Design", "Systems Architecture", "Web Development", "Mobile Apps",
                  "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Node.js",
                  "Flutter", "PostgreSQL", "UI/UX Design", "Systems Architecture", "Web Development", "Mobile Apps",
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-4 shrink-0 px-4 text-[11px] text-os-text-muted font-medium tracking-[0.08em] uppercase">
                    <span className="text-os-primary/50">·</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Terminal Bio */}
            <div className="bg-os-surface border border-os-border rounded-xl p-6 mb-10">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-os-border">
                <Terminal className="w-4 h-4 text-os-primary" />
                <span className="text-[12px] font-mono text-os-text-muted">~/ebenzotoo/bio.txt</span>
              </div>
              <p className="text-os-text-main leading-relaxed text-[15px]">
                Most digital products don&apos;t fail because of bad ideas — they fail because they are difficult to use, poorly structured, or not built to scale.
                <br /><br />
                I help organizations turn complex ideas into intuitive, functional, and scalable digital systems that actually deliver results. With over 8 years of experience, I&apos;ve worked across government, healthcare, education, and tech — designing and building platforms that improve accessibility, efficiency, and real-world impact.
              </p>
            </div>

            {/* Core Expertise */}
            <div className="mb-12">
              <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-5 uppercase">
                <span className="text-os-primary">//</span> Core Expertise
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {["UI/UX & Product Design", "Web & Platform Development", "Digital Systems Architecture", "User Experience Optimization", "Product Strategy & Execution"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-os-surface border border-os-border hover:border-os-primary/40 hover:text-os-text-main rounded-lg text-[13px] text-os-text-muted font-medium transition-colors duration-150">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Trusted By */}
            <div className="mb-12">
              <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-5 uppercase">
                <span className="text-os-primary">//</span> Trusted By
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {clients.map((client) => (
                  <div key={client.name} className="bg-os-surface border border-os-border hover:border-os-border-hover rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group">
                    <img
                      src={client.logo}
                      alt={client.name}
                      title={client.name}
                      className="max-h-8 max-w-full object-contain opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <span className="text-[10px] text-os-text-muted text-center leading-tight opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="mb-12">
              <h2 className="text-[11px] font-medium tracking-[0.15em] text-os-text-muted mb-6 uppercase">
                <span className="text-os-primary">//</span> Experience
              </h2>
              <div className="flex flex-col gap-6 border-l-2 border-os-border pl-6">
                {jobs.map((job) => (
                  <div key={job.role} className="relative">
                    <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full border-2 border-os-primary bg-os-bg" />
                    <p className="text-[14px] font-semibold text-os-text-main">{job.role}</p>
                    <p className="text-[12px] text-os-secondary font-medium mt-0.5">{job.company}</p>
                    <p className="text-[11px] text-os-text-muted mt-0.5">{job.year}</p>
                    <p className="text-[13px] text-os-text-muted mt-2 leading-relaxed">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== CLEAN VERSION ========== */}
        <div className="clean-only">

          {/* Hero */}
          <section className="py-16 px-6 text-center border-b border-slate-100">
            <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-6 shadow-md ring-1 ring-slate-200">
              <img src="/avatar.png" alt="Ebenezer Zotoo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-2 tracking-tight">
              Ebenezer Zotoo
            </h1>
            <p className="text-slate-500 text-base mb-3">
              Digital Product Designer &amp; Systems Builder
            </p>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-2 leading-relaxed">
              I design and build scalable digital platforms that improve user experience, streamline operations, and drive growth for startups, organizations, and institutions.
            </p>
            <p className="text-slate-400 text-xs mb-8">📍 Accra, Ghana &nbsp;·&nbsp; 🌍 Open to remote opportunities</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/projects"
                className="px-6 py-2.5 bg-slate-900 text-[#f8fafc] text-sm rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Get In Touch
              </Link>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 px-6 border-b border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto text-center">
              {[
                { value: "8+",      label: "Years Experience" },
                { value: "30+",    label: "Projects Shipped" },
                { value: "1,000+", label: "Platform Users"   },
                { value: "3",      label: "Countries"        },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold font-heading text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About */}
          <section className="py-14 px-6 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-4">// about</p>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                Most digital products don&apos;t fail because of bad ideas — they fail because they are difficult to use, poorly structured, or not built to scale.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] mt-4">
                I help organizations turn complex ideas into intuitive, functional, and scalable digital systems that actually deliver results. With over 8 years of experience, I&apos;ve worked across government, healthcare, education, and tech — designing and building platforms that improve accessibility, efficiency, and real-world impact.
              </p>
            </div>
          </section>

          {/* Core Expertise */}
          <section className="py-14 px-6 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-8">// core_expertise</p>
              <div className="flex flex-wrap gap-3">
                {["UI/UX & Product Design", "Web & Platform Development", "Digital Systems Architecture", "User Experience Optimization", "Product Strategy & Execution"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Trusted By */}
          <section className="py-14 px-6 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-8 text-center">// trusted_by</p>
              <div className="grid grid-cols-3 gap-3">
                {clients.map((client) => (
                  <div key={client.name} className="bg-slate-200 border border-slate-300 hover:border-slate-400 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 group">
                    <img
                      src={client.logo}
                      alt={client.name}
                      title={client.name}
                      className="max-h-8 max-w-full object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <span className="text-[10px] text-slate-500 text-center leading-tight opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="py-14 px-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-8">// experience</p>
              <div className="space-y-0">
                {jobs.map((job, i) => (
                  <div key={i} className="flex gap-5 pb-8">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                      {i < jobs.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1.5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{job.role}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{job.company} · {job.year}</p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{job.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </PageTransition>
    </main>
  );
}
