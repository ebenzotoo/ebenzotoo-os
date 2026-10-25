import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface DrawingCardProps {
  index: number;
  slug: string;
  title: string;
  description: string;
  techStack?: string[];
  imageUrl: string;
  status?: string;
}

export default function DrawingCard({ index, slug, title, description, techStack = [], imageUrl, status = "SHIPPED" }: DrawingCardProps) {
  const drg = `DRG-${String(index + 1).padStart(2, "0")}`;

  return (
    <Link href={`/projects/${slug}`} className="block group">
      <div className="sheet-card overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[9px] font-mono tracking-[0.1em] text-bp-primary">{drg}</span>
          <span className="text-[9px] font-mono tracking-[0.1em] text-bp-text-muted">{status}</span>
        </div>
        <div className="px-5 pb-3">
          <h3 className="text-[15px] font-semibold text-bp-text-main mb-1.5 group-hover:text-bp-primary transition-colors">
            {title}
          </h3>
          <p className="text-[13px] text-bp-text-muted line-clamp-2 leading-relaxed">{description}</p>
        </div>
        <div className="mx-4 mb-4 rounded-lg overflow-hidden h-40 border border-bp-border relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <span className="text-[11px] font-mono tracking-widest text-white/0 group-hover:text-white/80 transition-all duration-300 flex items-center gap-1">
              OPEN_DRAWING <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pb-4">
            {techStack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-bp-primary/10 border border-bp-primary/20 text-bp-primary-light text-[10px] font-mono">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
