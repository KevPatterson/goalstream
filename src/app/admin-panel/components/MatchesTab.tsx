'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Match, MatchStatus } from './AdminPanelInteractive';
import AddMatchForm from './AddMatchForm';
import MatchTableRow from './MatchTableRow';

interface MatchesTabProps {
  matches: Match[];
  onAddMatch: (match: Omit<Match, 'id' | 'streamCount'>) => void;
  onUpdateMatch: (id: string, updates: Partial<Match>) => void;
  onDeleteMatch: (id: string) => void;
}

const STATUS_LABELS: Record<MatchStatus, string> = {
  live: 'EN VIVO',
  upcoming: 'PRÓXIMO',
  finished: 'FINALIZADO',
};

export default function MatchesTab({ matches, onAddMatch, onUpdateMatch, onDeleteMatch }: MatchesTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = filterStatus === 'all' ? matches : matches.filter((m) => m.status === filterStatus);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((m) => m.id)));
    }
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => onDeleteMatch(id));
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(['all', 'live', 'upcoming', 'finished'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 font-mono text-xs border rounded-sm transition-all duration-150
                ${filterStatus === s
                  ? 'border-primary text-primary bg-surface2' :'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
            >
              {s === 'all' ? 'TODOS' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs border border-destructive text-destructive rounded-sm hover:bg-destructive hover:text-white transition-all"
            >
              <Icon name="TrashIcon" size={12} variant="outline" />
              ELIMINAR ({selectedIds.size})
            </button>
          )}
          <button
            onClick={() => setShowForm((p) => !p)}
            className="flex items-center gap-2 px-4 py-2 font-mono text-sm border border-primary text-primary rounded-sm hover:bg-primary hover:text-background transition-all duration-200"
          >
            <Icon name={showForm ? 'MinusIcon' : 'PlusIcon'} size={14} variant="outline" />
            {showForm ? 'CANCELAR' : 'AÑADIR PARTIDO'}
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <AddMatchForm
          onSubmit={(data) => {
            onAddMatch(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Table */}
      <div className="border border-border rounded-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[32px_1fr_1fr_120px_80px_100px_80px_80px_100px] gap-3 px-4 py-3 bg-surface2 border-b border-border">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-primary"
            />
          </div>
          {['LOCAL', 'VISITANTE', 'LIGA', 'ESTADO', 'MARCADOR', 'MIN', 'DEST', 'ACCIONES'].map((h) => (
            <span key={h} className="font-mono text-xs text-muted-foreground tracking-wider">{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Icon name="TrophyIcon" size={32} variant="outline" className="text-muted-foreground" />
            <span className="font-mono text-sm text-muted-foreground">NO HAY PARTIDOS</span>
          </div>
        ) : (
          filtered.map((match, idx) => (
            <MatchTableRow
              key={match.id}
              match={match}
              isSelected={selectedIds.has(match.id)}
              isEven={idx % 2 === 0}
              onToggleSelect={() => toggleSelect(match.id)}
              onUpdate={(updates) => onUpdateMatch(match.id, updates)}
              onDelete={() => onDeleteMatch(match.id)}
            />
          ))
        )}
      </div>

      <p className="font-mono text-xs text-muted-foreground">
        MOSTRANDO {filtered.length} DE {matches.length} PARTIDOS
      </p>
    </div>
  );
}