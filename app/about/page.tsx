import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import { Terminal, Code2, Paintbrush, Briefcase } from "lucide-react";
import PageTransition from "../../components/PageTransition";

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col items-center w-full pb-16 md:pb-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Top Hero Section */}
      <div className="w-full flex flex-col items-center justify-center pt-24 pb-16 text-center z-10 px-4">
        <h1 className="text-4xl md:text-[40px] font-semibold tracking-[0.15em] text-white mb-6 font-sans">
          EBENEZER ZOTOO
        </h1>
        <div className="flex flex-col gap-2 text-[17px] text-os-text-muted mb-12 tracking-wide font-sans font-light">
          <p>Full-Stack Developer</p>
          <p>Systems Architect</p>
          <p>UI/UX Designer</p>
        </div>
      </div>

      {/* The OS Workspace */}
      <div className="w-full max-w-[1440px] flex-1 flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">
        
        <Sidebar />

        <main className="flex-1 flex flex-col min-h-[800px] overflow-y-auto">
            <PageTransition>
          {/* Top Bar */}
          <div className="h-16 border-b border-white/5 flex justify-end items-center px-8 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
            <span>🔔</span>
            <span>☁️</span>
            <span>SYSTEM_INFO</span>
          </div>
          
          <div className="p-6 md:p-10 flex-1 max-w-4xl">
            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans">ABOUT_USER</h2>
            
            {/* Terminal Bio Section */}
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
              {/* Development Skills */}
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
                  { name: "Project Management", val: "98%" }
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

              {/* Design Skills */}
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
                  { name: "Digital Marketing", val: "98%" }
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

            {/* Experience Timeline */}
            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans mt-16 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> SYSTEM_LOGS: EXPERIENCE
            </h2>
            
            <div className="space-y-8 border-l border-white/10 ml-2 pl-6 relative">
              {[
                { role: "Senior Web and Graphics Designer", company: "Industrial Coatings Africa", year: "2025 – Present" },
                { role: "Technical Lead", company: "National Service Authority", year: "2021 – 2025" },
                { role: "Head, Brands and Design", company: "Swedec Ghana", year: "2015 – 2021" },
                { role: "Director, Information Technology", company: "B.A United FC", year: "2015 – 2018" }
              ].map((job, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-os-bg border border-os-accent-blue rounded-full" />
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