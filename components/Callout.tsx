"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CalloutProps {
  label: string;
  detail: string;
  children: React.ReactNode;
}

export default function Callout({ label, detail, children }: CalloutProps) {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((s) => !s)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            className="absolute left-full top-0 ml-3 whitespace-nowrap text-[9px] font-mono text-bp-secondary leading-tight hidden md:block"
          >
            <span className="absolute -left-3 top-1.5 w-3 h-px bg-bp-secondary/60" />
            {label}
            <br />
            {detail}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
