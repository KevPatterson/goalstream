'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Match, MatchStatus } from './AdminPanelInteractive';

interface AddMatchFormProps {
  onSubmit: (data: Omit<Match, 'id' | 'streamCount'>) => void;
  onCancel: () => void;
}

const LEAGUES = ['La Liga', 'Premier League', 'Bundesliga', 'Serie A', 'Ligue 1', 'Champions League', 'Europa League', 'Copa del Rey', 'FA Cup', 'Otro'];

export default function AddMatchForm({ onSubmit, onCancel }: AddMatchFormProps) {
  const [form, setForm] = useState({
    homeTeam: '',
    awayTeam: '',
    league: 'La Liga',
    status: 'upcoming' as MatchStatus,
    scheduledTime: '20:00',
    homeScore: '',
    awayScore: '',
    minute: '',
    featured: false,
    leagueLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=40&h=40&fit=crop',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.homeTeam.trim()) e.homeTeam = 'Nombre del equipo local requerido';
    if (!form.awayTeam.trim()) e.awayTeam = 'Nombre del equipo visitante requerido';
    if (!form.scheduledTime) e.scheduledTime = 'Hora requerida';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    onSubmit({
      homeTeam: form.homeTeam.trim(),
      awayTeam: form.awayTeam.trim(),
      league: form.league,
      status: form.status,
      scheduledTime: form.scheduledTime,
      homeScore: form.homeScore !== '' ? parseInt(form.homeScore) : null,
      awayScore: form.awayScore !== '' ? parseInt(form.awayScore) : null,
      minute: form.minute !== '' ? parseInt(form.minute) : null,
      featured: form.featured,
      leagueLogo: form.leagueLogo,
    });
  };

  const field = (key: string) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="border border-primary rounded-sm bg-surface p-5 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1 h-5 bg-primary rounded-sm" />
        <h2 className="font-mono text-sm text-primary tracking-wider">NUEVO PARTIDO</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Home Team */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">EQUIPO LOCAL *</label>
          <input
            type="text"
            value={form.homeTeam}
            {...field('homeTeam')}
            placeholder="Ej: Real Madrid"
            className={`w-full bg-surface2 border rounded-sm px-3 py-2 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors
              ${errors.homeTeam ? 'border-destructive' : 'border-border'}`}
          />
          {errors.homeTeam && <p className="font-mono text-xs text-destructive">{errors.homeTeam}</p>}
        </div>

        {/* Away Team */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">EQUIPO VISITANTE *</label>
          <input
            type="text"
            value={form.awayTeam}
            {...field('awayTeam')}
            placeholder="Ej: Barcelona"
            className={`w-full bg-surface2 border rounded-sm px-3 py-2 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors
              ${errors.awayTeam ? 'border-destructive' : 'border-border'}`}
          />
          {errors.awayTeam && <p className="font-mono text-xs text-destructive">{errors.awayTeam}</p>}
        </div>

        {/* League */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">LIGA</label>
          <select
            value={form.league}
            {...field('league')}
            className="w-full bg-surface2 border border-border rounded-sm px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            {LEAGUES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">ESTADO</label>
          <select
            value={form.status}
            {...field('status')}
            className="w-full bg-surface2 border border-border rounded-sm px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="upcoming">PRÓXIMO</option>
            <option value="live">EN VIVO</option>
            <option value="finished">FINALIZADO</option>
          </select>
        </div>

        {/* Scheduled Time */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">HORA PROGRAMADA *</label>
          <input
            type="time"
            value={form.scheduledTime}
            {...field('scheduledTime')}
            className={`w-full bg-surface2 border rounded-sm px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors
              ${errors.scheduledTime ? 'border-destructive' : 'border-border'}`}
          />
          {errors.scheduledTime && <p className="font-mono text-xs text-destructive">{errors.scheduledTime}</p>}
        </div>

        {/* Minute */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">MINUTO (si en vivo)</label>
          <input
            type="number"
            min={0}
            max={120}
            value={form.minute}
            {...field('minute')}
            placeholder="Ej: 67"
            className="w-full bg-surface2 border border-border rounded-sm px-3 py-2 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Home Score */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">GOL LOCAL</label>
          <input
            type="number"
            min={0}
            value={form.homeScore}
            {...field('homeScore')}
            placeholder="—"
            className="w-full bg-surface2 border border-border rounded-sm px-3 py-2 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Away Score */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-muted-foreground">GOL VISITANTE</label>
          <input
            type="number"
            min={0}
            value={form.awayScore}
            {...field('awayScore')}
            placeholder="—"
            className="w-full bg-surface2 border border-border rounded-sm px-3 py-2 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Featured */}
        <div className="space-y-1 flex flex-col justify-end">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
              className={`relative w-10 h-5 rounded-sm border transition-all duration-200 cursor-pointer
                ${form.featured ? 'bg-primary border-primary' : 'bg-surface2 border-border'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-sm bg-background transition-all duration-200
                ${form.featured ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">PARTIDO DESTACADO</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background font-mono text-sm rounded-sm hover:bg-secondary transition-all duration-200"
        >
          <Icon name="PlusCircleIcon" size={14} variant="solid" />
          CREAR PARTIDO
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