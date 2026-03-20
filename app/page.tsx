import { Terminal, Briefcase } from "lucide-react";
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
  { role: "Senior Web and Graphics Designer", company: "Industrial Coatings Africa",    year: "2025 – Present" },
  { role: "Technical Lead",                   company: "National Service Authority",     year: "2021 – 2025"   },
  { role: "Head, Brands and Design",          company: "Swedec Ghana",                  year: "2015 – 2021"   },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018"   },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
      <PageTransition>

        {/* ========== OS VERSION ========== */}
        <div className="os-only">
          <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
            <NotificationBell />
            <CloudStatus />
            <span>SYSTEM_INFO <LiveClock /></span>
          </div>

          <div className="p-6 md:p-10 flex-1 w-full relative">
            {/* Ghost watermark */}
            <div className="absolute top-6 right-0 text-[100px] font-heading font-black text-white/[0.03] leading-none select-none pointer-events-none tracking-tighter">
              ABOUT
            </div>

            {/* Avatar + identity header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="shrink-0 group cursor-pointer relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 shadow-lg shadow-black/50">
                  <img
                    src="/avatar.png"
                    alt="Ebenezer Zotoo"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/8 blur-md transition-all duration-500 -z-10" />
              </div>
              <div>
                <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted">// about_user</h2>
                <p className="text-white font-semibold text-base mt-1 font-heading">Ebenezer Zotoo</p>
                <p className="text-os-accent-blue text-xs font-mono">Full-Stack Developer · Systems Architect · UI/UX Designer</p>
                <p className="text-os-text-muted text-xs mt-2 font-sans italic leading-snug max-w-xs">
                  Bridging Logic &amp; Creativity — Building Seamless, User-Centric Digital Experiences.
                </p>
              </div>
            </div>

            {/* Stats block */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: "8+",      label: "Years Experience"     },
                { value: "30+",    label: "Projects Shipped"     },
                { value: "1,000+", label: "Platform Users Built" },
                { value: "3",      label: "Countries"            },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/5 hover:border-[#D4AF37]/30 hover:shadow-[0_4px_20px_rgba(212,175,55,0.06)] rounded-lg px-4 py-3 text-center transition-all duration-300">
                  <p className="text-white font-heading font-bold text-2xl">{stat.value}</p>
                  <p className="text-os-text-muted text-[10px] font-mono tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Terminal Bio */}
            <div className="bg-[#111827]/80 border border-white/10 rounded-lg p-6 mb-10 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-os-accent-blue pb-4 border-b border-white/5">
                <Terminal className="w-4 h-4" />
                <span>~/ebenzotoo/bio.txt</span>
              </div>
              <p className="text-os-text-main leading-relaxed font-sans text-[15px]">
                &ldquo;Bridging Logic &amp; Creativity: Building Seamless, User-Centric Digital Experiences.&rdquo;
                <br /><br />
                I am a versatile technology professional and entrepreneur based in Accra, Ghana, with over a decade of experience. As a Founder, UI/UX Designer, and IT Specialist, I successfully bridge technical innovation with user-centered design. Certified by Google and IBM, my diverse expertise spans Python programming, Data Science, and strategic Digital Marketing.
              </p>
            </div>

            {/* Core Expertise */}
            <div className="mb-12">
              <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-6">// core_expertise</h2>
              <div className="flex flex-wrap gap-3">
                {["UI/UX Design", "Product Design", "Web & Platform Development", "Systems Thinking", "Digital Strategy"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/30 rounded-lg text-sm text-os-text-muted font-mono transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Trusted By */}
            <div className="mb-12">
              <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-6 flex items-center gap-2">
                // trusted_by
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {clients.map((client) => (
                  <div key={client.name} className="bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 group">
                    <img
                      src={client.logo}
                      alt={client.name}
                      title={client.name}
                      className="max-h-8 max-w-full object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <span className="text-[10px] font-mono text-os-text-muted text-center leading-tight opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-8 mt-16 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> // experience_log
            </h2>
            <div className="space-y-8 border-l border-white/10 ml-2 pl-6 relative">
              {jobs.map((job, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-[#0A0F1C] border border-[#D4AF37]/60 rounded-full" />
                  <h3 className="text-white font-medium text-sm">{job.role}</h3>
                  <p className="text-os-accent-blue text-xs font-mono mt-1">{job.company}</p>
                  <p className="text-os-text-muted text-xs mt-2">{job.year}</p>
                </div>
              ))}
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
            <p className="text-slate-500 text-base mb-4">
              Full-Stack Developer &middot; Systems Architect &middot; UI/UX Designer
            </p>
            <p className="text-slate-600 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              Bridging Logic &amp; Creativity — Building seamless, user-centric digital experiences from Accra, Ghana.
            </p>
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
                I am a versatile technology professional and entrepreneur based in Accra, Ghana, with over a decade
                of experience. As a Founder, UI/UX Designer, and IT Specialist, I bridge technical innovation with
                user-centered design. Certified by Google and IBM, my expertise spans Python programming, Data
                Science, and strategic Digital Marketing.
              </p>
            </div>
          </section>

          {/* Core Expertise */}
          <section className="py-14 px-6 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-8">// core_expertise</p>
              <div className="flex flex-wrap gap-3">
                {["UI/UX Design", "Product Design", "Web & Platform Development", "Systems Thinking", "Digital Strategy"].map((skill) => (
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
                      <p className="text-sm text-slate-500 mt-0.5">{job.company}</p>
                      <p className="text-xs text-slate-400 mt-1">{job.year}</p>
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
