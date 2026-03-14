"use client";

import { useState } from "react";
import PageTransition from "../../components/PageTransition";
import { useTheme } from "@/components/ThemeProvider";
import {
  Terminal, Mail, Phone, MapPin, Send,
  CheckCircle2, AlertCircle, LucideLinkedin, LucideTwitter, LucideFacebook,
} from "lucide-react";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";
import { getSupabase } from "@/lib/supabase";

type Config = {
  availability_status: string;
  available: boolean;
  email: string;
  phone: string;
  location: string;
};

export default function ContactClient({ config }: { config: Config }) {
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name,
      email,
      message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await getSupabase()
          .from("messages")
          .insert({ name, email, message, read: false });
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: LucideLinkedin, href: "https://linkedin.com/in/ebenzotoo",    label: "LinkedIn"  },
    { icon: LucideTwitter,  href: "https://twitter.com/st_romario1",      label: "Twitter/X" },
    { icon: LucideFacebook, href: "https://facebook.com/ebenezerromario", label: "Facebook"  },
  ];

  if (theme === "clean") {
    return (
      <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
        <PageTransition>
          <div className="py-14 px-6">
            <div className="max-w-3xl mx-auto">

              {/* Header */}
              <div className="mb-10">
                <p className="text-xs tracking-[0.15em] text-slate-400 mb-3">// contact</p>
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-2">Get In Touch</h1>
                <p className="text-slate-500 text-sm">
                  {config.available ? config.availability_status : "Currently unavailable — check back soon."} Response within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <a href={`mailto:${config.email}`} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                        <Mail className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Email</p>
                        <p className="text-sm text-slate-700 font-medium">{config.email}</p>
                      </div>
                    </a>

                    <a href={`tel:${config.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                        <Phone className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Phone</p>
                        <p className="text-sm text-slate-700 font-medium">{config.phone}</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Location</p>
                        <p className="text-sm text-slate-700 font-medium">{config.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-3">Follow Me</p>
                    <div className="flex items-center gap-3">
                      {socials.map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={label}
                          className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can I help you?"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-[#f8fafc] text-sm font-medium py-2.5 rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                  </button>

                  {status === "success" && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Message sent successfully!
                    </div>
                  )}
                  {status === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" /> Something went wrong. Please try again.
                    </div>
                  )}
                </form>

              </div>
            </div>
          </div>
        </PageTransition>
      </main>
    );
  }

  // ========== OS VERSION ==========
  return (
    <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
      <PageTransition>
        <div className="border-b border-white/5 flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex font-mono sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-md z-20">
          <NotificationBell />
          <CloudStatus />
          <span>~/SECURE_COMMS <LiveClock /></span>
        </div>

        <div className="p-6 md:p-10 flex-1 w-full relative">
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
                      <span className={`flex items-center gap-2 ${config.available ? "text-os-accent-green" : "text-yellow-400"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.available ? "bg-os-accent-green animate-pulse" : "bg-yellow-400"}`} />
                        &quot;{config.availability_status}&quot;,
                      </span>
                    </p>
                    <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                      <span className="text-os-text-muted flex items-center gap-2"><Mail className="w-3.5 h-3.5"/> email:</span>
                      <span className="text-[#ce9178] group-hover:text-white">&quot;{config.email}&quot;,</span>
                    </p>
                    <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                      <span className="text-os-text-muted flex items-center gap-2"><Phone className="w-3.5 h-3.5"/> phone:</span>
                      <span className="text-[#ce9178] group-hover:text-white">&quot;{config.phone}&quot;,</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-os-text-muted flex items-center gap-2 mt-0.5"><MapPin className="w-3.5 h-3.5"/> location:</span>
                      <span className="text-[#ce9178]">&quot;{config.location}&quot;</span>
                    </p>
                  </div>
                  <p>{'};'}</p>
                </div>
              </div>

              <div className="text-xs text-os-text-muted font-mono bg-os-accent-green/5 border border-os-accent-green/10 p-4 rounded-lg">
                <span className="text-os-accent-green">{'>'}</span> SYSTEM_MESSAGE: Connect with me via email and call. Response time is typically within 24 hours.
              </div>

              <div className="bg-[#111827]/60 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-os-text-muted">// social_links</span>
                <div className="flex items-center gap-4">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="text-os-text-muted hover:text-[#D4AF37] transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-[#111827]/40 border border-white/5 rounded-lg p-6 lg:p-8 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-os-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="text-lg font-semibold text-white mb-6 font-sans flex items-center gap-2">
                <Send className="w-5 h-5 text-os-text-muted" />
                Initialize_Transmission
              </h3>

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
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full bg-white/5 hover:bg-[#D4AF37]/15 disabled:opacity-50 disabled:hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 text-white font-mono text-sm py-3 rounded-md transition-all flex items-center justify-center gap-2 group/btn"
                >
                  {isSubmitting ? "EXECUTING..." : "EXECUTE_SEND"}
                  {!isSubmitting && <Send className="w-4 h-4 text-os-text-muted group-hover/btn:text-[#D4AF37] transition-colors" />}
                </button>

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
  );
}
