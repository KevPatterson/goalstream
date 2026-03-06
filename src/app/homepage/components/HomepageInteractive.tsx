'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import LiveCounter from './LiveCounter';
import FeaturedHero from './FeaturedHero';
import MatchGrid from './MatchGrid';
import { mockMatches } from './mockData';

type StatusFilter = 'all' | 'live' | 'upcoming' | 'finished';

export default function HomepageInteractive() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');

  const liveCount = mockMatches.filter((m) => m.status === 'live').length;

  const filteredMatches =
    activeFilter === 'all'
      ? mockMatches
      : mockMatches.filter((m) => m.status === activeFilter);

  const featuredMatch = mockMatches.find((m) => m.featured && m.status === 'live') || mockMatches[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}>
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 pb-12">
        {/* Live Counter */}
        <LiveCounter liveCount={liveCount} />

        {/* Featured Hero */}
        <FeaturedHero match={featuredMatch} />

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-10 mb-6 flex-wrap">
          {(['all', 'live', 'upcoming', 'finished'] as StatusFilter[]).map((filter) => {
            const labels: Record<StatusFilter, string> = {
              all: 'Todos',
              live: 'En Vivo',
              upcoming: 'Próximos',
              finished: 'Finalizados',
            };
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-xs tracking-widest uppercase border transition-all duration-200 rounded-sm ${
                  isActive
                    ? 'border-primary text-primary bg-surface2' :'border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground bg-surface'
                }`}
                style={
                  isActive
                    ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-surface2)' }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)', backgroundColor: 'var(--color-surface)' }
                }
              >
                {filter === 'live' && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full mr-2 animate-live-pulse"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                )}
                {labels[filter]}
              </button>
            );
          })}
        </div>

        {/* Match Grid */}
        <MatchGrid matches={filteredMatches} />
      </main>
    </div>
  );
}