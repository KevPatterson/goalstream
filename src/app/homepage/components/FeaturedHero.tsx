'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Match } from './mockData';

interface FeaturedHeroProps {
  match: Match;
}

export default function FeaturedHero({ match }: FeaturedHeroProps) {
  const workingStreams = match.streams.filter((s) => s.working);

  return (
    <div
      className="mt-6 border rounded-sm overflow-hidden"
      style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface2)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-live-pulse"
            style={{ backgroundColor: 'var(--color-primary)' }}
            aria-hidden="true"
          />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>
            Partido Destacado
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          {match.league}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Thumbnail / Video area */}
        <div className="lg:col-span-3 relative" style={{ minHeight: '280px' }}>
          <div className="w-full h-full overflow-hidden" style={{ minHeight: '280px' }}>
            <AppImage
              src={match.thumbnail}
              alt={match.thumbnailAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Overlay */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-6"
            style={{ background: 'linear-gradient(to top, rgba(8,12,10,0.95) 0%, rgba(8,12,10,0.4) 60%, transparent 100%)' }}
          >
            {/* Score display */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
                  <AppImage src={match.homeLogo} alt={match.homeLogoAlt} width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <span className="font-heading text-2xl" style={{ color: 'var(--color-foreground)' }}>
                  {match.homeTeam}
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 border rounded-sm" style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-surface2)' }}>
                {match.homeScore !== null && match.awayScore !== null ? (
                  <span
                    className="font-mono text-3xl font-bold tracking-widest"
                    style={{ color: 'var(--color-primary)', textShadow: '0 0 12px var(--color-primary)' }}
                  >
                    {match.homeScore} - {match.awayScore}
                  </span>
                ) : (
                  <span className="font-mono text-lg" style={{ color: 'var(--color-muted-foreground)' }}>
                    vs
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-heading text-2xl" style={{ color: 'var(--color-foreground)' }}>
                  {match.awayTeam}
                </span>
                <div className="w-10 h-10 rounded-sm overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
                  <AppImage src={match.awayLogo} alt={match.awayLogoAlt} width={40} height={40} className="object-cover w-full h-full" />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              {match.status === 'live' && (
                <span
                  className="flex items-center gap-1.5 px-2 py-0.5 border rounded-sm font-mono text-xs tracking-widest uppercase"
                  style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'rgba(0,255,127,0.08)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-live-pulse" style={{ backgroundColor: 'var(--color-primary)' }} />
                  {match.minute}&apos; EN VIVO
                </span>
              )}
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                {workingStreams.length} stream{workingStreams.length !== 1 ? 's' : ''} disponible{workingStreams.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Play button overlay */}
          <Link
            href={`/watch-page?matchId=${match.id}`}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={`Ver ${match.homeTeam} vs ${match.awayTeam}`}
          >
            <div
              className="w-16 h-16 rounded-sm border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{
                borderColor: 'var(--color-primary)',
                backgroundColor: 'rgba(0,255,127,0.15)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Icon name="PlayIcon" size={32} variant="solid" className="text-primary" />
            </div>
          </Link>
        </div>

        {/* Match info panel */}
        <div className="lg:col-span-2 p-6 flex flex-col gap-4" style={{ borderLeft: '1px solid var(--color-border)' }}>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
              Liga
            </p>
            <p className="font-body text-base font-medium" style={{ color: 'var(--color-foreground)' }}>
              {match.league}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
              Hora
            </p>
            <p className="font-mono text-base" style={{ color: 'var(--color-foreground)' }}>
              {match.scheduledTime}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
              Streams Disponibles
            </p>
            <div className="flex flex-col gap-2">
              {match.streams.map((stream) => (
                <div
                  key={stream.id}
                  className="flex items-center justify-between px-3 py-2 border rounded-sm"
                  style={{
                    borderColor: stream.working ? 'var(--color-border)' : 'rgba(255,58,58,0.3)',
                    backgroundColor: 'var(--color-surface2)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{stream.flag}</span>
                    <span className="font-body text-sm" style={{ color: 'var(--color-foreground)' }}>
                      {stream.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs px-1.5 py-0.5 border rounded-sm"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-muted-foreground)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    >
                      {stream.quality}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: stream.working ? 'var(--color-success)' : 'var(--color-error)' }}
                      title={stream.working ? 'Activo' : 'Inactivo'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/watch-page?matchId=${match.id}`}
            className="mt-auto flex items-center justify-center gap-2 px-4 py-3 border rounded-sm font-mono text-sm tracking-widest uppercase transition-all duration-200 hover:opacity-90"
            style={{
              borderColor: 'var(--color-primary)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            <Icon name="PlayIcon" size={16} variant="solid" />
            Ver Partido
          </Link>
        </div>
      </div>
    </div>
  );
}