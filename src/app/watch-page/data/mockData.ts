export interface Stream {
  id: string;
  language: string;
  flag: string;
  quality: string;
  url: string;
  isWorking: boolean;
  source: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeLogo: string;
  awayLogo: string;
  league: string;
  leagueLogo: string;
  status: 'live' | 'upcoming' | 'finished';
  minute?: number;
  stadium: string;
  date: string;
  time: string;
}

export interface SidebarMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeLogo: string;
  awayLogo: string;
  status: 'live' | 'upcoming' | 'finished';
  minute?: number;
  streamCount: number;
}

export const mockMatch: Match = {
  id: 'match-001',
  homeTeam: 'Real Madrid',
  awayTeam: 'FC Barcelona',
  homeScore: 2,
  awayScore: 1,
  homeLogo: "https://images.unsplash.com/photo-1698554195891-a49acf5a00e5",
  awayLogo: "https://images.unsplash.com/photo-1698554195891-a49acf5a00e5",
  league: 'La Liga',
  leagueLogo: "https://images.unsplash.com/photo-1698554195891-a49acf5a00e5",
  status: 'live',
  minute: 67,
  stadium: 'Santiago Bernabéu, Madrid',
  date: '06/03/2026',
  time: '21:00'
};

export const mockStreams: Stream[] = [
{
  id: 'stream-001',
  language: 'ESP',
  flag: '🇪🇸',
  quality: 'HD',
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  isWorking: true,
  source: 'Fuente 1'
},
{
  id: 'stream-002',
  language: 'ENG',
  flag: '🇬🇧',
  quality: 'FHD',
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  isWorking: true,
  source: 'Fuente 2'
},
{
  id: 'stream-003',
  language: 'POR',
  flag: '🇵🇹',
  quality: 'SD',
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  isWorking: false,
  source: 'Fuente 3'
},
{
  id: 'stream-004',
  language: 'ITA',
  flag: '🇮🇹',
  quality: 'HD',
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  isWorking: true,
  source: 'Fuente 4'
}];


export const mockSidebarMatches: SidebarMatch[] = [
{
  id: 'match-001',
  homeTeam: 'Real Madrid',
  awayTeam: 'FC Barcelona',
  homeScore: 2,
  awayScore: 1,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  status: 'live',
  minute: 67,
  streamCount: 4
},
{
  id: 'match-002',
  homeTeam: 'Atlético Madrid',
  awayTeam: 'Sevilla FC',
  homeScore: 0,
  awayScore: 0,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg',
  status: 'live',
  minute: 34,
  streamCount: 3
},
{
  id: 'match-003',
  homeTeam: 'Manchester City',
  awayTeam: 'Liverpool FC',
  homeScore: 0,
  awayScore: 0,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  status: 'upcoming',
  streamCount: 5
},
{
  id: 'match-004',
  homeTeam: 'PSG',
  awayTeam: 'Olympique Lyon',
  homeScore: 0,
  awayScore: 0,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Olympique_Lyonnais.svg',
  status: 'upcoming',
  streamCount: 2
},
{
  id: 'match-005',
  homeTeam: 'Bayern München',
  awayTeam: 'Borussia Dortmund',
  homeScore: 3,
  awayScore: 2,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
  status: 'finished',
  streamCount: 3
},
{
  id: 'match-006',
  homeTeam: 'Juventus',
  awayTeam: 'AC Milan',
  homeScore: 1,
  awayScore: 1,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
  status: 'finished',
  streamCount: 2
},
{
  id: 'match-007',
  homeTeam: 'Arsenal FC',
  awayTeam: 'Chelsea FC',
  homeScore: 0,
  awayScore: 0,
  homeLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  awayLogo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  status: 'upcoming',
  streamCount: 4
}];