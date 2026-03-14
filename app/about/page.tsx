import { Terminal, Code2, Paintbrush, Briefcase } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";

const jobs = [
  { role: "Senior Web and Graphics Designer", company: "Industrial Coatings Africa",    year: "2025 – Present" },
  { role: "Technical Lead",                   company: "National Service Authority",     year: "2021 – 2025"   },
  { role: "Head, Brands and Design",          company: "Swedec Ghana",                  year: "2015 – 2021"   },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018"   },
];

export default function About() {
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

          <div className="p-6 md:p-10 flex-1 max-w-4xl">
            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans">ABOUT_USER</h2>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-white mb-6">
                  <Code2 className="w-5 h-5 text-os-accent-green" />
                  <h3 className="font-semibold tracking-wide">Development Core</h3>
                </div>
                {[
                  { name: "Web Design & Dev", val: "100%" },
                  { name: "WordPress", val: "100%" },
                  { name: "Python Programming", val: "99%" },
                  { name: "Mobile App Dev", val: "99%" },
                  { name: "Project Management", val: "98%" },
                ].map(skill => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-xs text-os-text-muted font-mono">
                      <span>{skill.name}</span>
                      <span className="text-os-accent-green">{skill.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-os-accent-green" style={{ width: skill.val }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-2 text-white mb-6">
                  <Paintbrush className="w-5 h-5 text-os-accent-blue" />
                  <h3 className="font-semibold tracking-wide">Design Core</h3>
                </div>
                {[
                  { name: "Figma", val: "100%" },
                  { name: "Adobe Photoshop", val: "100%" },
                  { name: "Adobe Illustrator", val: "99%" },
                  { name: "Adobe XD", val: "98%" },
                  { name: "Digital Marketing", val: "98%" },
                ].map(skill => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-xs text-os-text-muted font-mono">
                      <span>{skill.name}</span>
                      <span className="text-os-accent-blue">{skill.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-os-accent-blue" style={{ width: skill.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans mt-16 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> SYSTEM_LOGS: EXPERIENCE
            </h2>
            <div className="space-y-8 border-l border-white/10 ml-2 pl-6 relative">
              {jobs.map((job, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-os-bg border border-os-accent-blue rounded-full" />
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

          <section className="py-14 px-6 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.15em] text-slate-400 mb-8">// skills &amp; expertise</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Development</h3>
                  <ul className="space-y-3">
                    {["Web Design & Development", "WordPress", "Python Programming", "Mobile App Development", "Project Management"].map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Design</h3>
                  <ul className="space-y-3">
                    {["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Digital Marketing"].map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
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
