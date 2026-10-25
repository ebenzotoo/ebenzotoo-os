import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";

const jobs = [
  { role: "Senior Web & Graphics Designer",   company: "Industrial Coatings Africa",    year: "2025 – Present" },
  { role: "Technical Lead",                   company: "National Service Authority",    year: "2021 – 2025"    },
  { role: "Head, Brands & Design",            company: "Swedec Ghana",                  year: "2015 – 2021"    },
  { role: "Director, Information Technology", company: "B.A United FC",                 year: "2015 – 2018"    },
];

const expertise = [
  "UI/UX & Product Design",
  "Web & Platform Development",
  "Digital Systems Architecture",
  "User Experience Optimization",
  "Product Strategy & Execution",
];

export default function About() {
  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.02 — ABOUT" sheet="02/06" />

        <div className="p-6 md:p-10 max-w-3xl mx-auto flex flex-col gap-10">

          {/* Elevation-view photo */}
          <div className="relative w-[160px] h-[200px] border border-bp-border">
            <span className="corner-tl" />
            <span className="corner-br" />
            <img src="/avatar.png" alt="Ebenezer Zotoo" className="w-full h-full object-cover object-top" />
            <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-mono text-bp-primary tracking-[0.1em]">
              ELEVATION — FRONT
            </span>
          </div>

          {/* Narrative */}
          <div className="flex flex-col gap-4">
            <h1 className="sr-only">About Ebenezer Zotoo</h1>
            <h2 className="fig-label">FIG.02A — NARRATIVE</h2>
            <p className="text-bp-text-muted leading-relaxed text-[17px]">
              I am a Digital Product Designer and Systems Builder focused on creating solutions that work — not just look good.
            </p>
            <p className="text-bp-text-muted leading-relaxed text-[17px]">
              Over the past 8+ years, I&apos;ve worked on projects across government, healthcare, education, and technology, helping organizations build digital platforms that improve operations, increase accessibility, and deliver measurable impact.
            </p>
            <p className="text-bp-text-muted leading-relaxed text-[17px]">
              My approach combines design, development, and strategic thinking. I don&apos;t just create interfaces — I design systems that solve real problems. I believe every product should serve a clear purpose, be easy to use, and scale effectively as it grows.
            </p>
            <p className="text-bp-text-muted leading-relaxed text-[17px]">
              If you&apos;re building something meaningful and need a partner who understands both the technical and user experience side — I&apos;m open to working with you.
            </p>
          </div>

          {/* Core expertise */}
          <div>
            <h2 className="fig-label">FIG.02B — CORE EXPERTISE</h2>
            <div className="flex flex-wrap gap-3">
              {expertise.map((skill) => (
                <span key={skill} className="px-5 py-2.5 sheet-card text-base text-bp-text-muted hover:text-bp-text-main font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Compact role history (dates only — full timeline lives on Cover) */}
          <div>
            <h2 className="fig-label">FIG.02C — ROLE HISTORY</h2>
            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <div key={job.role} className="flex items-baseline justify-between gap-4 border-b border-bp-border pb-3">
                  <div>
                    <p className="text-[15px] font-semibold text-bp-text-main">{job.role}</p>
                    <p className="text-[14px] text-bp-secondary font-mono">{job.company}</p>
                  </div>
                  <span className="text-[13px] font-mono text-bp-text-muted shrink-0">{job.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
