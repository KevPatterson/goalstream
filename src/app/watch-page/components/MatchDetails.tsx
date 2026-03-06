'use client';

import { Match } from '../data/mockData';
import AppImage from '@/components/ui/AppImage';

interface MatchDetailsProps {
  match: Match;
}

const statusConfig = {
  live: { label: 'EN VIVO', color: 'text-primary border-primary bg-primary bg-opacity-10' },
  upcoming: { label: 'PRÓXIMO', color: 'text-warning border-warning bg-warning bg-opacity-10' },
  finished: { label: 'FINALIZADO', color: 'text-muted-foreground border-border bg-surface2' },
};

export default function MatchDetails({ match }: MatchDetailsProps) {
  const status = statusConfig[match.status];

  return (
    <div className="mt-4 border border-border rounded-sm bg-surface p-4">
      {/* League + Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AppImage
            src={match.leagueLogo}
            alt={`Logo de la liga ${match.league}`}
            width={20}
            height={20}
            className="rounded-sm object-contain"
          />
          <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">{match.league}</span>
        </div>
        <div className="flex items-center gap-3">
          {match.status === 'live' && match.minute && (
            <span className="font-mono text-xs text-primary">{match.minute}&apos;</span>
          )}
          <span className={`px-2 py-1 border rounded-sm font-mono text-[10px] font-bold tracking-widest ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <AppImage
            src={match.homeLogo}
            alt={`Escudo del equipo ${match.homeTeam}`}
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-body text-sm font-medium text-foreground text-center leading-tight">{match.homeTeam}</span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-1 px-4">
          <div className="flex items-center gap-2">
            <span
              className="font-heading text-5xl text-primary"
              style={{ textShadow: '0 0 20px rgba(0,255,127,0.5)' }}
            >
              {match.homeScore}
            </span>
            <span className="font-mono text-2xl text-muted-foreground">:</span>
            <span
              className="font-heading text-5xl text-primary"
              style={{ textShadow: '0 0 20px rgba(0,255,127,0.5)' }}
            >
              {match.awayScore}
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">MARCADOR</span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <AppImage
            src={match.awayLogo}
            alt={`Escudo del equipo ${match.awayTeam}`}
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-body text-sm font-medium text-foreground text-center leading-tight">{match.awayTeam}</span>
        </div>
      </div>

      {/* Match Meta */}
      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Estadio:</span>
          <span className="font-mono text-[10px] text-foreground">{match.stadium}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Fecha:</span>
          <span className="font-mono text-[10px] text-foreground">{match.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Hora:</span>
          <span className="font-mono text-[10px] text-foreground">{match.time}</span>
        </div>
      </div>
    </div>
  );
}