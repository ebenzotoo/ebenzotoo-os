import Sidebar from "../components/Sidebar";
import MobileDock from "../components/MobileDock";
import SystemDock from "../components/SystemDock";
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return (
    // We changed the background to a much deeper radial gradient to mimic the "space" feel
    <div className="relative min-h-screen flex flex-col items-center w-full pb-16 md:pb-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">
      
      {/* Finer, more subtle grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Top Hero Section (Using the Inter font we just loaded) */}
      <div className="w-full flex flex-col items-center justify-center pt-24 pb-16 text-center z-10 px-4">
        <h1 className="text-4xl md:text-[40px] font-semibold tracking-[0.15em] text-white mb-6 font-sans">
          EBENEZER ZOTOO
        </h1>
        <div className="flex flex-col gap-2 text-[17px] text-os-text-muted mb-12 tracking-wide font-sans font-light">
          <p>Full-Stack Developer</p>
          <p>Systems Architect</p>
          <p>UI/UX Designer</p>
        </div>
        
        {/* Terminal prompt using JetBrains Mono font */}
        <div className="flex items-center gap-3 text-sm text-os-text-muted font-mono bg-[#111827]/50 px-4 py-2 rounded-full border border-white/5">
          <span className="text-os-accent-blue">↳</span> Press Enter to Explore
        </div>
      </div>

      {/* The OS Workspace (Notice the bg-[#0A0F1C]/40 and backdrop-blur-2xl for the glass effect) */}
      <div className="w-full max-w-[1440px] flex-1 flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">
        
        <Sidebar />

        <main className="flex-1 flex flex-col min-h-[800px]">
          <PageTransition>
          <div className="h-16 border-b border-white/5 flex justify-end items-center px-8 text-os-text-muted text-sm gap-5 hidden md:flex font-mono">
            <span>🔔</span>
            <span>☁️</span>
            <span>11:08 PM</span>
          </div>
          
        {/* Project List */}
            <div className="flex flex-col gap-3">
              <ProjectCard 
                title="NASPA Skills Hub" 
                description="Online learning platform for national service personnel" 
                updatedAt="Updated 1w ago" 
              />
              <ProjectCard 
                title="Ani Surgical & Medical Consult" 
                description="E-commerce platform for medical consumables & equipment" 
                updatedAt="Updated 2w ago" 
              />
              <ProjectCard 
                title="Aurateq Consult" 
                description="Business site for UK-based IT services provider" 
                updatedAt="Updated 3w ago" 
              />
              <ProjectCard 
                title="Kwahu Asabi Royal Foundation" 
                description="Community-centered platform for health, education & agriculture" 
                updatedAt="Updated 1mo ago" 
              />
              <ProjectCard 
                title="Empower Communities Ghana" 
                description="Impact-driven platform amplifying community empowerment" 
                updatedAt="Updated 2mo ago" 
              />
              <ProjectCard 
                title="NSS Restaurant App" 
                description="Mobile food ordering app for National Service personnel" 
                updatedAt="Updated 3mo ago" 
              />
              <ProjectCard 
                title="NSS Ghana Portal" 
                description="Internal Staff & Document Management Portal" 
                updatedAt="Updated 4mo ago" 
              />
              <ProjectCard 
                title="GAIM Church App" 
                description="Dedicated mobile application for church community" 
                updatedAt="Updated 5mo ago" 
              />

              {/* New Project Button */}
              <button className="flex items-center gap-3 px-5 py-4 mt-2 text-sm text-os-text-muted hover:text-white transition-colors w-fit group">
                <span className="text-lg group-hover:text-os-accent-green transition-colors">+</span> 
                New Project
              </button>
            </div>
            </PageTransition>
        </main>
        
      </div>
{/* The Global Bottom Footer & Dock */}
      <SystemDock />
      <MobileDock />
      
    </div>
  );
}