import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SheetShell from "../components/SheetShell";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400", "500"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Ebenezer Zotoo | Systems Architect",
  description: "Building digital systems that work — a drawing set by Ebenezer Zotoo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plexMono.variable} ${grotesk.variable} bg-bp-bg text-bp-text-main font-mono antialiased`}>
        <SheetShell>{children}</SheetShell>
      </body>
    </html>
  );
}
