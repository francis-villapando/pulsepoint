import { Announcement } from '@/types/pulsepoint';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pin, AlertTriangle, Wrench, PartyPopper, Megaphone, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface AnnouncementDialogProps {
  announcement: Announcement;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const categoryConfig = {
  general: { icon: Megaphone, color: 'bg-primary/10 text-primary border-primary/20' },
  safety: { icon: AlertTriangle, color: 'bg-destructive/10 text-destructive border-destructive/20' },
  maintenance: { icon: Wrench, color: 'bg-accent/10 text-accent-foreground border-accent/20' },
  celebration: { icon: PartyPopper, color: 'bg-secondary/10 text-secondary border-secondary/20' },
};

export function AnnouncementDialog({ announcement, isOpen, onOpenChange, children }: AnnouncementDialogProps) {
  const config = categoryConfig[announcement.category] || categoryConfig.general;
  const Icon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-display justify-center">{announcement.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                <span>{format(announcement.createdAt, 'MMM d, yyyy')}</span>
                {announcement.isPinned && (
                  <>
                    <span>•</span>
                    <span className="text-pulse-info">Pinned</span>
                  </>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${config.color} text-xs`}>
              {announcement.category}
            </Badge>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground whitespace-pre-wrap">{announcement.content}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
