import type { Metadata } from 'next';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Partidos en Vivo - Football Terminal',
  description: 'Descubre partidos de fútbol en vivo, próximos y finalizados. Accede a streams de alta calidad con interfaz de terminal de transmisión.',
};

export default function HomepagePage() {
  return <HomepageInteractive />;
}