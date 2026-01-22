import { Announcement } from '@/types/pulsepoint';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pin, AlertTriangle, Wrench, PartyPopper, Megaphone } from 'lucide-react';
import { format } from 'date-fns';

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick?: () => void;
  isDisplay?: boolean;
}

const categoryConfig = {
  general: { icon: Megaphone, color: 'bg-primary/10 text-primary border-primary/20' },
  safety: { icon: AlertTriangle, color: 'bg-destructive/10 text-destructive border-destructive/20' },
  maintenance: { icon: Wrench, color: 'bg-accent/10 text-accent-foreground border-accent/20' },
  celebration: { icon: PartyPopper, color: 'bg-secondary/10 text-secondary border-secondary/20' },
};

export function AnnouncementCard({ announcement, onClick, isDisplay }: AnnouncementCardProps) {
  const config = categoryConfig[announcement.category] || categoryConfig.general;
  const Icon = config.icon;

  return (
    <Card 
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300 
        hover:shadow-elevated hover:scale-[1.02] border-l-4 
        ${announcement.isPinned ? 'border-l-secondary' : 'border-l-primary'}
        ${isDisplay ? 'p-6' : ''}
      `}
      onClick={onClick}
    >
      {announcement.isPinned && (
        <div className="absolute top-3 right-3">
          <Pin className="h-4 w-4 text-secondary" />
        </div>
      )}
      <CardHeader className={`pb-2 ${isDisplay ? 'pb-4' : ''}`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${config.color}`}>
            <Icon className={`${isDisplay ? 'h-6 w-6' : 'h-4 w-4'}`} />
          </div>
          <div className="flex-1">
            <CardTitle className={`${isDisplay ? 'text-2xl' : 'text-lg'} font-display leading-tight`}>
              {announcement.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {format(announcement.createdAt, 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-muted-foreground ${isDisplay ? 'text-lg' : 'text-sm'} line-clamp-3`}>
          {announcement.content}
        </p>
        <Badge variant="outline" className={`mt-3 ${config.color}`}>
          {announcement.category}
        </Badge>
      </CardContent>
    </Card>
  );
}
