"use client";

import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import {
  Mail, Phone, MapPin, Send,
  CheckCircle2, AlertCircle, LucideLinkedin, LucideTwitter, LucideFacebook,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";

type Config = {
  availability_status: string;
  available: boolean;
  email: string;
  phone: string;
  location: string;
};

const socials = [
  { icon: LucideLinkedin, href: "https://linkedin.com/in/ebenzotoo",    label: "LinkedIn"  },
  { icon: LucideTwitter,  href: "https://twitter.com/st_romario1",      label: "Twitter/X" },
  { icon: LucideFacebook, href: "https://facebook.com/ebenezerromario", label: "Facebook"  },
];

export default function ContactClient({ config }: { config: Config }) {
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
        await getSupabase().from("messages").insert({ name, email, message, read: false });
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.06 — CONTACT" sheet="06/06" />

        <div className="p-6 md:p-10 flex-1 w-full">
          <h1 className="sr-only">Contact — Ebenezer Zotoo</h1>
          <p className="text-bp-text-muted text-base max-w-lg leading-relaxed mb-8">
            If you&apos;re working on a digital product, platform, or system and need a solution that is functional, scalable, and user-focused — I can help.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Info block */}
            <div className="flex flex-col gap-6">
              <div className="sheet-card p-7 font-mono text-base">
                <div className="text-bp-text-main space-y-3">
                  <p><span className="text-bp-primary">const</span> developer = {"{"}</p>
                  <div className="pl-6 space-y-3">
                    <p className="flex items-center gap-3">
                      <span className="text-bp-text-muted">status:</span>
                      <span className={`flex items-center gap-2 ${config.available ? "text-bp-primary" : "text-yellow-400"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.available ? "bg-bp-primary animate-pulse" : "bg-yellow-400"}`} />
                        &quot;{config.availability_status}&quot;,
                      </span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-bp-text-muted flex items-center gap-2"><Mail className="w-4 h-4" /> email:</span>
                      <span className="text-bp-gold">&quot;{config.email}&quot;,</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-bp-text-muted flex items-center gap-2"><Phone className="w-4 h-4" /> phone:</span>
                      <span className="text-bp-gold">&quot;{config.phone}&quot;,</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-bp-text-muted flex items-center gap-2 mt-0.5"><MapPin className="w-4 h-4" /> location:</span>
                      <span className="text-bp-gold">&quot;{config.location}&quot;</span>
                    </p>
                  </div>
                  <p>{"};"}</p>
                </div>
              </div>

              <div className="sheet-card p-5 flex items-center justify-between">
                <span className="text-[12px] font-mono tracking-widest text-bp-text-muted">// social_links</span>
                <div className="flex items-center gap-4">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="text-bp-text-muted hover:text-bp-primary transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="sheet-card p-7 lg:p-9">
              <h3 className="text-xl font-semibold text-bp-text-main mb-6 font-heading flex items-center gap-2">
                <Send className="w-5 h-5 text-bp-text-muted" /> Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-mono text-bp-text-muted tracking-wider">NAME</label>
                  <input
                    id="contact-name"
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-bp-surface border border-bp-border rounded-lg px-5 py-3.5 text-[16px] text-bp-text-main placeholder:text-bp-text-muted/40 focus:outline-none focus:border-bp-primary focus:ring-1 focus:ring-bp-primary/20 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-mono text-bp-text-muted tracking-wider">EMAIL</label>
                  <input
                    id="contact-email"
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-bp-surface border border-bp-border rounded-lg px-5 py-3.5 text-[16px] text-bp-text-main placeholder:text-bp-text-muted/40 focus:outline-none focus:border-bp-primary focus:ring-1 focus:ring-bp-primary/20 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm font-mono text-bp-text-muted tracking-wider">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we collaborate?"
                    className="w-full bg-bp-surface border border-bp-border rounded-lg px-5 py-3.5 text-[16px] text-bp-text-main placeholder:text-bp-text-muted/40 focus:outline-none focus:border-bp-primary focus:ring-1 focus:ring-bp-primary/20 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="mt-2 w-full bg-bp-primary hover:bg-bp-primary/90 disabled:opacity-50 text-black font-semibold font-mono text-[16px] py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "SENDING..." : "SEND_MESSAGE"}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

                {status === "success" && (
                  <div className="mt-2 p-3 bg-bp-primary/10 border border-bp-primary/20 rounded-md flex items-center gap-2 text-bp-primary text-sm font-mono">
                    <CheckCircle2 className="w-4 h-4" /> MESSAGE SENT
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-400 text-sm font-mono">
                    <AlertCircle className="w-4 h-4" /> SOMETHING WENT WRONG. PLEASE RETRY.
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
