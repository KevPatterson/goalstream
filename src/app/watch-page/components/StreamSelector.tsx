'use client';

import { Stream } from '../data/mockData';

interface StreamSelectorProps {
  streams: Stream[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const qualityColors: Record<string, string> = {
  HD: 'text-primary border-primary',
  SD: 'text-warning border-warning',
  '4K': 'text-accent border-accent',
  FHD: 'text-primary border-primary',
};

export default function StreamSelector({ streams, selectedIndex, onSelect }: StreamSelectorProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Fuentes de Señal</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {streams.map((stream, index) => {
          const isSelected = index === selectedIndex;
          const qColor = qualityColors[stream.quality] || 'text-muted-foreground border-border';
          return (
            <button
              key={stream.id}
              onClick={() => onSelect(index)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-sm font-mono text-xs transition-all duration-200 min-h-[44px]
                ${isSelected
                  ? 'border-primary bg-surface2 text-primary' :'border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              aria-pressed={isSelected}
              aria-label={`Seleccionar fuente ${stream.language} ${stream.quality}`}
            >
              <span className="text-base leading-none">{stream.flag}</span>
              <span className="text-foreground">{stream.language}</span>
              <span className={`px-1 py-0.5 border rounded-sm text-[10px] font-bold ${isSelected ? 'border-primary text-primary' : qColor}`}>
                {stream.quality}
              </span>
              {stream.isWorking ? (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-error" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}