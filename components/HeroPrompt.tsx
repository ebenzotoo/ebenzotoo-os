"use client";

export default function HeroPrompt() {
  const triggerCommandPalette = () => {
    // We create a secure, custom browser event instead of a fake keystroke
    document.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <div 
      onClick={triggerCommandPalette}
      className="mt-4 flex items-center gap-3 px-6 py-3 bg-os-bg/80 border border-os-border rounded-lg text-sm font-mono text-os-text-muted hover:border-os-primary/50 hover:text-os-text-main transition-all cursor-pointer shadow-lg group"
    >
      <span className="text-os-primary font-bold">{'>'}</span>
      <span className="hidden sm:inline opacity-70 group-hover:opacity-100 transition-opacity">Press</span>
      <kbd className="hidden sm:inline px-2 py-0.5 bg-os-surface rounded text-os-primary border border-os-border shadow-sm">ENTER</kbd>
      <span className="sm:hidden opacity-70 group-hover:opacity-100 transition-opacity">Tap</span>
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">to explore</span>
      <span className="w-2 h-4 bg-os-primary animate-pulse ml-1" />
    </div>
  );
}