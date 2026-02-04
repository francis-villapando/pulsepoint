import { mockAnnouncements, mockPolls, mockCarouselImages } from '@/data/mockData';
import { AnnouncementCard } from '@/components/display/AnnouncementCard';
import { PollCard } from '@/components/display/PollCard';
import { ImageCarousel } from '@/components/display/ImageCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function MobileHome() {
  const activePoll = mockPolls.find(p => p.isActive);

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

      {/* Image Carousel */}
      <section>
        <h2 className="text-lg font-display font-semibold mb-3">Recent Events</h2>
        <ImageCarousel 
          images={mockCarouselImages}
          className="w-full"
          variant="default"
          autoPlay={true}
          autoPlayInterval={5000}
        />
      </section>

      {/* Announcements and Advisory */}
      <section>
        <h2 className="text-lg font-display font-semibold mb-3">Announcements and Advisory</h2>
        <div className="space-y-3">
          {mockAnnouncements.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id} 
              announcement={announcement}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
