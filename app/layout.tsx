import type { Metadata } from "next";
import { Syne, Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import CommandPalette from "../components/CommandPalette";
import DesktopHint from "../components/DesktopHint";
import ThemeProvider from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import OSShell from "../components/OSShell";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Ebenezer Zotoo | OS Workspace",
  description: "Systems Architect & Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className={`${syne.variable} ${spaceGrotesk.variable} ${firaCode.variable} bg-os-bg text-os-text-main font-sans antialiased`}>
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