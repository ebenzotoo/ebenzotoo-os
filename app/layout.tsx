import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Load the fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Ebenezer Zotoo | OS",
  description: "Portfolio and OS Workspace of Ebenezer Zotoo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the fonts to the entire body */}
      <body className={`${inter.variable} ${jetbrains.variable} font-sans min-h-screen bg-os-bg text-os-text-main antialiased selection:bg-os-accent-blue/30 flex flex-col`}>
        {children}
      </body>
    </html>
  );
}