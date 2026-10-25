import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import DimensionLine from "@/components/DimensionLine";
import Callout from "@/components/Callout";

const clients = [
  { name: "Ghana Law Society",          logo: "/clients/gls.png"     },
  { name: "National Service Authority", logo: "/clients/nsa.png"     },
  { name: "Aurateq",                    logo: "/clients/aurateq.png" },
  { name: "Ani Medical Consult",        logo: "/clients/ani.png"     },
  { name: "God Alone Int Ministry",     logo: "/clients/gaim.png"    },
  { name: "NASPA Ghana",                logo: "/clients/naspa.png"   },
];

const jobs = [
  { role: "Senior Web & Graphics Designer",   company: "Industrial Coatings Africa",    year: "2025 – Present", desc: "Designed and implemented digital solutions to enhance brand visibility and user engagement."                     },
  { role: "Technical Lead",                   company: "National Service Authority",    year: "2021 – 2025",    desc: "Led the design and development of digital platforms that improved service delivery and operational efficiency." },
  { role: "Head, Brands & Design",            company: "Swedec Ghana",                  year: "2015 – 2021",    desc: "Led branding, digital strategy, and design execution across multiple initiatives."                               },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018",    desc: "Managed IT systems and digital infrastructure supporting organizational operations."                             },
];

const techMarquee = [
  "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Node.js",
  "Flutter", "PostgreSQL", "UI/UX Design", "Systems Architecture", "Web Development", "Mobile Apps",
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.01 — SYSTEMS ARCHITECT" sheet="01/06" />

        <div className="p-6 md:p-10 flex flex-col gap-12">

          {/* Hero */}
          <section className="relative pt-4 pb-10 md:pt-8 md:pb-14">
            <DimensionLine className="mb-8" />

            <Callout label="SPACE GROTESK" detail="700 / 48PX">
              <h1 className="text-[40px] md:text-[58px] font-heading font-bold text-bp-text-main leading-[1.08] max-w-xl">
                Building digital systems that work.
              </h1>
            </Callout>

            <p className="text-bp-text-muted text-[17px] max-w-md mt-6 leading-relaxed">
              Full-Stack Developer, Systems Architect, and UI/UX Designer — 8+ years turning complex ideas into platforms that ship.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/contact" className="px-6 py-3 bg-bp-primary hover:bg-bp-primary/90 text-black text-[15px] font-bold font-mono rounded-lg transition-colors">
                START A PROJECT
              </Link>
              <Link href="/projects" className="px-6 py-3 bg-bp-primary/10 border border-bp-primary/30 hover:border-bp-primary/60 text-bp-primary text-[15px] font-semibold font-mono rounded-lg transition-colors flex items-center gap-2">
                VIEW WORK <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Elevation-view photo — same treatment as the About sheet */}
            <div className="absolute right-0 top-0 hidden md:block w-[160px] h-[200px] border border-bp-border">
              <span className="corner-tl" />
              <span className="corner-br" />
              <img src="/avatar.png" alt="Ebenezer Zotoo" className="w-full h-full object-cover object-top" />
              <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-mono text-bp-primary tracking-[0.1em]">
                ELEVATION — FRONT
              </span>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 border border-bp-border rounded-xl overflow-hidden">
            {[
              { value: "8+",     label: "Years Exp."  },
              { value: "30+",    label: "Projects"    },
              { value: "15+",    label: "Clients"     },
              { value: "1,000+", label: "Users Built" },
            ].map((stat, i, arr) => (
              <div key={stat.label} className={`flex flex-col items-center py-6 ${i < arr.length - 1 ? "border-r border-bp-border" : ""}`}>
                <p className="text-[24px] font-heading font-bold text-bp-primary leading-none">{stat.value}</p>
                <p className="text-[12px] font-mono text-bp-text-muted tracking-wider mt-1.5 uppercase">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Marquee */}
          <section className="overflow-hidden border-y border-bp-border py-4">
            <div className="marquee-track gap-0">
              {[...techMarquee, ...techMarquee].map((item, i) => (
                <span key={i} className="flex items-center gap-4 shrink-0 px-4 text-[13px] text-bp-text-muted font-mono tracking-[0.08em] uppercase">
                  <span className="text-bp-primary/50">·</span>
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Trusted By */}
          <section>
            <h2 className="fig-label">FIG.01A — TRUSTED BY</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {clients.map((client) => (
                <div key={client.name} className="sheet-card p-6 flex flex-col items-center justify-center gap-3">
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    className="max-h-12 max-w-full object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-[12px] text-bp-text-muted text-center leading-tight opacity-70">{client.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="fig-label">FIG.01B — EXPERIENCE</h2>
            <div className="flex flex-col gap-7 border-l-2 border-bp-border pl-7">
              {jobs.map((job) => (
                <div key={job.role} className="relative">
                  <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 border-bp-primary bg-bp-bg" />
                  <p className="text-[16px] font-semibold text-bp-text-main">{job.role}</p>
                  <p className="text-[14px] text-bp-secondary font-mono mt-0.5">{job.company}</p>
                  <p className="text-[13px] text-bp-text-muted mt-0.5 font-mono">{job.year}</p>
                  <p className="text-[15px] text-bp-text-muted mt-2 leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </PageTransition>
    </main>
  );
}
