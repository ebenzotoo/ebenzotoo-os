"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MobileDock from "../../components/MobileDock";
import SystemDock from "../../components/SystemDock";
import PageTransition from "../../components/PageTransition";
import { Terminal, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, LucideLinkedin, LucideTwitter, LucideFacebook } from "lucide-react";
import LiveClock from "@/components/LiveClock";

export default function Contact() {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    // Web3Forms key
    const formData = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0A0F1C] to-[#050810]">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />


<div className="w-full max-w-[1440px] mx-auto flex-1 overflow-hidden flex border-t border-white/10 bg-[#0A0F1C]/40 backdrop-blur-2xl z-10 shadow-2xl">
        
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
          <PageTransition>
            <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
              <span>🔔</span>
              <span>☁️</span>
              <span>~/SECURE_COMMS <LiveClock /></span>
            </div>
            
            <div className="p-6 md:p-10 flex-1 max-w-5xl w-full relative">

              {/* Ghost watermark */}
              <div className="absolute top-4 right-0 text-[85px] font-heading font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
                CONTACT
              </div>

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

                  {/* Social Links */}
                  <div className="bg-[#111827]/60 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-os-text-muted">// social_links</span>
                    <div className="flex items-center gap-4">
                      {[
                        { icon: LucideLinkedin, href: "https://linkedin.com/in/ebenzotoo",    label: "LinkedIn"  },
                        { icon: LucideTwitter,  href: "https://twitter.com/st_romario1",      label: "Twitter/X" },
                        { icon: LucideFacebook, href: "https://facebook.com/ebenezerromario", label: "Facebook"  },
                      ].map(({ icon: Icon, href, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                          className="text-os-text-muted hover:text-[#D4AF37] transition-colors duration-200">
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Secure Message Form */}
                <div className="bg-[#111827]/40 border border-white/5 rounded-lg p-6 lg:p-8 flex flex-col relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-os-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <h3 className="text-lg font-semibold text-white mb-6 font-sans flex items-center gap-2">
                    <Send className="w-5 h-5 text-os-text-muted" />
                    Initialize_Transmission
                  </h3>
                  
                  {/* The interactive form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-os-text-muted tracking-wider">SENDER_NAME</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name" 
                        className="bg-[#0A0F1C] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-os-accent-blue transition-colors font-sans placeholder:text-white/20"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-os-text-muted tracking-wider">SENDER_EMAIL</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="bg-[#0A0F1C] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-os-accent-blue transition-colors font-sans placeholder:text-white/20"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-os-text-muted tracking-wider">PAYLOAD (MESSAGE)</label>
                      <textarea 
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we collaborate?" 
                        className="bg-[#0A0F1C] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-os-accent-blue transition-colors font-sans resize-none placeholder:text-white/20"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-2 w-full bg-white/5 hover:bg-[#D4AF37]/15 disabled:opacity-50 disabled:hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 text-white font-mono text-sm py-3 rounded-md transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      {isSubmitting ? "EXECUTING..." : "EXECUTE_SEND"}
                      {!isSubmitting && <Send className="w-4 h-4 text-os-text-muted group-hover/btn:text-[#D4AF37] transition-colors" />}
                    </button>

                    {/* Status Messages */}
                    {status === "success" && (
                      <div className="mt-2 p-3 bg-os-accent-green/10 border border-os-accent-green/20 rounded-md flex items-center gap-2 text-os-accent-green text-xs font-mono">
                        <CheckCircle2 className="w-4 h-4" /> TRANSMISSION SUCCESSFUL
                      </div>
                    )}
                    {status === "error" && (
                      <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-400 text-xs font-mono">
                        <AlertCircle className="w-4 h-4" /> TRANSMISSION FAILED. PLEASE RETRY.
                      </div>
                    )}

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