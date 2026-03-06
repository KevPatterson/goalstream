import type { Metadata } from 'next';
import WatchPageInteractive from './components/WatchPageInteractive';

export const metadata: Metadata = {
  title: 'Ver Partido - Football Terminal',
  description: 'Transmisión en vivo de fútbol con reproductor HLS multi-calidad y controles de terminal.',
};

export default function WatchPage() {
  return <WatchPageInteractive />;
}