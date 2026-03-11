import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import { Terminal, Mail, Phone, MapPin, Send } from "lucide-react";
import PageTransition from "../../components/PageTransition";


export default function Contact() {
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
            <span>~/SECURE_COMMS</span>
          </div>
          
          <div className="p-6 md:p-10 flex-1 max-w-5xl w-full">
            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans">CONNECTION_PROTOCOLS</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Contact JSON Info */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#111827]/80 border border-white/10 rounded-lg p-6 font-mono text-sm w-full">
                  <div className="flex items-center gap-2 mb-4 text-os-accent-blue pb-4 border-b border-white/5">
                    <Terminal className="w-4 h-4" />
                    <span>~/ebenzotoo/contact.json</span>
                  </div>
                  
                  <div className="text-os-text-main space-y-3">
                    <p><span className="text-os-accent-blue">const</span> <span className="text-white">developer</span> = {'{'}</p>
                    <div className="pl-6 space-y-3">
                      <p className="flex items-center gap-3">
                        <span className="text-os-text-muted">status:</span> 
                        <span className="text-os-accent-green flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-os-accent-green animate-pulse" />
                          "Available for freelance work",
                        </span>
                      </p>
                      <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                        <span className="text-os-text-muted flex items-center gap-2"><Mail className="w-3.5 h-3.5"/> email:</span> 
                        <span className="text-[#ce9178] group-hover:text-white">"contact@ebenzotoo.com",</span>
                      </p>
                      <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                        <span className="text-os-text-muted flex items-center gap-2"><Phone className="w-3.5 h-3.5"/> phone:</span> 
                        <span className="text-[#ce9178] group-hover:text-white">"+233 20 001 2873",</span>
                      </p>
                      <p className="flex items-start gap-3">
                        <span className="text-os-text-muted flex items-center gap-2 mt-0.5"><MapPin className="w-3.5 h-3.5"/> location:</span> 
                        <span className="text-[#ce9178]">
                          "32 Mauve Avenue,<br/>Mile 7, Accra, Ghana"
                        </span>
                      </p>
                    </div>
                    <p>{'};'}</p>
                  </div>
                </div>
                
                <div className="text-xs text-os-text-muted font-mono bg-os-accent-green/5 border border-os-accent-green/10 p-4 rounded-lg">
                  <span className="text-os-accent-green">{'>'}</span> SYSTEM_MESSAGE: Connect with me via email and call. Response time is typically within 24 hours.
                </div>
              </div>

              {/* Right Column: Secure Message Form */}
              <div className="bg-[#111827]/40 border border-white/5 rounded-lg p-6 lg:p-8 flex flex-col relative overflow-hidden group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-os-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <h3 className="text-lg font-semibold text-white mb-6 font-sans flex items-center gap-2">
                  <Send className="w-5 h-5 text-os-text-muted" />
                  Initialize_Transmission
                </h3>
                
                <form className="flex flex-col gap-5 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-os-text-muted tracking-wider">SENDER_NAME</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      className="bg-[#0A0F1C] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-os-accent-blue transition-colors font-sans placeholder:text-white/20"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-os-text-muted tracking-wider">SENDER_EMAIL</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-[#0A0F1C] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-os-accent-blue transition-colors font-sans placeholder:text-white/20"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-os-text-muted tracking-wider">PAYLOAD (MESSAGE)</label>
                    <textarea 
                      rows={5}
                      placeholder="How can we collaborate?" 
                      className="bg-[#0A0F1C] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-os-accent-blue transition-colors font-sans resize-none placeholder:text-white/20"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="button" 
                    className="mt-2 w-full bg-white/5 hover:bg-os-accent-blue/20 border border-white/10 hover:border-os-accent-blue/50 text-white font-mono text-sm py-3 rounded-md transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    EXECUTE_SEND 
                    <Send className="w-4 h-4 text-os-text-muted group-hover/btn:text-os-accent-blue transition-colors" />
                  </button>
                </form>
              </div>

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