'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Match } from './mockData';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const workingStreams = match.streams.filter((s) => s.working);

  const statusConfig = {
    live: { label: 'EN VIVO', color: 'var(--color-primary)', bg: 'rgba(0,255,127,0.08)', border: 'var(--color-primary)' },
    upcoming: { label: 'PRÓXIMO', color: 'var(--color-warning)', bg: 'rgba(255,183,0,0.08)', border: 'var(--color-warning)' },
    finished: { label: 'FINALIZADO', color: 'var(--color-muted-foreground)', bg: 'transparent', border: 'var(--color-border)' },
  };

  const status = statusConfig[match.status];

  return (
    <Link
      href={`/watch-page?matchId=${match.id}`}
      className="block border rounded-sm overflow-hidden transition-all duration-200 group"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = match.status === 'live' ? 'var(--color-primary)' : 'var(--color-muted-foreground)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface)';
      }}
      aria-label={`Ver partido ${match.homeTeam} vs ${match.awayTeam}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '140px' }}>
        <AppImage
          src={match.thumbnail}
          alt={match.thumbnailAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(8,12,10,0.9) 0%, transparent 60%)' }}
        />
        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <span
            className="flex items-center gap-1 px-2 py-0.5 border rounded-sm font-mono text-xs tracking-widest"
            style={{ borderColor: status.border, color: status.color, backgroundColor: status.bg }}
          >
            {match.status === 'live' && (
              <span
                className="w-1.5 h-1.5 rounded-full animate-live-pulse"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            )}
            {status.label}
          </span>
        </div>
        {/* League badge */}
        <div className="absolute top-2 right-2">
          <span
            className="px-2 py-0.5 border rounded-sm font-mono text-xs"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)', backgroundColor: 'rgba(8,12,10,0.8)' }}
          >
            {match.league}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Home team */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-sm overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
              <AppImage src={match.homeLogo} alt={match.homeLogoAlt} width={28} height={28} className="object-cover w-full h-full" />
            </div>
            <span className="font-body text-sm font-medium truncate" style={{ color: 'var(--color-foreground)' }}>
              {match.homeTeam}
            </span>
          </div>

          {/* Score */}
          <div
            className="flex-shrink-0 px-3 py-1 border rounded-sm"
            style={{ borderColor: match.status === 'live' ? 'var(--color-primary)' : 'var(--color-border)', backgroundColor: 'var(--color-surface2)' }}
          >
            {match.homeScore !== null && match.awayScore !== null ? (
              <span
                className="font-mono text-base font-bold"
                style={{
                  color: match.status === 'live' ? 'var(--color-primary)' : 'var(--color-foreground)',
                  textShadow: match.status === 'live' ? '0 0 8px var(--color-primary)' : 'none',
                }}
              >
                {match.homeScore} - {match.awayScore}
              </span>
            ) : (
              <span className="font-mono text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                {match.scheduledTime}
              </span>
            )}
          </div>

          {/* Away team */}
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className="font-body text-sm font-medium truncate" style={{ color: 'var(--color-foreground)' }}>
              {match.awayTeam}
            </span>
            <div className="w-7 h-7 rounded-sm overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
              <AppImage src={match.awayLogo} alt={match.awayLogoAlt} width={28} height={28} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {match.status === 'live' && match.minute !== null ? (
            <span className="font-mono text-xs" style={{ color: 'var(--color-primary)' }}>
              {match.minute}&apos; jugados
            </span>
          ) : match.status === 'upcoming' ? (
            <span className="font-mono text-xs" style={{ color: 'var(--color-warning)' }}>
              Hoy {match.scheduledTime}
            </span>
          ) : (
            <span className="font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
              Partido finalizado
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: workingStreams.length > 0 ? 'var(--color-success)' : 'var(--color-error)' }}
            />
            <span className="font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
              {workingStreams.length} stream{workingStreams.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}