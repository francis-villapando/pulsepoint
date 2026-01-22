import { Outlet } from 'react-router-dom';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNav } from '@/components/mobile/MobileNav';

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <MobileHeader />
      <main className="pb-24 px-4 py-4">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
