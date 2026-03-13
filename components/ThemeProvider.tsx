"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "os" | "clean";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "os", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("os");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored === "clean" || stored === "os") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "os" ? "clean" : "os";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
