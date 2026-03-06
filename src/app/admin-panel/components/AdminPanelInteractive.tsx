'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import MatchesTab from './MatchesTab';
import StreamsTab from './StreamsTab';
import Icon from '@/components/ui/AppIcon';

export type MatchStatus = 'live' | 'upcoming' | 'finished';
export type StreamQuality = 'HD' | 'SD' | 'FHD' | '4K';

export interface Stream {
  id: string;
  matchId: string;
  url: string;
  quality: StreamQuality;
  language: string;
  languageFlag: string;
  isWorking: boolean;
  label: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  league: string;
  leagueLogo: string;
  status: MatchStatus;
  minute: number | null;
  scheduledTime: string;
  featured: boolean;
  streamCount: number;
}

const initialMatches: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 2,
    awayScore: 1,
    league: 'La Liga',
    leagueLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=40&h=40&fit=crop',
    status: 'live',
    minute: 67,
    scheduledTime: '20:00',
    featured: true,
    streamCount: 3,
  },
  {
    id: 'm2',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeScore: null,
    awayScore: null,
    league: 'Premier League',
    leagueLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=40&h=40&fit=crop',
    status: 'upcoming',
    minute: null,
    scheduledTime: '22:00',
    featured: false,
    streamCount: 2,
  },
  {
    id: 'm3',
    homeTeam: 'Bayern München',
    awayTeam: 'Borussia Dortmund',
    homeScore: 3,
    awayScore: 2,
    league: 'Bundesliga',
    leagueLogo: 'https://pixabay.com/get/g9e8b8c5e8e8b8c5e8e8b8c5e8e8b8c5.jpg',
    status: 'finished',
    minute: null,
    scheduledTime: '18:30',
    featured: false,
    streamCount: 1,
  },
  {
    id: 'm4',
    homeTeam: 'PSG',
    awayTeam: 'Olympique Lyon',
    homeScore: 1,
    awayScore: 1,
    league: 'Ligue 1',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=40&h=40&fit=crop',
    status: 'live',
    minute: 45,
    scheduledTime: '21:00',
    featured: false,
    streamCount: 2,
  },
];

const initialStreams: Stream[] = [
  {
    id: 's1',
    matchId: 'm1',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: 'HD',
    language: 'Español',
    languageFlag: '🇪🇸',
    isWorking: true,
    label: 'Canal Principal ES',
  },
  {
    id: 's2',
    matchId: 'm1',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: 'SD',
    language: 'Inglés',
    languageFlag: '🇬🇧',
    isWorking: true,
    label: 'Canal Secundario EN',
  },
  {
    id: 's3',
    matchId: 'm2',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: 'FHD',
    language: 'Español',
    languageFlag: '🇪🇸',
    isWorking: false,
    label: 'Stream Principal',
  },
  {
    id: 's4',
    matchId: 'm4',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: 'HD',
    language: 'Francés',
    languageFlag: '🇫🇷',
    isWorking: true,
    label: 'Beinsports FR',
  },
];

type TabType = 'matches' | 'streams';

export default function AdminPanelInteractive() {
  const [activeTab, setActiveTab] = useState<TabType>('matches');
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [streams, setStreams] = useState<Stream[]>(initialStreams);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleAddMatch = (match: Omit<Match, 'id' | 'streamCount'>) => {
    const newMatch: Match = {
      ...match,
      id: `m${Date.now()}`,
      streamCount: 0,
    };
    setMatches((prev) => [newMatch, ...prev]);
    showNotification('success', `Partido "${match.homeTeam} vs ${match.awayTeam}" añadido correctamente.`);
  };

  const handleUpdateMatch = (id: string, updates: Partial<Match>) => {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    showNotification('success', 'Partido actualizado correctamente.');
  };

  const handleDeleteMatch = (id: string) => {
    const match = matches.find((m) => m.id === id);
    setMatches((prev) => prev.filter((m) => m.id !== id));
    setStreams((prev) => prev.filter((s) => s.matchId !== id));
    showNotification('success', `Partido "${match?.homeTeam} vs ${match?.awayTeam}" eliminado.`);
  };

  const handleAddStream = (stream: Omit<Stream, 'id'>) => {
    const newStream: Stream = { ...stream, id: `s${Date.now()}` };
    setStreams((prev) => [newStream, ...prev]);
    setMatches((prev) =>
      prev.map((m) => (m.id === stream.matchId ? { ...m, streamCount: m.streamCount + 1 } : m))
    );
    showNotification('success', `Stream "${stream.label}" añadido correctamente.`);
  };

  const handleUpdateStream = (id: string, updates: Partial<Stream>) => {
    setStreams((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    showNotification('success', 'Stream actualizado correctamente.');
  };

  const handleDeleteStream = (id: string) => {
    const stream = streams.find((s) => s.id === id);
    setStreams((prev) => prev.filter((s) => s.id !== id));
    if (stream) {
      setMatches((prev) =>
        prev.map((m) =>
          m.id === stream.matchId ? { ...m, streamCount: Math.max(0, m.streamCount - 1) } : m
        )
      );
    }
    showNotification('success', `Stream "${stream?.label}" eliminado.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-primary rounded-sm bg-surface2 flex items-center justify-center">
                <Icon name="Cog6ToothIcon" size={16} variant="solid" className="text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-2xl text-primary tracking-widest">PANEL DE ADMINISTRACIÓN</h1>
                <p className="font-mono text-xs text-muted-foreground">FOOTBALL_TERMINAL &gt; ADMIN &gt; GESTIÓN_CONTENIDO</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-surface2">
              <span className="w-2 h-2 rounded-full bg-warning animate-live-pulse" />
              <span className="font-mono text-xs text-warning tracking-widest">USO_PERSONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 border rounded-sm font-mono text-sm max-w-sm shadow-lg
          ${notification.type === 'success' ?'bg-surface2 border-primary text-primary' :'bg-surface2 border-destructive text-destructive'
          }`}>
          <Icon
            name={notification.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'}
            size={16}
            variant="solid"
          />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-1 border-b border-border mb-6">
          {(['matches', 'streams'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 font-mono text-sm tracking-wider border-b-2 transition-all duration-200
                ${activeTab === tab
                  ? 'border-primary text-primary bg-surface2' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-surface2'
                }`}
            >
              <Icon
                name={tab === 'matches' ? 'TrophyIcon' : 'SignalIcon'}
                size={14}
                variant={activeTab === tab ? 'solid' : 'outline'}
              />
              {tab === 'matches' ? 'PARTIDOS' : 'STREAMS'}
              <span className={`px-1.5 py-0.5 rounded-sm text-xs font-mono
                ${activeTab === tab ? 'bg-primary text-background' : 'bg-surface border border-border text-muted-foreground'}`}>
                {tab === 'matches' ? matches.length : streams.length}
              </span>
            </button>
          ))}
        </div>

        {activeTab === 'matches' && (
          <MatchesTab
            matches={matches}
            onAddMatch={handleAddMatch}
            onUpdateMatch={handleUpdateMatch}
            onDeleteMatch={handleDeleteMatch}
          />
        )}
        {activeTab === 'streams' && (
          <StreamsTab
            streams={streams}
            matches={matches}
            onAddStream={handleAddStream}
            onUpdateStream={handleUpdateStream}
            onDeleteStream={handleDeleteStream}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-12 border-t border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            FOOTBALL_TERMINAL &copy; {new Date().getFullYear()} — USO PERSONAL
          </span>
          <span className="font-mono text-xs text-muted-foreground">ADMIN_PANEL_v1.0</span>
        </div>
      </footer>
    </div>
  );
}