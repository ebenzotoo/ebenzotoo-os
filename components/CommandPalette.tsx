"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, User, FileText, Phone, Server, FlaskConical, Command } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // The searchable directory of your OS
  const routes = [
    { name: "Projects (Home)", path: "/", icon: <Folder className="w-4 h-4" />, type: "SYSTEM" },
    { name: "About User", path: "/about", icon: <User className="w-4 h-4" />, type: "USER" },
    { name: "System Notes", path: "/notes", icon: <FileText className="w-4 h-4" />, type: "LOGS" },
    { name: "Architecture Nodes", path: "/systems", icon: <Server className="w-4 h-4" />, type: "NETWORK" },
    { name: "Lab Environment", path: "/lab", icon: <FlaskConical className="w-4 h-4" />, type: "TESTING" },
    { name: "Secure Comms", path: "/contact", icon: <Phone className="w-4 h-4" />, type: "COMMS" },
  ];

  // Listen for CMD+K or CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter routes based on search
  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Command Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-os-bg border border-os-border rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-os-border bg-os-surface/50">
              <Search className="w-5 h-5 text-os-text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Search systems or execute command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-os-text-muted/50 focus:outline-none font-sans text-lg"
              />
              <div className="flex items-center gap-1 text-[10px] font-mono text-os-text-muted bg-white/5 px-2 py-1 rounded">
                ESC TO CANCEL
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredRoutes.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-os-text-muted">
                    AVAILABLE_DIRECTORIES
                  </div>
                  {filteredRoutes.map((route) => (
                    <button
                      key={route.path}
                      onClick={() => handleSelect(route.path)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left text-os-text-main rounded-lg hover:bg-os-secondary/20 hover:text-os-secondary transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-os-text-muted group-hover:text-os-secondary transition-colors">
                          {route.icon}
                        </div>
                        <span className="font-sans font-medium tracking-wide">
                          {route.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-os-text-muted px-2 py-1 bg-os-surface rounded border border-os-border group-hover:border-os-secondary/30 group-hover:text-os-secondary transition-colors">
                        {route.type}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-os-text-muted font-mono text-sm flex flex-col items-center gap-3">
                  <Command className="w-8 h-8 opacity-20" />
                  NO_MATCHING_DIRECTORIES_FOUND
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}