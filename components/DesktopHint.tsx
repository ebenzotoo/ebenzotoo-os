"use client";

import { useState } from "react";
import { Monitor, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function DesktopHint() {
  const [dismissed, setDismissed] = useState(false);
  const { theme } = useTheme();

  if (dismissed || theme === "clean") return null;

  return (
    <div className="md:hidden flex items-center justify-between gap-3 px-4 py-2.5 bg-os-bg border-b border-os-primary/20 text-xs font-mono z-50">
      <div className="flex items-center gap-2 text-os-text-muted">
        <Monitor className="w-3.5 h-3.5 text-os-primary shrink-0" />
        <span>Best experienced on desktop</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-os-text-muted hover:text-white transition-colors shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
