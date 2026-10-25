"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      // Starts slightly invisible and pushed down
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      // Animates to fully visible and its natural position
      animate={{ opacity: 1, y: 0 }}
      // The speed and smoothness of the curve
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col w-full h-full"
    >
      {children}
    </motion.div>
  );
}