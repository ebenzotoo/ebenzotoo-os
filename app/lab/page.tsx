import { Code2, Terminal, Palette } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import DimensionLine from "@/components/DimensionLine";
import LabTabs, { type Experiment, type LabNote } from "@/components/LabTabs";
import { getSupabase } from "@/lib/supabase";

const experiments: Experiment[] = [
  {
    id: "EXP-01",
    title: "mentmate App - Auth Flow",
    type: "FLUTTER / DART",
    icon: <Code2 className="w-4 h-4 text-bp-secondary" />,
    snippet: `Future<void> signIn() async {\n  final response = await supabase.auth.signInWithPassword(\n    email: emailController.text,\n    password: passwordController.text,\n  );\n  if (response.user != null) {\n    routeToHome();\n  }\n}`,
    render: "Secure authentication successfully integrated with PostgreSQL backend. UI optimized for mobile responsiveness.",
  },
  {
    id: "EXP-02",
    title: "Lexical Analyzer Engine",
    type: "PYTHON / COMPILER DESIGN",
    icon: <Terminal className="w-4 h-4 text-bp-primary" />,
    snippet: `def tokenize(source_code):\n    tokens = []\n    for match in re.finditer(TOKEN_REGEX, source_code):\n        kind = match.lastgroup\n        value = match.group()\n        tokens.append(Token(kind, value))\n    return tokens`,
    render: "Core logic for parsing and tokenizing custom syntax structures. Optimized for high-speed code evaluation.",
  },
  {
    id: "EXP-03",
    title: "Glassmorphism UI Kit",
    type: "TAILWIND / CSS",
    icon: <Palette className="w-4 h-4 text-bp-gold" />,
    snippet: `.glass-panel {\n  @apply bg-white/5 backdrop-blur-2xl;\n  @apply border border-white/10 rounded-xl;\n  @apply shadow-2xl transition-all;\n}`,
    render: "A reusable, premium design system component used across corporate portfolios and medical e-commerce platforms.",
  },
];

export default async function Lab() {
  const { data, error } = await getSupabase()
    .from("notes")
    .select("slug, title, excerpt, tag, created_at, read_time")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching notes:", error);

  const notes: LabNote[] = data ?? [];

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.04 — LAB" sheet="04/06" />
        <div className="p-6 md:p-10 max-w-6xl w-full">
          <h1 className="sr-only">Lab — Experiments & Notes by Ebenezer Zotoo</h1>
          <DimensionLine className="mb-8" />
          <LabTabs experiments={experiments} notes={notes} />
        </div>
      </PageTransition>
    </main>
  );
}
