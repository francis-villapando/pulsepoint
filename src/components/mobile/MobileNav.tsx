import { NavLink, useLocation } from 'react-router-dom';
import { Megaphone, Calendar, BarChart3, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Megaphone, label: 'Updates', path: '/mobile' },
  { icon: Calendar, label: 'Events', path: '/mobile/events' },
  { icon: BarChart3, label: 'Polls', path: '/mobile/polls' },
  { icon: MessageSquare, label: 'Feedback', path: '/mobile/feedback' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg transition-all',
                isActive && 'gradient-primary shadow-soft'
              )}>
                <item.icon className={cn(
                  'h-5 w-5',
                  isActive && 'text-primary-foreground'
                )} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
