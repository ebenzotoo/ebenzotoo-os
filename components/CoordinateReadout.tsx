"use client";

import { useEffect, useState } from "react";

export default function CoordinateReadout() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-4 right-4 z-[9998] hidden md:block pointer-events-none px-2 py-1 rounded bg-bp-bg/80 border border-bp-border font-mono text-[10px] text-bp-text-muted"
    >
      X:{pos.x} Y:{pos.y} ⌖
    </div>
  );
}
