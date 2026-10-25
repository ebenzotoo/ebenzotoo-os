interface SheetHeaderProps {
  fig: string;    // e.g. "FIG.03 — SYSTEMS"
  sheet: string;  // e.g. "03/06"
}

export default function SheetHeader({ fig, sheet }: SheetHeaderProps) {
  return (
    // top-0 on mobile (SheetNav is hidden there), top-16 on desktop so it docks
    // below SheetNav's 64px bar instead of overlapping it once both are stuck.
    <div className="sticky top-0 md:top-16 z-20 bg-bp-bg/90 backdrop-blur-md border-b border-bp-border px-6 md:px-10 py-3 flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-bp-primary">{fig}</span>
      <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.1em] text-bp-text-muted">
        <span>DRAWN: E.ZOTOO</span>
        <span>REV: 04</span>
        <span>SCALE 1:1</span>
        <span className="text-bp-primary">SHEET {sheet}</span>
      </div>
    </div>
  );
}
