'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Stream, StreamQuality } from './AdminPanelInteractive';

interface StreamCardProps {
  stream: Stream;
  matchName: string;
  onUpdate: (updates: Partial<Stream>) => void;
  onDelete: () => void;
}

const QUALITY_COLORS: Record<StreamQuality, string> = {
  '4K': 'text-warning border-warning',
  'FHD': 'text-primary border-primary',
  'HD': 'text-secondary border-secondary',
  'SD': 'text-muted-foreground border-border',
};

export default function StreamCard({ stream, matchName, onUpdate, onDelete }: StreamCardProps) {
  const [editing, setEditing] = useState(false);
  const [editUrl, setEditUrl] = useState(stream.url);
  const [editLabel, setEditLabel] = useState(stream.label);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [urlError, setUrlError] = useState('');

  const handleSave = () => {
    if (!editUrl.trim() || !editUrl.startsWith('http')) {
      setUrlError('URL inválida. Debe comenzar con http');
      return;
    }
    if (!editLabel.trim()) return;
    onUpdate({ url: editUrl.trim(), label: editLabel.trim() });
    setEditing(false);
    setUrlError('');
  };

  const qColor = QUALITY_COLORS[stream.quality];

  return (
    <div className={`border rounded-sm bg-surface transition-all duration-200 hover:bg-surface2
      ${stream.isWorking ? 'border-border hover:border-primary' : 'border-destructive border-opacity-40'}`}>
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base shrink-0">{stream.languageFlag}</span>
          <div className="min-w-0">
            <p className="font-body text-sm text-foreground truncate">{stream.label}</p>
            <p className="font-mono text-xs text-muted-foreground truncate">{matchName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className={`font-mono text-xs border rounded-sm px-1.5 py-0.5 ${qColor}`}>
            {stream.quality}
          </span>
          <div className={`w-2 h-2 rounded-full ${stream.isWorking ? 'bg-primary animate-live-pulse' : 'bg-destructive'}`} />
        </div>
      </div>

      {/* URL Display */}
      <div className="px-4 py-3">
        {editing ? (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-mono text-xs text-muted-foreground">ETIQUETA</label>
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full bg-background border border-border rounded-sm px-2 py-1.5 font-body text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-xs text-muted-foreground">URL</label>
              <input
                type="text"
                value={editUrl}
                onChange={(e) => { setEditUrl(e.target.value); setUrlError(''); }}
                className={`w-full bg-background border rounded-sm px-2 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:border-primary transition-colors
                  ${urlError ? 'border-destructive' : 'border-border'}`}
              />
              {urlError && <p className="font-mono text-xs text-destructive">{urlError}</p>}
            </div>
          </div>
        ) : (
          <p className="font-mono text-xs text-muted-foreground truncate" title={stream.url}>
            {stream.url}
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{stream.language}</span>
          <button
            onClick={() => onUpdate({ isWorking: !stream.isWorking })}
            className={`flex items-center gap-1.5 px-2 py-1 font-mono text-xs border rounded-sm transition-all
              ${stream.isWorking
                ? 'border-primary text-primary hover:bg-destructive hover:border-destructive hover:text-white' :'border-destructive text-destructive hover:bg-primary hover:border-primary hover:text-background'
              }`}
          >
            <Icon name={stream.isWorking ? 'CheckCircleIcon' : 'XCircleIcon'} size={10} variant="solid" />
            {stream.isWorking ? 'ACTIVO' : 'INACTIVO'}
          </button>
        </div>

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
                onClick={() => { setEditing(false); setEditUrl(stream.url); setEditLabel(stream.label); setUrlError(''); }}
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
                    title="Confirmar"
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
    </div>
  );
}