"use client";

import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Starts slightly invisible and pushed down
      initial={{ opacity: 0, y: 15 }}
      // Animates to fully visible and its natural position
      animate={{ opacity: 1, y: 0 }}
      // The speed and smoothness of the curve
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col w-full h-full"
    >
      {children}
    </motion.div>
  );
}