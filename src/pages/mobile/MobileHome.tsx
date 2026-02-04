import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Announcement, Poll } from '@/types/pulsepoint';
import { mockPolls } from '@/data/mockData'; // Mock polls kept as backend doesn't support yet
import { AnnouncementCard } from '@/components/display/AnnouncementCard';
import { PollCard } from '@/components/display/PollCard';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function MobileHome() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const activePoll = mockPolls.find(p => p.isActive);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.announcements.getAll();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading updates...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="gradient-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Connected Successfully</span>
          </div>
          <p className="text-sm opacity-90">
            You're now connected to your community hub. Browse updates, vote in polls, and share feedback.
          </p>
        </CardContent>
      </Card>

      {/* Active Poll */}
      {activePoll && (
        <section>
          <h2 className="text-lg font-display font-semibold mb-3">Quick Poll</h2>
          <PollCard poll={activePoll} />
        </section>
      )}

      {/* Announcements */}
      <section>
        <h2 className="text-lg font-display font-semibold mb-3">Latest Updates</h2>
        <div className="space-y-3">
          {announcements.length > 0 ? announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          )) : (
            <p className="text-muted-foreground text-sm">No updates available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
