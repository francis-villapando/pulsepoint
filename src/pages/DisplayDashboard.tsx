import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { CarouselImage, Announcement, Event, Poll } from '@/types/pulsepoint';
import { mockPolls } from '@/data/mockData';
import { AnnouncementCard } from '@/components/display/AnnouncementCard';
import { EventCard } from '@/components/display/EventCard';
import { PollCard } from '@/components/display/PollCard';
import { QRCodeSection } from '@/components/display/QRCodeSection';
import { GestureHint } from '@/components/display/GestureHint';
import { ImageCarousel } from '@/components/display/ImageCarousel';
import {
  Megaphone,
  Calendar,
  BarChart3,
  Radio,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { format } from 'date-fns';

export default function DisplayDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Data State
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const pages = [
    { id: 0, title: 'Carousel', icon: '🖼️' },
    { id: 1, title: 'Announcements', icon: '📢' },
    { id: 2, title: 'Events', icon: '📅' },
    { id: 3, title: 'Polls', icon: '📊' }
  ];

  // Fetch Data
  const fetchData = async () => {
    try {
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
    // Refresh data every 60 seconds
    const dataTimer = setInterval(fetchData, 60000);
    // Update time every minute
    const timeTimer = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => {
      clearInterval(dataTimer);
      clearInterval(timeTimer);
    };
  }, []);

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const pageHeight = container.clientHeight;
      container.scrollTo({
        top: pageIndex * pageHeight,
        behavior: 'smooth'
      });
      setCurrentPage(pageIndex);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current && !isScrolling) {
      const container = scrollContainerRef.current;
      const pageHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const pageIndex = Math.round(scrollTop / pageHeight);

      if (pageIndex !== currentPage) {
        setCurrentPage(pageIndex);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentPage < pages.length - 1) {
        scrollToPage(currentPage + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentPage > 0) {
        scrollToPage(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentPage, isScrolling]);

  if (loading && carouselImages.length === 0 && announcements.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background display-mode">
        <div className="p-8 glass-card rounded-2xl flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-xl font-display font-medium">Loading Community Pulse...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background display-mode">
      {/* Vertical Pagination Dots */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="glass-card rounded-2xl p-4 flex flex-col space-y-4">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => scrollToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === index
                  ? 'bg-primary scale-125 shadow-glow-primary'
                  : 'bg-muted hover:bg-muted/80'
                }`}
              title={page.title}
            />
          ))}
        </div>
      </div>

      {/* Scroll Navigation Controls */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollToPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="h-12 w-12 rounded-full glass-card shadow-lg"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollToPage(Math.min(pages.length - 1, currentPage + 1))}
          disabled={currentPage === pages.length - 1}
          className="h-12 w-12 rounded-full glass-card shadow-lg"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
        style={{ scrollSnapType: 'y mandatory', scrollbarWidth: 'none' }}
      >
        {/* Header */}
        <header className="sticky top-0 z-50">
          <div className="container mx-auto px-8 py-4">
            <div className="glass-card rounded-2xl px-8 py-4 shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 gradient-primary rounded-xl shadow-glow-primary">
                    <Radio className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-gradient-primary">PulsePoint</h2>
                    <p className="text-xs text-muted-foreground">Community Updates Hub</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-display font-semibold text-foreground">{format(currentTime, 'h:mm a')}</p>
                    <p className="text-xs text-muted-foreground">{format(currentTime, 'EEE, MMM d')}</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex items-center gap-2 text-pulse-success">
                    <div className="h-2 w-2 rounded-full bg-pulse-success animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page 1: Carousel */}
        <section className="snap-start min-h-screen relative overflow-hidden flex items-center">
          <div className="container mx-auto px-8 h-full">
            <div className="relative flex items-center justify-center h-full">
              <div className="relative overflow-hidden rounded-2xl">
                {/* Use real carousel images if available, else placeholder/empty or loading */}
                <ImageCarousel
                  images={carouselImages}
                  className="w-full h-full scale-90"
                  variant="background"
                  autoPlay={true}
                />
              </div>

              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background/90 via-background/60 to-transparent pointer-events-none z-10" />

              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background/90 via-background/60 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </section>

        {/* Page 2: Announcements */}
        <section className="snap-start min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-8 py-8 animate-slide-up">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <Megaphone className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-display font-semibold">Announcements and Advisory</h2>
              </div>
              <div className="relative">
                <div className="grid grid-rows-2 auto-cols-max grid-flow-col gap-4 max-h-[600px] overflow-x-auto p-6">
                  {announcements.map((announcement, index) => (
                    <div key={announcement.id} style={{ order: index }}>
                      <AnnouncementCard
                        announcement={announcement}
                        isDisplay
                      />
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground glass-card rounded-xl">
                      No announcements available.
                    </div>
                  )}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background/90 via-background/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Page 3: Events */}
        <section className="snap-start min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-8 py-8 animate-slide-up">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-display font-semibold">Events</h2>
              </div>
              <div className="relative">
                <div className="grid grid-rows-2 auto-cols-max grid-flow-col gap-4 max-h-[600px] overflow-x-auto p-6">
                  {events.map((event, index) => (
                    <div key={event.id} style={{ order: index }}>
                      <EventCard
                        event={event}
                        isDisplay
                      />
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground glass-card rounded-xl">
                      No events available.
                    </div>
                  )}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background/90 via-background/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Page 4: Polls */}
        <section className="snap-start min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-8 py-8 animate-slide-up">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-display font-semibold">Polls</h2>
              </div>
              <div className="relative">
                <div className="grid grid-rows-1 auto-cols-max grid-flow-col gap-4 max-h-[600px] overflow-x-auto p-6">
                  {mockPolls.map((poll, index) => (
                    <div key={poll.id} style={{ order: index }}>
                      <PollCard
                        poll={poll}
                        isDisplay
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background/90 via-background/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Gesture Hint */}
        <GestureHint />
      </div>

      {/* QR Code Overlay */}
      <div className="fixed bottom-8 right-8 z-50">
        <QRCodeSection />
      </div>

      {/* Import Button component needed for new UI, ensure it's imported at top */}
    </div>
  );
}
// Note: Changed import for Button to be used
import { Button } from '@/components/ui/button';
