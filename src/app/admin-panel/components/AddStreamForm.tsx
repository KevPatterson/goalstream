'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Match, Stream, StreamQuality } from './AdminPanelInteractive';

interface AddStreamFormProps {
  matches: Match[];
  onSubmit: (data: Omit<Stream, 'id'>) => void;
  onCancel: () => void;
}

const QUALITIES: StreamQuality[] = ['HD', 'SD', 'FHD', '4K'];
const LANGUAGES = [
  { name: 'Español', flag: '🇪🇸' },
  { name: 'Inglés', flag: '🇬🇧' },
  { name: 'Francés', flag: '🇫🇷' },
  { name: 'Portugués', flag: '🇵🇹' },
  { name: 'Alemán', flag: '🇩🇪' },
  { name: 'Italiano', flag: '🇮🇹' },
];

export default function AddStreamForm({ matches, onSubmit, onCancel }: AddStreamFormProps) {
  const [form, setForm] = useState({
    matchId: matches[0]?.id ?? '',
    url: '',
    quality: 'HD' as StreamQuality,
    language: 'Español',
    languageFlag: '🇪🇸',
    isWorking: true,
    label: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.matchId) e.matchId = 'Selecciona un partido';
    if (!form.url.trim()) e.url = 'URL del stream requerida';
    else if (!form.url.startsWith('http')) e.url = 'URL debe comenzar con http';
    if (!form.label.trim()) e.label = 'Etiqueta requerida';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({ ...form, url: form.url.trim(), label: form.label.trim() });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = LANGUAGES.find((l) => l.name === e.target.value);
    setForm((p) => ({ ...p, language: e.target.value, languageFlag: lang?.flag ?? '🌐' }));
  };

  return (
    <form onSubmit={handleSubmit} className="border border-primary rounded-sm bg-surface p-5 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1 h-5 bg-primary rounded-sm" />
        <h2 className="font-mono text-sm text-primary tracking-wider">NUEVO STREAM</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Match */}
        <div className="space-y-1 sm:col-span-2">
          <label className="font-mono text-xs text-muted-foreground">PARTIDO *</label>
          <select
            value={form.matchId}
            onChange={(e) => { setForm((p) => ({ ...p, matchId: e.target.value })); setErrors((p) => { const n = {...p}; delete n.matchId; return n; }); }}
            className={`w-full bg-surface2 border rounded-sm px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors
              ${errors.matchId ? 'border-destructive' : 'border-border'}`}
          >
            {matches.length === 0 && <option value="">Sin partidos disponibles</option>}
            {matches.map((m) => (
              <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam} — {m.league}</option>
            ))}
          </select>
          {errors.matchId && <p className="font-mono text-xs text-destructive">{errors.matchId}</p>}
        </div>

        {/* URL */}
        <div className="space-y-1 sm:col-span-2">
          <label className="font-mono text-xs text-muted-foreground">URL HLS / STREAM *</label>
          <input
            type="text"
            value={form.url}
            onChange={(e) => { setForm((p) => ({ ...p, url: e.target.value })); setErrors((p) => { const n = {...p}; delete n.url; return n; }); }}
            placeholder="https://example.com/stream.m3u8"
            className={`w-full bg-surface2 border rounded-sm px-3 py-2 font-mono text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors
              ${errors.url ? 'border-destructive' : 'border-border'}`}
          />
          {errors.url && <p className="font-mono text-xs text-destructive">{errors.url}</p>}
        </div>

        {/* Label */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">ETIQUETA *</label>
          <input
            type="text"
            value={form.label}
            onChange={(e) => { setForm((p) => ({ ...p, label: e.target.value })); setErrors((p) => { const n = {...p}; delete n.label; return n; }); }}
            placeholder="Ej: Canal Principal ES"
            className={`w-full bg-surface2 border rounded-sm px-3 py-2 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors
              ${errors.label ? 'border-destructive' : 'border-border'}`}
          />
          {errors.label && <p className="font-mono text-xs text-destructive">{errors.label}</p>}
        </div>

        {/* Quality */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">CALIDAD</label>
          <div className="flex gap-2">
            {QUALITIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setForm((p) => ({ ...p, quality: q }))}
                className={`flex-1 py-2 font-mono text-xs border rounded-sm transition-all
                  ${form.quality === q ? 'border-primary text-primary bg-surface2' : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">IDIOMA</label>
          <select
            value={form.language}
            onChange={handleLanguageChange}
            className="w-full bg-surface2 border border-border rounded-sm px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            {LANGUAGES.map((l) => (
              <option key={l.name} value={l.name}>{l.flag} {l.name}</option>
            ))}
          </select>
        </div>

        {/* Working Status */}
        <div className="space-y-1 flex flex-col justify-end">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => setForm((p) => ({ ...p, isWorking: !p.isWorking }))}
              className={`relative w-10 h-5 rounded-sm border transition-all duration-200 cursor-pointer
                ${form.isWorking ? 'bg-primary border-primary' : 'bg-surface2 border-border'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-sm bg-background transition-all duration-200
                ${form.isWorking ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">
              {form.isWorking ? 'STREAM ACTIVO' : 'STREAM INACTIVO'}
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background font-mono text-sm rounded-sm hover:bg-secondary transition-all duration-200"
        >
          <Icon name="PlusCircleIcon" size={14} variant="solid" />
          CREAR STREAM
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-border text-muted-foreground font-mono text-sm rounded-sm hover:border-primary hover:text-foreground transition-all duration-200"
        >
          CANCELAR
        </button>
      </div>
    </form>
  );
}