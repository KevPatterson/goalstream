'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ManualStreamInputProps {
  onLoad: (url: string) => void;
}

export default function ManualStreamInput({ onLoad }: ManualStreamInputProps) {
  const [url, setUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onLoad(url.trim());
    }
  };

  return (
    <div className="mt-3 border border-border rounded-sm bg-surface overflow-hidden">
      <button
        onClick={() => setIsExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface2 transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <Icon name="LinkIcon" size={14} className="text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">Cargar URL Manual</span>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size={14}
          className="text-muted-foreground"
        />
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 border-t border-border">
          <div className="flex gap-2 mt-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com/stream.m3u8"
              className="flex-1 bg-input border border-border rounded-sm px-3 py-2 font-mono text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200 min-h-[44px]"
              aria-label="URL del stream HLS"
            />
            <button
              type="submit"
              disabled={!url.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-sm hover:bg-secondary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
            >
              <Icon name="PlayIcon" size={12} variant="solid" />
              CARGAR
            </button>
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">
            Soporta HLS (.m3u8), MP4 y streams directos
          </p>
        </form>
      )}
    </div>
  );
}