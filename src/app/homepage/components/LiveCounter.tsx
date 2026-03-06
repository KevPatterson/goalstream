'use client';

interface LiveCounterProps {
  liveCount: number;
}

export default function LiveCounter({ liveCount }: LiveCounterProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full animate-live-pulse"
          style={{ backgroundColor: 'var(--color-primary)' }}
          aria-hidden="true"
        />
        <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>
          Transmisiones en Vivo
        </span>
        <span
          className="font-mono text-xl font-bold px-3 py-0.5 border rounded-sm"
          style={{
            color: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
            backgroundColor: 'var(--color-surface2)',
            textShadow: '0 0 8px var(--color-primary)',
          }}
        >
          {liveCount}
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <span className="font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          06/03/2026
        </span>
        <span className="font-mono text-xs px-2 py-0.5 border rounded-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }}>
          FOOTBALL_TERMINAL
        </span>
      </div>
    </div>
  );
}