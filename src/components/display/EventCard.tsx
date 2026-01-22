import { Event } from '@/types/pulsepoint';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Dumbbell, GraduationCap, Palette, Heart } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  isDisplay?: boolean;
}

const categoryConfig = {
  community: { icon: Users, color: 'bg-primary text-primary-foreground' },
  sports: { icon: Dumbbell, color: 'bg-secondary text-secondary-foreground' },
  education: { icon: GraduationCap, color: 'bg-pulse-info text-white' },
  culture: { icon: Palette, color: 'bg-accent text-accent-foreground' },
  health: { icon: Heart, color: 'bg-pulse-success text-white' },
};

export function EventCard({ event, onClick, isDisplay }: EventCardProps) {
  const config = categoryConfig[event.category];
  const Icon = config.icon;

  return (
    <Card 
      className={`
        overflow-hidden cursor-pointer transition-all duration-300 
        hover:shadow-elevated hover:scale-[1.02] group
        ${isDisplay ? 'p-4' : ''}
      `}
      onClick={onClick}
    >
      <div className={`${config.color} px-4 py-3 flex items-center gap-2`}>
        <Icon className="h-5 w-5" />
        <span className="font-medium capitalize">{event.category}</span>
      </div>
      <CardHeader className={isDisplay ? 'pb-3' : 'pb-2'}>
        <CardTitle className={`${isDisplay ? 'text-xl' : 'text-lg'} font-display group-hover:text-primary transition-colors`}>
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className={`text-muted-foreground ${isDisplay ? 'text-base' : 'text-sm'} line-clamp-2`}>
          {event.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{format(event.date, 'EEEE, MMMM d')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
