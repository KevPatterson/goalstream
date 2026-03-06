'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import VideoPlayer from './VideoPlayer';
import StreamSelector from './StreamSelector';
import MatchDetails from './MatchDetails';
import MatchSidebar from './MatchSidebar';
import ManualStreamInput from './ManualStreamInput';
import { mockMatch, mockStreams, mockSidebarMatches } from '../data/mockData';

export default function WatchPageInteractive() {
  const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);
  const [manualUrl, setManualUrl] = useState('');
  const [activeStreamUrl, setActiveStreamUrl] = useState(mockStreams[0].url);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleStreamSelect = (index: number) => {
    setSelectedStreamIndex(index);
    setActiveStreamUrl(mockStreams[index].url);
    setManualUrl('');
  };

  const handleManualLoad = (url: string) => {
    setManualUrl(url);
    setActiveStreamUrl(url);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div style={{ height: '64px' }} />
        <div className="skeleton-shimmer h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Stream Selector */}
            <StreamSelector
              streams={mockStreams}
              selectedIndex={selectedStreamIndex}
              onSelect={handleStreamSelect}
            />

            {/* Video Player */}
            <VideoPlayer streamUrl={activeStreamUrl} matchTitle={`${mockMatch.homeTeam} vs ${mockMatch.awayTeam}`} />

            {/* Manual URL Input */}
            <ManualStreamInput onLoad={handleManualLoad} />

            {/* Match Details */}
            <MatchDetails match={mockMatch} />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <MatchSidebar matches={mockSidebarMatches} currentMatchId={mockMatch.id} />
          </aside>
        </div>
      </main>
    </div>
  );
}