'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Match, MatchStatus } from './AdminPanelInteractive';

interface MatchTableRowProps {
  match: Match;
  isSelected: boolean;
  isEven: boolean;
  onToggleSelect: () => void;
  onUpdate: (updates: Partial<Match>) => void;
  onDelete: () => void;
}

const STATUS_CONFIG: Record<MatchStatus, { label: string; color: string }> = {
  live: { label: 'EN VIVO', color: 'text-primary border-primary' },
  upcoming: { label: 'PRÓXIMO', color: 'text-warning border-warning' },
  finished: { label: 'FINALIZADO', color: 'text-muted-foreground border-border' },
};

export default function MatchTableRow({ match, isSelected, isEven, onToggleSelect, onUpdate, onDelete }: MatchTableRowProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    homeScore: match.homeScore?.toString() ?? '',
    awayScore: match.awayScore?.toString() ?? '',
    minute: match.minute?.toString() ?? '',
    status: match.status,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    onUpdate({
      homeScore: editData.homeScore !== '' ? parseInt(editData.homeScore) : null,
      awayScore: editData.awayScore !== '' ? parseInt(editData.awayScore) : null,
      minute: editData.minute !== '' ? parseInt(editData.minute) : null,
      status: editData.status,
    });
    setEditing(false);
  };

  const cfg = STATUS_CONFIG[match.status];

  return (
    <>
      {/* Desktop Row */}
      <div className={`hidden lg:grid grid-cols-[32px_1fr_1fr_120px_80px_100px_80px_80px_100px] gap-3 px-4 py-3 border-b border-border items-center transition-colors
        ${isSelected ? 'bg-surface2' : isEven ? 'bg-surface' : 'bg-background'}
        hover:bg-surface2`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 accent-primary"
        />
        <span className="font-body text-sm text-foreground truncate">{match.homeTeam}</span>
        <span className="font-body text-sm text-foreground truncate">{match.awayTeam}</span>
        <span className="font-mono text-xs text-muted-foreground truncate">{match.league}</span>

        {/* Status */}
        <span className={`font-mono text-xs border rounded-sm px-1.5 py-0.5 w-fit ${cfg.color}`}>
          {cfg.label}
        </span>

        {/* Score */}
        {editing ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={0}
              value={editData.homeScore}
              onChange={(e) => setEditData((p) => ({ ...p, homeScore: e.target.value }))}
              className="w-8 bg-surface border border-border rounded-sm px-1 py-0.5 font-mono text-xs text-foreground text-center focus:outline-none focus:border-primary"
            />
            <span className="text-muted-foreground font-mono text-xs">-</span>
            <input
              type="number"
              min={0}
              value={editData.awayScore}
              onChange={(e) => setEditData((p) => ({ ...p, awayScore: e.target.value }))}
              className="w-8 bg-surface border border-border rounded-sm px-1 py-0.5 font-mono text-xs text-foreground text-center focus:outline-none focus:border-primary"
            />
          </div>
        ) : (
          <span className="font-mono text-sm text-primary">
            {match.homeScore !== null && match.awayScore !== null
              ? `${match.homeScore} - ${match.awayScore}`
              : '— - —'}
          </span>
        )}

        {/* Minute */}
        {editing ? (
          <input
            type="number"
            min={0}
            max={120}
            value={editData.minute}
            onChange={(e) => setEditData((p) => ({ ...p, minute: e.target.value }))}
            className="w-12 bg-surface border border-border rounded-sm px-1 py-0.5 font-mono text-xs text-foreground text-center focus:outline-none focus:border-primary"
          />
        ) : (
          <span className="font-mono text-xs text-muted-foreground">
            {match.minute !== null ? `${match.minute}'` : '—'}
          </span>
        )}

        {/* Featured */}
        <button
          onClick={() => onUpdate({ featured: !match.featured })}
          className={`w-6 h-6 flex items-center justify-center rounded-sm border transition-all
            ${match.featured ? 'border-warning text-warning' : 'border-border text-muted-foreground hover:border-warning hover:text-warning'}`}
          title={match.featured ? 'Quitar destacado' : 'Marcar como destacado'}
        >
          <Icon name="StarIcon" size={12} variant={match.featured ? 'solid' : 'outline'} />
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="w-7 h-7 flex items-center justify-center border border-primary text-primary rounded-sm hover:bg-primary hover:text-background transition-all"
                title="Guardar"
              >
                <Icon name="CheckIcon" size={12} variant="outline" />
              </button>
              <button
                onClick={() => setEditing(false)}
                className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground rounded-sm hover:border-primary hover:text-foreground transition-all"
                title="Cancelar"
              >
                <Icon name="XMarkIcon" size={12} variant="outline" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground rounded-sm hover:border-primary hover:text-primary transition-all"
                title="Editar"
              >
                <Icon name="PencilIcon" size={12} variant="outline" />
              </button>
              {confirmDelete ? (
                <>
                  <button
                    onClick={onDelete}
                    className="w-7 h-7 flex items-center justify-center border border-destructive text-destructive rounded-sm hover:bg-destructive hover:text-white transition-all"
                    title="Confirmar eliminación"
                  >
                    <Icon name="CheckIcon" size={12} variant="outline" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground rounded-sm transition-all"
                    title="Cancelar"
                  >
                    <Icon name="XMarkIcon" size={12} variant="outline" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground rounded-sm hover:border-destructive hover:text-destructive transition-all"
                  title="Eliminar"
                >
                  <Icon name="TrashIcon" size={12} variant="outline" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Card */}
      <div className={`lg:hidden border-b border-border p-4 space-y-3 transition-colors
        ${isSelected ? 'bg-surface2' : isEven ? 'bg-surface' : 'bg-background'}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={isSelected} onChange={onToggleSelect} className="w-4 h-4 accent-primary mt-0.5" />
            <div>
              <p className="font-body text-sm text-foreground font-medium">{match.homeTeam} vs {match.awayTeam}</p>
              <p className="font-mono text-xs text-muted-foreground">{match.league} · {match.scheduledTime}</p>
            </div>
          </div>
          <span className={`font-mono text-xs border rounded-sm px-1.5 py-0.5 shrink-0 ${cfg.color}`}>{cfg.label}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base text-primary">
              {match.homeScore !== null && match.awayScore !== null ? `${match.homeScore} - ${match.awayScore}` : '— - —'}
            </span>
            {match.minute !== null && (
              <span className="font-mono text-xs text-muted-foreground">{match.minute}&apos;</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate({ featured: !match.featured })}
              className={`w-8 h-8 flex items-center justify-center rounded-sm border transition-all
                ${match.featured ? 'border-warning text-warning' : 'border-border text-muted-foreground'}`}
            >
              <Icon name="StarIcon" size={14} variant={match.featured ? 'solid' : 'outline'} />
            </button>
            <button
              onClick={() => setEditing((p) => !p)}
              className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground rounded-sm hover:border-primary hover:text-primary transition-all"
            >
              <Icon name="PencilIcon" size={14} variant="outline" />
            </button>
            <button
              onClick={onDelete}
              className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground rounded-sm hover:border-destructive hover:text-destructive transition-all"
            >
              <Icon name="TrashIcon" size={14} variant="outline" />
            </button>
          </div>
        </div>

        {editing && (
          <div className="border border-primary rounded-sm p-3 space-y-3 bg-surface2">
            <p className="font-mono text-xs text-primary">EDITAR MARCADOR</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted-foreground">GOL LOCAL</label>
                <input
                  type="number"
                  min={0}
                  value={editData.homeScore}
                  onChange={(e) => setEditData((p) => ({ ...p, homeScore: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-sm px-2 py-1.5 font-mono text-sm text-foreground text-center focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted-foreground">GOL VISIT.</label>
                <input
                  type="number"
                  min={0}
                  value={editData.awayScore}
                  onChange={(e) => setEditData((p) => ({ ...p, awayScore: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-sm px-2 py-1.5 font-mono text-sm text-foreground text-center focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted-foreground">MINUTO</label>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={editData.minute}
                  onChange={(e) => setEditData((p) => ({ ...p, minute: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-sm px-2 py-1.5 font-mono text-sm text-foreground text-center focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-primary text-background font-mono text-xs rounded-sm hover:bg-secondary transition-all"
              >
                GUARDAR
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-2 border border-border text-muted-foreground font-mono text-xs rounded-sm hover:border-primary transition-all"
              >
                CANCELAR
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}