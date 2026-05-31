import { FlaskConical, Code2, Play, Terminal, Palette } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import LiveClock from "@/components/LiveClock";
import NotificationBell from "@/components/NotificationBell";
import CloudStatus from "@/components/CloudStatus";


export default function Lab() {
  const experiments = [
    {
      id: "EXP-01",
      title: "mentmate App - Auth Flow",
      type: "FLUTTER / DART",
      icon: <Code2 className="w-4 h-4 text-os-secondary" />,
      snippet: `Future<void> signIn() async {\n  final response = await supabase.auth.signInWithPassword(\n    email: emailController.text,\n    password: passwordController.text,\n  );\n  if (response.user != null) {\n    routeToHome();\n  }\n}`,
      render: "Secure authentication successfully integrated with PostgreSQL backend. UI optimized for mobile responsiveness."
    },
    {
      id: "EXP-02",
      title: "Lexical Analyzer Engine",
      type: "PYTHON / COMPILER DESIGN",
      icon: <Terminal className="w-4 h-4 text-os-primary" />,
      snippet: `def tokenize(source_code):\n    tokens = []\n    for match in re.finditer(TOKEN_REGEX, source_code):\n        kind = match.lastgroup\n        value = match.group()\n        tokens.append(Token(kind, value))\n    return tokens`,
      render: "Core logic for parsing and tokenizing custom syntax structures. Optimized for high-speed code evaluation."
    },
    {
      id: "EXP-03",
      title: "Glassmorphism UI Kit",
      type: "TAILWIND / CSS",
      icon: <Palette className="w-4 h-4 text-[#ce9178]" />,
      snippet: `.glass-panel {\n  @apply bg-white/5 backdrop-blur-2xl;\n  @apply border border-white/10 rounded-xl;\n  @apply shadow-2xl transition-all;\n}`,
      render: "A reusable, premium design system component used across corporate portfolios and medical e-commerce platforms."
    }
  ];

  return (
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 md:pb-0">
            <PageTransition>
          <div className="border-b border-white/[0.08] flex justify-end items-center px-8 py-5 text-os-text-muted text-sm gap-5 hidden md:flex text-xs sticky top-0 bg-os-bg/90 backdrop-blur-md z-20">
            <NotificationBell />
            <CloudStatus />
            <span>~/LAB_ENVIRONMENT <LiveClock /></span>
          </div>

          <div className="p-6 md:p-10 flex-1 max-w-6xl w-full relative">

            {/* Ghost watermark */}
            <div className="absolute top-4 right-0 text-[110px] font-sans font-extrabold text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
              LAB
            </div>

            <h2 className="text-xs font-bold tracking-[0.2em] text-os-text-muted mb-8 font-sans flex items-center gap-2">
              <FlaskConical className="w-4 h-4" /> ACTIVE_EXPERIMENTS
            </h2>

            <div className="flex flex-col gap-10">
              {experiments.map((exp) => (
                <div key={exp.id} className="glass-card rounded-[14px] overflow-hidden flex flex-col shadow-lg">

                  {/* Header Bar */}
                  <div className="bg-white/[0.04] px-5 py-3 border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {exp.icon}
                      <span className="text-os-text-main font-medium text-sm tracking-wide">{exp.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono tracking-widest text-os-text-muted px-2 py-1 rounded bg-white/[0.05] border border-white/[0.08] hidden sm:block">
                        {exp.type}
                      </span>
                      <button className="flex items-center gap-1.5 text-xs font-mono text-os-primary hover:text-os-text-main transition-colors bg-os-primary/10 hover:bg-os-primary/20 px-3 py-1.5 rounded border border-os-primary/20">
                        <Play className="w-3 h-3" fill="currentColor" /> RUN
                      </button>
                    </div>
                  </div>

                  {/* Split Workspace */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">

                    {/* Left: Code Editor View */}
                    <div className="p-5 font-mono text-xs overflow-x-auto bg-[#050810]/50">
                      <div className="text-os-text-muted mb-3 select-none flex gap-4 border-b border-white/[0.08] pb-2">
                        <span className="text-os-secondary border-b border-os-secondary pb-2 -mb-[9px]">source_code</span>
                      </div>
                      <pre className="text-os-text-main leading-relaxed">
                        <code>{exp.snippet}</code>
                      </pre>
                    </div>

                    {/* Right: Render / Output View */}
                    <div className="p-5 flex flex-col justify-center items-center text-center bg-white/[0.02] relative min-h-[150px]">
                      <div className="absolute top-3 left-3 text-[10px] font-mono text-os-text-muted tracking-widest">
                        OUTPUT_CONSOLE
                      </div>
                      <p className="text-sm text-os-text-muted leading-relaxed max-w-sm mt-4">
                        {exp.render}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
          </PageTransition>
    </main>
  );
}
