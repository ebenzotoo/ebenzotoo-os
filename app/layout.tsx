import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import CommandPalette from "../components/CommandPalette";
import DesktopHint from "../components/DesktopHint";
import ThemeProvider from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import OSShell from "../components/OSShell";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300","400","500","600","700","800"] });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Ebenezer Zotoo | Designer & Developer",
  description: "Digital Product Designer & Systems Builder",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('portfolio-theme');
              if (t === 'clean' || t === 'os') document.documentElement.setAttribute('data-theme', t);
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body className={`${outfit.variable} ${firaCode.variable} bg-os-bg text-os-text-main font-sans antialiased`}>
        <ThemeProvider>
          <CommandPalette />
          <DesktopHint />
          <OSShell>
            {children}
          </OSShell>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
