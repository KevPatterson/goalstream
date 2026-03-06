import type { Metadata } from 'next';
import AdminPanelInteractive from './components/AdminPanelInteractive';

export const metadata: Metadata = {
  title: 'Panel de Administración - Football Terminal',
  description: 'Gestiona partidos y streams de fútbol en vivo. Añade, edita y elimina contenido desde el panel de administración.',
};

export default function AdminPanelPage() {
  return (
    <main className="min-h-screen bg-background">
      <AdminPanelInteractive />
    </main>
  );
}