import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CarouselImage, Announcement, Event, Poll } from '@/types/pulsepoint'; // Added Poll import even if unused/mocked for now
import { mockPolls } from '@/data/mockData'; // Keep mock polls as per instructions
import { AnnouncementCard } from '@/components/display/AnnouncementCard';
import { EventCard } from '@/components/display/EventCard';
import { PollCard } from '@/components/display/PollCard';
import { QRCodeSection } from '@/components/display/QRCodeSection';
import { GestureHint } from '@/components/display/GestureHint';
import { ImageCarousel } from '@/components/display/ImageCarousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Megaphone,
  Calendar,
  BarChart3,
  Radio,
  Cloud,
  Droplets,
  Wind
} from 'lucide-react';
import { format } from 'date-fns';

export default function DisplayDashboard() {
  const [activeTab, setActiveTab] = useState('announcements');
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for fetched data
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Data
  const fetchData = async () => {
    try {
      // Use Promise.allSettled to avoid one failure breaking everything, or Promise.all if strict
      const [imagesData, announcementsData, eventsData] = await Promise.all([
        api.carousel.getAll().catch(() => []),
        api.announcements.getAll().catch(() => []),
        api.events.getAll().catch(() => [])
      ]);

      setCarouselImages(imagesData.filter(img => img.isActive));
      setAnnouncements(announcementsData);
      setEvents(eventsData);
    } catch (error) {
      console.error("Failed to fetch display data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 60 seconds (more frequent for display)
    const dataTimer = setInterval(fetchData, 60000);
    return () => clearInterval(dataTimer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background display-mode">
        <div className="p-8 glass-card rounded-2xl flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-xl font-display font-medium">Loading Community Pulse...</p>
        </div>
      </div>
    );
  }

  const activeAnnouncements = announcements.filter(a => !a.isPinned).slice(0, 3);
  const pinnedAnnouncements = announcements.filter(a => a.isPinned);
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date(new Date().setHours(0, 0, 0, 0))) // simple active filter
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background display-mode">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 gradient-primary rounded-2xl shadow-glow-primary">
                <Radio className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-gradient-primary">PulsePoint</h1>
                <p className="text-muted-foreground">Community Updates Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-3xl font-display font-semibold">{format(currentTime, 'h:mm a')}</p>
                <p className="text-muted-foreground">{format(currentTime, 'EEEE, MMMM d, yyyy')}</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex items-center gap-2 text-pulse-success">
                <div className="h-3 w-3 rounded-full bg-pulse-success animate-pulse" />
                <span className="font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Image Carousel */}
      <section className="container mx-auto px-8 py-8 animate-slide-up">
        <div className="glass-card rounded-2xl overflow-hidden shadow-elevated">
          <ImageCarousel images={carouselImages} />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="w-full lg:col-span-8 space-y-6 lg:space-y-8">
            {/* Featured Announcements */}
            {pinnedAnnouncements.length > 0 && (
              <section className="animate-slide-up">
                <div className="flex items-center gap-3 mb-4">
                  <Megaphone className="h-5 w-5 lg:h-6 lg:w-6 text-secondary" />
                  <h2 className="text-xl lg:text-2xl font-display font-semibold">Important Updates</h2>
                </div>
                <div className="grid gap-3 lg:gap-4">
                  {pinnedAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      isDisplay
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Tabs for Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-up w-full" style={{ animationDelay: '0.1s' }}>
              <TabsList className="glass-card p-1 h-auto w-full flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-2">
                <TabsTrigger value="announcements" className="text-base lg:text-lg px-4 lg:px-6 py-2 lg:py-3 flex-1 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                  <Megaphone className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Announcements
                </TabsTrigger>
                <TabsTrigger value="events" className="text-base lg:text-lg px-4 lg:px-6 py-2 lg:py-3 flex-1 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                  <Calendar className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="polls" className="text-base lg:text-lg px-4 lg:px-6 py-2 lg:py-3 flex-1 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                  <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Polls
                </TabsTrigger>
              </TabsList>

              <TabsContent value="announcements" className="mt-4 lg:mt-6">
                <div className="grid gap-4">
                  {activeAnnouncements.length > 0 ? activeAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      isDisplay
                    />
                  )) : (
                    <div className="p-8 text-center text-muted-foreground glass-card rounded-xl">
                      No general announcements at this time.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-4 lg:mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isDisplay
                    />
                  )) : (
                    <div className="col-span-1 md:col-span-2 p-8 text-center text-muted-foreground glass-card rounded-xl">
                      No upcoming events scheduled.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="polls" className="mt-4 lg:mt-6">
                <div className="grid gap-4 lg:gap-6">
                  {mockPolls.map((poll) => (
                    <PollCard
                      key={poll.id}
                      poll={poll}
                      isDisplay
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full lg:col-span-4 space-y-6 lg:space-y-8 mt-6 lg:mt-0">
            {/* Weather Widget */}
            <div className="animate-slide-up bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-200/20 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg lg:text-xl font-semibold">Current Weather</h3>
                <Cloud className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl lg:text-5xl font-bold">72°</span>
                <span className="text-base lg:text-lg text-muted-foreground">Partly Cloudy</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplets className="h-4 w-4" />
                  <span>Humidity: 45%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wind className="h-4 w-4" />
                  <span>Wind: 8mph</span>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <QRCodeSection />
            </div>
          </div>
        </div>
      </main>

      {/* Gesture Hint */}
      <GestureHint />
    </div>
  );
}
