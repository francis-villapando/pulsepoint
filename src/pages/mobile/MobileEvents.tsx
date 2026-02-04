import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Event } from '@/types/pulsepoint';
import { EventCard } from '@/components/display/EventCard';

export default function MobileEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.events.getAll();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading events...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-display font-semibold">Upcoming Events</h2>
      <div className="space-y-4">
        {events.length > 0 ? events.map((event) => (
          <EventCard key={event.id} event={event} />
        )) : (
          <p className="text-muted-foreground text-sm">No upcoming events.</p>
        )}
      </div>
    </div>
  );
}
