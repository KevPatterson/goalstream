'use client';

import MatchCard from './MatchCard';
import { Match } from './mockData';

interface MatchGridProps {
  matches: Match[];
}

export default function MatchGrid({ matches }: MatchGridProps) {
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');
  const finishedMatches = matches.filter((m) => m.status === 'finished');

  if (matches.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 border rounded-sm"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <span className="font-mono text-4xl mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
          ⚽
        </span>
        <p className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--color-muted-foreground)' }}>
          No hay partidos disponibles
        </p>
      </div>
    );
  }

  const renderSection = (title: string, sectionMatches: Match[], accentColor: string) => {
    if (sectionMatches.length === 0) return null;
    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-1 h-5 rounded-sm"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />
          <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>
            {title}
          </h2>
          <span
            className="font-mono text-xs px-2 py-0.5 border rounded-sm"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)', backgroundColor: 'var(--color-surface2)' }}
          >
            {sectionMatches.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sectionMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    );
  };

  // If showing all, group by status; otherwise show flat
  const isGrouped = liveMatches.length + upcomingMatches.length + finishedMatches.length === matches.length &&
    (liveMatches.length > 0 || upcomingMatches.length > 0 || finishedMatches.length > 0);

  if (isGrouped && matches.length > 0 && (liveMatches.length > 0 || upcomingMatches.length > 0)) {
    return (
      <div>
        {renderSection('En Vivo', liveMatches, 'var(--color-primary)')}
        {renderSection('Próximos', upcomingMatches, 'var(--color-warning)')}
        {renderSection('Finalizados', finishedMatches, 'var(--color-muted-foreground)')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}