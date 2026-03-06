'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Match, Stream, StreamQuality } from './AdminPanelInteractive';
import AddStreamForm from './AddStreamForm';
import StreamCard from './StreamCard';

interface StreamsTabProps {
  streams: Stream[];
  matches: Match[];
  onAddStream: (stream: Omit<Stream, 'id'>) => void;
  onUpdateStream: (id: string, updates: Partial<Stream>) => void;
  onDeleteStream: (id: string) => void;
}

const QUALITY_ORDER: StreamQuality[] = ['4K', 'FHD', 'HD', 'SD'];

export default function StreamsTab({ streams, matches, onAddStream, onUpdateStream, onDeleteStream }: StreamsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [filterMatchId, setFilterMatchId] = useState<string>('all');
  const [filterQuality, setFilterQuality] = useState<StreamQuality | 'all'>('all');

  const filtered = streams.filter((s) => {
    const matchOk = filterMatchId === 'all' || s.matchId === filterMatchId;
    const qualityOk = filterQuality === 'all' || s.quality === filterQuality;
    return matchOk && qualityOk;
  });

  const getMatchName = (matchId: string) => {
    const m = matches.find((m) => m.id === matchId);
    return m ? `${m.homeTeam} vs ${m.awayTeam}` : 'Partido desconocido';
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Match filter */}
          <select
            value={filterMatchId}
            onChange={(e) => setFilterMatchId(e.target.value)}
            className="bg-surface2 border border-border rounded-sm px-3 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">TODOS LOS PARTIDOS</option>
            {matches.map((m) => (
              <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam}</option>
            ))}
          </select>

          {/* Quality filter */}
          <div className="flex items-center gap-1">
            {(['all', ...QUALITY_ORDER] as const).map((q) => (
              <button
                key={q}
                onClick={() => setFilterQuality(q)}
                className={`px-2.5 py-1.5 font-mono text-xs border rounded-sm transition-all duration-150
                  ${filterQuality === q
                    ? 'border-primary text-primary bg-surface2' :'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                  }`}
              >
                {q === 'all' ? 'TODAS' : q}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-2 px-4 py-2 font-mono text-sm border border-primary text-primary rounded-sm hover:bg-primary hover:text-background transition-all duration-200"
        >
          <Icon name={showForm ? 'MinusIcon' : 'PlusIcon'} size={14} variant="outline" />
          {showForm ? 'CANCELAR' : 'AÑADIR STREAM'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <AddStreamForm
          matches={matches}
          onSubmit={(data) => {
            onAddStream(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'TOTAL', value: streams.length, color: 'text-foreground' },
          { label: 'ACTIVOS', value: streams.filter((s) => s.isWorking).length, color: 'text-primary' },
          { label: 'INACTIVOS', value: streams.filter((s) => !s.isWorking).length, color: 'text-destructive' },
          { label: 'PARTIDOS', value: new Set(streams.map((s) => s.matchId)).size, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="border border-border rounded-sm bg-surface p-3 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
            <span className={`font-mono text-xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Stream Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 border border-border rounded-sm">
          <Icon name="SignalIcon" size={32} variant="outline" className="text-muted-foreground" />
          <span className="font-mono text-sm text-muted-foreground">NO HAY STREAMS</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((stream) => (
            <StreamCard
              key={stream.id}
              stream={stream}
              matchName={getMatchName(stream.matchId)}
              onUpdate={(updates) => onUpdateStream(stream.id, updates)}
              onDelete={() => onDeleteStream(stream.id)}
            />
          ))}
        </div>
      )}

      <p className="font-mono text-xs text-muted-foreground">
        MOSTRANDO {filtered.length} DE {streams.length} STREAMS
      </p>
    </div>
  );
}