export interface Stream {
  id: string;
  language: string;
  flag: string;
  quality: string;
  url: string;
  working: boolean;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  homeLogoAlt: string;
  awayLogo: string;
  awayLogoAlt: string;
  homeScore: number | null;
  awayScore: number | null;
  league: string;
  leagueLogo: string;
  leagueLogoAlt: string;
  status: 'live' | 'upcoming' | 'finished';
  minute: number | null;
  scheduledTime: string;
  streams: Stream[];
  featured: boolean;
  thumbnail: string;
  thumbnailAlt: string;
}

export const mockMatches: Match[] = [
{
  id: 'match-001',
  homeTeam: 'Real Madrid',
  awayTeam: 'FC Barcelona',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f61df770-1772821240633.png",
  homeLogoAlt: 'Escudo del Real Madrid sobre fondo blanco con corona y letras doradas',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0bdbad5-1772821246963.png",
  awayLogoAlt: 'Escudo del FC Barcelona con colores azul y grana sobre fondo blanco',
  homeScore: 2,
  awayScore: 1,
  league: 'La Liga',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_106e18025-1772821240390.png",
  leagueLogoAlt: 'Logo de La Liga española con balón de fútbol en estadio verde',
  status: 'live',
  minute: 67,
  scheduledTime: '20:00',
  streams: [
  { id: 's1', language: 'Español', flag: '🇪🇸', quality: '1080p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true },
  { id: 's2', language: 'Inglés', flag: '🇬🇧', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true },
  { id: 's3', language: 'Español', flag: '🇦🇷', quality: '480p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: false }],

  featured: true,
  thumbnail: "https://images.unsplash.com/photo-1722414363288-e69365e69015",
  thumbnailAlt: 'Estadio Santiago Bernabéu iluminado de noche durante el clásico Real Madrid vs Barcelona con aficionados en las gradas'
},
{
  id: 'match-002',
  homeTeam: 'Atlético Madrid',
  awayTeam: 'Sevilla FC',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_122d5d8a3-1772821241433.png",
  homeLogoAlt: 'Escudo del Atlético de Madrid con rayas rojas y blancas sobre fondo azul',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8fe6cc1-1772821246360.png",
  awayLogoAlt: 'Escudo del Sevilla FC con color blanco y rojo sobre fondo verde',
  homeScore: 0,
  awayScore: 0,
  league: 'La Liga',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_106e18025-1772821240390.png",
  leagueLogoAlt: 'Logo de La Liga española con balón de fútbol en estadio verde',
  status: 'live',
  minute: 23,
  scheduledTime: '20:00',
  streams: [
  { id: 's4', language: 'Español', flag: '🇪🇸', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true }],

  featured: false,
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_17178ff49-1772821268119.png",
  thumbnailAlt: 'Estadio Metropolitano de Madrid con césped verde y aficionados del Atlético de Madrid en las gradas'
},
{
  id: 'match-003',
  homeTeam: 'Manchester City',
  awayTeam: 'Liverpool FC',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6b1628f-1772821240605.png",
  homeLogoAlt: 'Escudo del Manchester City en color azul celeste con águila dorada',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_19c2a65a3-1772104631922.png",
  awayLogoAlt: 'Escudo del Liverpool FC en color rojo con el pájaro Liver sobre fondo blanco',
  homeScore: null,
  awayScore: null,
  league: 'Premier League',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd32dd8e-1772821240780.png",
  leagueLogoAlt: 'Logo de la Premier League inglesa con balón de fútbol sobre fondo verde',
  status: 'upcoming',
  minute: null,
  scheduledTime: '21:45',
  streams: [
  { id: 's5', language: 'Inglés', flag: '🇬🇧', quality: '1080p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true },
  { id: 's6', language: 'Español', flag: '🇪🇸', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true }],

  featured: false,
  thumbnail: "https://images.unsplash.com/photo-1660102003851-54af8c12c3d9",
  thumbnailAlt: 'Estadio Etihad de Manchester iluminado de noche con aficionados del City en las gradas azules'
},
{
  id: 'match-004',
  homeTeam: 'Bayern München',
  awayTeam: 'Borussia Dortmund',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_14b5422d2-1772821239801.png",
  homeLogoAlt: 'Escudo del Bayern de Múnich en rojo y blanco con letras FCB',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_18261de72-1772821259653.png",
  awayLogoAlt: 'Escudo del Borussia Dortmund en amarillo y negro con el símbolo BVB',
  homeScore: null,
  awayScore: null,
  league: 'Bundesliga',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_158169fad-1766854438063.png",
  leagueLogoAlt: 'Logo de la Bundesliga alemana con balón de fútbol sobre fondo rojo',
  status: 'upcoming',
  minute: null,
  scheduledTime: '18:30',
  streams: [
  { id: 's7', language: 'Alemán', flag: '🇩🇪', quality: '1080p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true },
  { id: 's8', language: 'Español', flag: '🇪🇸', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true }],

  featured: false,
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1967fb472-1772788068848.png",
  thumbnailAlt: 'Allianz Arena de Múnich iluminada en rojo durante un partido del Bayern con aficionados en las gradas'
},
{
  id: 'match-005',
  homeTeam: 'PSG',
  awayTeam: 'Olympique Lyon',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4a6a76f-1772821247309.png",
  homeLogoAlt: 'Escudo del Paris Saint-Germain en azul marino con torre Eiffel dorada',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1212ff05a-1772821241805.png",
  awayLogoAlt: 'Escudo del Olympique de Lyon en rojo y azul con el símbolo del club',
  homeScore: 3,
  awayScore: 1,
  league: 'Ligue 1',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_187feebe0-1772821242229.png",
  leagueLogoAlt: 'Logo de la Ligue 1 francesa con balón de fútbol sobre fondo azul',
  status: 'finished',
  minute: 90,
  scheduledTime: '17:00',
  streams: [
  { id: 's9', language: 'Francés', flag: '🇫🇷', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: false }],

  featured: false,
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_13457aa6b-1765306556570.png",
  thumbnailAlt: 'Estadio Parc des Princes de París iluminado de noche durante un partido del PSG con aficionados en las gradas'
},
{
  id: 'match-006',
  homeTeam: 'Juventus',
  awayTeam: 'Inter de Milán',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1553e9b19-1772821248635.png",
  homeLogoAlt: 'Escudo de la Juventus en blanco y negro con el toro de Turín',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1a73a6bc0-1772821252642.png",
  awayLogoAlt: 'Escudo del Inter de Milán en azul y negro con la serpiente del Biscione',
  homeScore: 1,
  awayScore: 2,
  league: 'Serie A',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7bf3373-1772821241413.png",
  leagueLogoAlt: 'Logo de la Serie A italiana con balón de fútbol sobre fondo verde',
  status: 'finished',
  minute: 90,
  scheduledTime: '15:00',
  streams: [
  { id: 's10', language: 'Italiano', flag: '🇮🇹', quality: '1080p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: false },
  { id: 's11', language: 'Español', flag: '🇪🇸', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: false }],

  featured: false,
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1fba1fcdb-1772821265782.png",
  thumbnailAlt: 'Estadio Allianz de Turín iluminado de noche durante el Derby de Italia entre Juventus e Inter'
},
{
  id: 'match-007',
  homeTeam: 'Arsenal',
  awayTeam: 'Chelsea',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_18d4aa45a-1772821249876.png",
  homeLogoAlt: 'Escudo del Arsenal en rojo con el cañón dorado sobre fondo blanco',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_19845a763-1772821247761.png",
  awayLogoAlt: 'Escudo del Chelsea FC en azul con el león dorado sobre fondo blanco',
  homeScore: 1,
  awayScore: 1,
  league: 'Premier League',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd32dd8e-1772821240780.png",
  leagueLogoAlt: 'Logo de la Premier League inglesa con balón de fútbol sobre fondo verde',
  status: 'live',
  minute: 45,
  scheduledTime: '16:30',
  streams: [
  { id: 's12', language: 'Inglés', flag: '🇬🇧', quality: '1080p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true },
  { id: 's13', language: 'Español', flag: '🇪🇸', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true },
  { id: 's14', language: 'Portugués', flag: '🇵🇹', quality: '480p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true }],

  featured: false,
  thumbnail: "https://images.unsplash.com/photo-1548586843-682ff79e905d",
  thumbnailAlt: 'Estadio Emirates de Londres iluminado de noche durante el derbi de Londres entre Arsenal y Chelsea'
},
{
  id: 'match-008',
  homeTeam: 'Porto',
  awayTeam: 'Benfica',
  homeLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_197fef456-1772821245159.png",
  homeLogoAlt: 'Escudo del FC Porto en azul y blanco con el dragón dorado',
  awayLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_16c01fa6d-1772821249057.png",
  awayLogoAlt: 'Escudo del Benfica en rojo con el águila sobre fondo blanco',
  homeScore: null,
  awayScore: null,
  league: 'Primeira Liga',
  leagueLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1fca4c413-1772821246123.png",
  leagueLogoAlt: 'Logo de la Primeira Liga portuguesa con balón de fútbol sobre fondo verde',
  status: 'upcoming',
  minute: null,
  scheduledTime: '22:15',
  streams: [
  { id: 's15', language: 'Portugués', flag: '🇵🇹', quality: '720p', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', working: true }],

  featured: false,
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_160910b56-1772821260708.png",
  thumbnailAlt: 'Estadio do Dragão de Oporto iluminado de noche durante el clásico portugués Porto vs Benfica'
}];