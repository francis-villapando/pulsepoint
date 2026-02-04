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
        ${isDisplay ? 'p-3' : 'p-2'}
        w-[400px] max-w-full h-[230px]
      `}
      onClick={onClick}
    >
      <div className={`${config.color} px-3 py-2 flex items-center gap-2`}>
        <Icon className="h-4 w-4" />
        <span className="font-medium text-xs capitalize">{event.category}</span>
      </div>
      <CardHeader className={isDisplay ? 'pb-2' : 'pb-1'}>
        <CardTitle className={`${isDisplay ? 'text-lg' : 'text-base'} font-display group-hover:text-primary transition-colors line-clamp-1`}>
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className={`text-muted-foreground ${isDisplay ? 'text-sm' : 'text-xs'} line-clamp-2`}>
          {event.description}
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3 text-primary" />
            <span>{format(event.date, 'MMM d')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
