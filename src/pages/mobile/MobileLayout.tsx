import { Outlet } from 'react-router-dom';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNav } from '@/components/mobile/MobileNav';

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto w-full">
      <MobileHeader />
      <main className="overflow-y-auto px-4 py-4 pb-24" style={{ maxHeight: '100vh' }}>
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}