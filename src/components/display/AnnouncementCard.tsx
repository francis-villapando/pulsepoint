import { useState } from 'react';
import { Announcement } from '@/types/pulsepoint';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pin, AlertTriangle, Wrench, PartyPopper, Megaphone } from 'lucide-react';
import { format } from 'date-fns';
import { AnnouncementDialog } from './AnnouncementDialog';

interface AnnouncementCardProps {
  announcement: Announcement;
  isDisplay?: boolean;
}

const categoryConfig = {
  general: { icon: Megaphone, color: 'bg-primary/10 text-primary border-primary/20' },
  safety: { icon: AlertTriangle, color: 'bg-destructive/10 text-destructive border-destructive/20' },
  maintenance: { icon: Wrench, color: 'bg-accent/10 text-accent-foreground border-accent/20' },
  celebration: { icon: PartyPopper, color: 'bg-secondary/10 text-secondary border-secondary/20' },
};

export function AnnouncementCard({ announcement, isDisplay }: AnnouncementCardProps) {
  const [open, setOpen] = useState(false); // <-- state for dialog
  const config = categoryConfig[announcement.category] || categoryConfig.general;
  const Icon = config.icon;

  return (
    <AnnouncementDialog
      announcement={announcement}
      isOpen={open}
      onOpenChange={setOpen} // allows dialog to open/close
    >
      <Card
        onClick={() => setOpen(true)} // click opens dialog
        className={`
          relative overflow-hidden cursor-pointer transition-all duration-300 
          hover:shadow-elevated hover:scale-[1.02] border-l-4 group
          ${announcement.isPinned ? 'border-l-secondary' : 'border-l-primary'}
          ${isDisplay ? 'p-4' : 'p-3'}
          w-[400px] max-w-full h-[200px]
        `}
      >
        {announcement.isPinned && (
          <div className="absolute top-2 right-2">
            <Pin className="h-3 w-3 text-secondary" />
          </div>
        )}

        <CardHeader className={`${isDisplay ? 'pb-3' : 'pb-2'}`}>
          <div className="flex items-start gap-2">
            <div className={`p-1.5 rounded-lg ${config.color}`}>
              <Icon className={`${isDisplay ? 'h-5 w-5' : 'h-3 w-3'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className={`${isDisplay ? 'text-lg' : 'text-base'} font-display leading-tight line-clamp-1 group-hover:text-primary transition-colors`}>
                {announcement.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {format(announcement.createdAt, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className={`text-muted-foreground ${isDisplay ? 'text-sm' : 'text-xs'} line-clamp-2`}>
            {announcement.content}
          </p>
          <Badge variant="outline" className={`mt-2 ${config.color} text-xs`}>
            {announcement.category}
          </Badge>
        </CardContent>
      </Card>
    </AnnouncementDialog>
  );
}