import { Event } from '@/types/pulsepoint';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Dumbbell, GraduationCap, Palette, Heart } from 'lucide-react';
import { format } from 'date-fns';

interface EventDialogProps {
  event: Event;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const categoryConfig = {
  community: { icon: Users, color: 'bg-primary text-primary-foreground' },
  sports: { icon: Dumbbell, color: 'bg-secondary text-secondary-foreground' },
  education: { icon: GraduationCap, color: 'bg-pulse-info text-white' },
  culture: { icon: Palette, color: 'bg-accent text-accent-foreground' },
  health: { icon: Heart, color: 'bg-pulse-success text-white' },
};

export function EventDialog({ event, isOpen, onOpenChange, children }: EventDialogProps) {
  const config = categoryConfig[event.category];
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
              <h2 className="text-xl font-display">{event.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                <span>{format(event.date, 'MMM d, yyyy')}</span>
                <span>•</span>
                <span>{event.time}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${config.color} text-xs`}>
              {event.category}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
