'use client';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-navy/5 rounded-lg max-w-[120px]">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.15s' }} />
        <span className="w-2 h-2 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
      </div>
      <span className="text-xs text-navy/50 font-medium">Analyzing…</span>
    </div>
  );
}
