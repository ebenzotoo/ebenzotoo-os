import PageTransition from "@/components/PageTransition";
import SheetHeader from "@/components/SheetHeader";
import DimensionLine from "@/components/DimensionLine";
import DrawingCard from "@/components/DrawingCard";
import { getSupabase } from "@/lib/supabase";

const projectImageMap: Record<string, string> = {
  "naspa-skills-hub":              "/projects/skillshub.png",
  "ani-surgical":                  "/projects/ani-medical.png",
  "ani-surgical-medical-consult":  "/projects/ani-medical.png",
  "ani-medical-consult":           "/projects/ani-medical.png",
  "aurateq":                       "/projects/aurateq.png",
  "aurateq-consult":               "/projects/aurateq.png",
  "empower-communities-ghana":     "/projects/empower.png",
  "empower-communities":           "/projects/empower.png",
  "gaim-church-app":               "/projects/gaim.png",
  "gaim":                          "/projects/gaim.png",
  "kwahu-asabi-royal-foundation":  "/projects/kwahu-asabi.png",
  "karf":                          "/projects/kwahu-asabi.png",
  "kwahu-asabi-foundation":        "/projects/kwahu-asabi.png",
  "naspa-ghana":                   "/projects/naspa1.png",
  "naspa":                         "/projects/naspa1.png",
  "nss-internal-portal":           "/projects/nss-portal.png",
  "nss-contributor-portal":        "/projects/nss-portal.png",
  "nss-revenue-portal":            "/projects/nss-portal.png",
  "nss-ghana-portal":              "/projects/nss-portal.png",
  "nss-restaurant-app":            "/projects/nss-restaurant.png",
  "nss-restaurant":                "/projects/nss-restaurant.png",
};

export default async function Projects() {
  const { data: projects, error } = await getSupabase()
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching projects:", error);

  return (
    <main className="flex-1 flex flex-col pb-20 md:pb-0">
      <PageTransition>
        <SheetHeader fig="FIG.05 — SELECTED WORK" sheet="05/06" />
        <div className="p-6 md:p-10">
          <h1 className="sr-only">Selected Work — Ebenezer Zotoo</h1>
          <DimensionLine className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects?.map((project, index) => (
              <DrawingCard
                key={project.id}
                index={index}
                slug={project.slug}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack ?? []}
                imageUrl={project.image_url ?? projectImageMap[project.slug] ?? "/project1.png"}
              />
            ))}
          </div>
        </div>
      </PageTransition>
    </main>
  );
}
