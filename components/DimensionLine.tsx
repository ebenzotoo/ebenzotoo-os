"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function DimensionLine({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className="text-bp-primary text-[12px] font-mono">◂</span>
      <motion.div
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="flex-1 h-px bg-bp-primary/50"
      />
      <span className="text-bp-primary text-[12px] font-mono">▸</span>
    </div>
  );
}
