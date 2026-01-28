import { Radio, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/mobile';

  return (
    <header className="sticky top-0 z-50 glass-card border-b px-4 py-3">
      <div className="flex items-center gap-3">
        {!isHome && (
          <Button variant="ghost" size="icon" type="button" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2 flex-1">
          <div className="p-2 gradient-primary rounded-lg">
            <Radio className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold">PulsePoint</h1>
            <p className="text-xs text-muted-foreground">Community Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-pulse-success text-xs">
          <div className="h-2 w-2 rounded-full bg-pulse-success animate-pulse" />
          <span>Live</span>
        </div>
      </div>
    </header>
  );
}
