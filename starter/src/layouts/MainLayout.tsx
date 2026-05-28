import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
