import Link from 'next/link';

const NavigationLogo = () => {
  return (
    <Link
      href="/homepage"
      className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      aria-label="Inicio - Football Terminal"
    >
      {/* SVG Logo Mark */}
      <div className="relative flex items-center justify-center w-9 h-9 border border-primary rounded-sm bg-surface2 group-hover:shadow-glow transition-all duration-200">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Football hexagon pattern */}
          <circle cx="11" cy="11" r="9" stroke="#00ff7f" strokeWidth="1.5" fill="none" />
          <polygon
            points="11,4 14.5,7 14.5,14 11,17 7.5,14 7.5,7"
            stroke="#00ff7f"
            strokeWidth="1"
            fill="rgba(0,255,127,0.08)"
          />
          <circle cx="11" cy="11" r="2" fill="#00ff7f" />
          {/* Signal lines */}
          <line x1="2" y1="11" x2="5" y2="11" stroke="#00c45f" strokeWidth="1" />
          <line x1="17" y1="11" x2="20" y2="11" stroke="#00c45f" strokeWidth="1" />
        </svg>
        {/* Pulse dot */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-live-pulse border border-background"
          aria-hidden="true"
        />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-heading text-xl text-primary tracking-widest group-hover:text-secondary transition-colors duration-200">
          FOOTBALL
        </span>
        <span className="font-mono text-[9px] text-muted-foreground tracking-[0.2em] uppercase">
          TERMINAL_v1
        </span>
      </div>
    </Link>
  );
};

export default NavigationLogo;