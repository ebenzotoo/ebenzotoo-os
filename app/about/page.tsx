import { Terminal, Briefcase } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";

const jobs = [
  { role: "Senior Web & Graphics Designer",   company: "Industrial Coatings Africa",    year: "2025 – Present", desc: "Designed and implemented digital solutions to enhance brand visibility and user engagement."                                                      },
  { role: "Technical Lead",                   company: "National Service Authority",     year: "2021 – 2025",   desc: "Led the design and development of digital platforms that improved service delivery and operational efficiency."                               },
  { role: "Head, Brands & Design",            company: "Swedec Ghana",                  year: "2015 – 2021",   desc: "Led branding, digital strategy, and design execution across multiple initiatives."                                                           },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018",   desc: "Managed IT systems and digital infrastructure supporting organizational operations."                                                         },
];

export default function About() {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
      <PageTransition>

        {/* ========== OS VERSION ========== */}
        <div className="os-only">
          <div className="border-b border-os-border flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
            <NotificationBell />
            <CloudStatus />
            <span>SYSTEM_INFO <LiveClock /></span>
          </div>

          <div className="p-6 md:p-10 flex-1 max-w-4xl">
            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans">ABOUT_USER</h2>

            <div className="bg-os-surface border border-os-border rounded-lg p-6 mb-10 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-os-secondary pb-4 border-b border-os-border">
                <Terminal className="w-4 h-4" />
                <span>~/ebenzotoo/bio.txt</span>
              </div>
              <p className="text-os-text-main leading-relaxed font-sans text-[15px]">
                I am a Digital Product Designer and Systems Builder focused on creating solutions that work — not just look good.
                <br /><br />
                Over the past 8+ years, I&apos;ve worked on projects across government, healthcare, education, and technology, helping organizations build digital platforms that improve operations, increase accessibility, and deliver measurable impact. My approach combines design, development, and strategic thinking. I don&apos;t just create interfaces — I design systems that solve real problems.
                <br /><br />
                I&apos;ve led and contributed to projects involving digital learning platforms, internal management systems, e-commerce solutions, mobile applications, and organizational digital transformation. If you&apos;re building something meaningful and need a partner who understands both the technical and user experience side — I&apos;m open to working with you.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-6"><span className="text-os-primary">//</span> core_expertise</h2>
              <div className="flex flex-wrap gap-3">
                {["UI/UX & Product Design", "Web & Platform Development", "Digital Systems Architecture", "User Experience Optimization", "Product Strategy & Execution"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-os-surface border border-os-border hover:border-os-primary/35 rounded-lg text-sm text-os-text-muted font-mono transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans mt-16 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> SYSTEM_LOGS: EXPERIENCE
            </h2>
            <div className="space-y-8 border-l border-os-border ml-2 pl-6 relative">
              {jobs.map((job, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 border-2 border-os-primary bg-os-bg rounded-full" />
                  <h3 className="text-os-text-main font-medium text-sm">{job.role}</h3>
                  <p className="text-os-secondary text-xs font-mono mt-1">{job.company} · {job.year}</p>
                  <p className="text-os-text-muted text-xs mt-2 leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== CLEAN VERSION ========== */}
        <div className="clean-only">

          <section className="py-14 px-6 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-4">// about</p>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                I am a Digital Product Designer and Systems Builder focused on creating solutions that work — not just look good.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] mt-4">
                Over the past 8+ years, I&apos;ve worked on projects across government, healthcare, education, and technology, helping organizations build digital platforms that improve operations, increase accessibility, and deliver measurable impact.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] mt-4">
                My approach combines design, development, and strategic thinking. I don&apos;t just create interfaces — I design systems that solve real problems. I believe every product should serve a clear purpose, be easy to use, and scale effectively as it grows.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] mt-4">
                If you&apos;re building something meaningful and need a partner who understands both the technical and user experience side — I&apos;m open to working with you.
              </p>
            </div>
          </section>

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
