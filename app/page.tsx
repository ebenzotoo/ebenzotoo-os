import Sidebar from "../components/Sidebar";
import MobileDock from "../components/MobileDock";
import SystemDock from "../components/SystemDock";
import { Terminal, Code2, Paintbrush, Briefcase } from "lucide-react";
import PageTransition from "../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">

        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
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
                <div className="shrink-0 group cursor-pointer relative hidden sm:block">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 shadow-lg shadow-black/50">
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
                </div>
              </div>

              {/* Stats block */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "10+", label: "Years of Experience" },
                  { value: "50+", label: "Projects Shipped" },
                  { value: "3",   label: "Countries Worked Across" },
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
                  "Bridging Logic & Creativity: Building Seamless, User-Centric Digital Experiences."
                  <br /><br />
                  I am a versatile technology professional and entrepreneur based in Accra, Ghana, with over a decade of experience. As a Founder, UI/UX Designer, and IT Specialist, I successfully bridge technical innovation with user-centered design. Certified by Google and IBM, my diverse expertise spans Python programming, Data Science, and strategic Digital Marketing.
                </p>
              </div>

              {/* Skills Grid */}
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

              {/* Trusted By */}
              <div className="mb-12">
                <h2 className="text-xs font-mono tracking-[0.2em] text-os-text-muted mb-6 flex items-center gap-2">
                  // trusted_by
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Ghana Law Society",         logo: "/clients/gls.png"     },
                    { name: "National Service Authority", logo: "/clients/nsa.png"     },
                    { name: "Aurateq",                   logo: "/clients/aurateq.png" },
                    { name: "Ani Medical Consult",        logo: "/clients/ani.png"     },
                    { name: "God Alone Int Ministry",     logo: "/clients/gaim.png"    },
                    { name: "NASPA Ghana",               logo: "/clients/naspa.png"   },
                  ].map((client) => (
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
                {[
                  { role: "Senior Web and Graphics Designer", company: "Industrial Coatings Africa", year: "2025 – Present" },
                  { role: "Technical Lead", company: "National Service Authority", year: "2021 – 2025" },
                  { role: "Head, Brands and Design", company: "Swedec Ghana", year: "2015 – 2021" },
                  { role: "Director, Information Technology", company: "B.A United FC", year: "2015 – 2018" },
                ].map((job, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-[#0A0F1C] border border-[#D4AF37]/60 rounded-full" />
                    <h3 className="text-white font-medium text-sm">{job.role}</h3>
                    <p className="text-os-accent-blue text-xs font-mono mt-1">{job.company}</p>
                    <p className="text-os-text-muted text-xs mt-2">{job.year}</p>
                  </div>
                ))}
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
