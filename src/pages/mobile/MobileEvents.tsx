import { mockEvents } from '@/data/mockData';
import { EventCard } from '@/components/display/EventCard';

export default function MobileEvents() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-display font-semibold">Upcoming Events</h2>
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
