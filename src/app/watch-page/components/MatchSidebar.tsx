'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { SidebarMatch } from '../data/mockData';

interface MatchSidebarProps {
  matches: SidebarMatch[];
  currentMatchId: string;
}

const statusConfig = {
  live: { label: 'EN VIVO', dot: 'bg-primary animate-live-pulse', text: 'text-primary' },
  upcoming: { label: 'PRÓXIMO', dot: 'bg-warning', text: 'text-warning' },
  finished: { label: 'FIN', dot: 'bg-muted-foreground', text: 'text-muted-foreground' },
};

export default function MatchSidebar({ matches, currentMatchId }: MatchSidebarProps) {
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');
  const finishedMatches = matches.filter((m) => m.status === 'finished');

  const renderMatch = (match: SidebarMatch) => {
    const isCurrent = match.id === currentMatchId;
    const status = statusConfig[match.status];

    return (
      <Link
        key={match.id}
        href={`/watch-page?id=${match.id}`}
        className={`flex items-center gap-3 px-3 py-3 border-l-2 transition-all duration-200 hover:bg-surface2 group
          ${isCurrent ? 'border-l-primary bg-surface2' : 'border-l-transparent hover:border-l-border'}`}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {/* Teams logos */}
        <div className="flex flex-col gap-1 shrink-0">
          <AppImage
            src={match.homeLogo}
            alt={`Escudo de ${match.homeTeam}`}
            width={20}
            height={20}
            className="object-contain"
          />
          <AppImage
            src={match.awayLogo}
            alt={`Escudo de ${match.awayTeam}`}
            width={20}
            height={20}
            className="object-contain"
          />
        </div>

        {/* Match info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="font-body text-xs text-foreground truncate">{match.homeTeam}</span>
            <span className="font-mono text-xs text-primary font-bold shrink-0">{match.homeScore}</span>
          </div>
          <div className="flex items-center justify-between gap-1">
            <span className="font-body text-xs text-foreground truncate">{match.awayTeam}</span>
            <span className="font-mono text-xs text-primary font-bold shrink-0">{match.awayScore}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
            <span className={`font-mono text-[10px] ${status.text}`}>{status.label}</span>
            {match.status === 'live' && match.minute && (
              <span className="font-mono text-[10px] text-muted-foreground">{match.minute}&apos;</span>
            )}
          </div>
        </div>

        {/* Stream count */}
        <div className="shrink-0 flex flex-col items-center">
          <span className="font-mono text-[10px] text-primary font-bold">{match.streamCount}</span>
          <span className="font-mono text-[10px] text-muted-foreground">SRC</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="border border-border rounded-sm bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Partidos</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{matches.length} total</span>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {/* Live */}
        {liveMatches.length > 0 && (
          <div>
            <div className="px-3 py-2 bg-surface2 border-b border-border">
              <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
                ● En Vivo ({liveMatches.length})
              </span>
            </div>
            {liveMatches.map(renderMatch)}
          </div>
        )}

        {/* Upcoming */}
        {upcomingMatches.length > 0 && (
          <div>
            <div className="px-3 py-2 bg-surface2 border-b border-border">
              <span className="font-mono text-[10px] text-warning tracking-widest uppercase">
                ◆ Próximos ({upcomingMatches.length})
              </span>
            </div>
            {upcomingMatches.map(renderMatch)}
          </div>
        )}

        {/* Finished */}
        {finishedMatches.length > 0 && (
          <div>
            <div className="px-3 py-2 bg-surface2 border-b border-border">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                ■ Finalizados ({finishedMatches.length})
              </span>
            </div>
            {finishedMatches.map(renderMatch)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-surface2">
        <Link
          href="/homepage"
          className="flex items-center justify-center gap-2 w-full py-2 border border-border rounded-sm font-mono text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 min-h-[44px]"
        >
          Ver todos los partidos
        </Link>
      </div>
    </div>
  );
}