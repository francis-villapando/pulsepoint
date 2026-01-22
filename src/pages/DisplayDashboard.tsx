import { useState } from 'react';
import { mockAnnouncements, mockEvents, mockPolls } from '@/data/mockData';
import { AnnouncementCard } from '@/components/display/AnnouncementCard';
import { EventCard } from '@/components/display/EventCard';
import { PollCard } from '@/components/display/PollCard';
import { QRCodeSection } from '@/components/display/QRCodeSection';
import { GestureHint } from '@/components/display/GestureHint';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Megaphone, 
  Calendar, 
  BarChart3, 
  Radio,
  Clock,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';

export default function DisplayDashboard() {
  const [activeTab, setActiveTab] = useState('announcements');
  const currentTime = new Date();
  const pinnedAnnouncements = mockAnnouncements.filter(a => a.isPinned);
  const upcomingEvents = mockEvents.slice(0, 3);
  const activePoll = mockPolls.find(p => p.isActive);

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

      {/* Main Content */}
      <main className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-8">
            {/* Featured Announcements */}
            {pinnedAnnouncements.length > 0 && (
              <section className="animate-slide-up">
                <div className="flex items-center gap-3 mb-4">
                  <Megaphone className="h-6 w-6 text-secondary" />
                  <h2 className="text-2xl font-display font-semibold">Important Updates</h2>
                </div>
                <div className="grid gap-4">
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <TabsList className="glass-card p-1 h-auto">
                <TabsTrigger value="announcements" className="text-lg px-6 py-3 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                  <Megaphone className="h-5 w-5 mr-2" />
                  Announcements
                </TabsTrigger>
                <TabsTrigger value="events" className="text-lg px-6 py-3 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                  <Calendar className="h-5 w-5 mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="polls" className="text-lg px-6 py-3 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Polls
                </TabsTrigger>
              </TabsList>

              <TabsContent value="announcements" className="mt-6">
                <div className="grid gap-4">
                  {mockAnnouncements.filter(a => !a.isPinned).map((announcement) => (
                    <AnnouncementCard 
                      key={announcement.id} 
                      announcement={announcement}
                      isDisplay
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="grid grid-cols-2 gap-6">
                  {mockEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event}
                      isDisplay
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="polls" className="mt-6">
                <div className="grid gap-6">
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
          <div className="col-span-4 space-y-8">
            {/* QR Code Section */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <QRCodeSection />
            </div>

            {/* Quick Events */}
            <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-display font-semibold">Coming Up</h3>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="glass-card rounded-xl p-4 hover:shadow-elevated transition-all cursor-pointer"
                  >
                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format(event.date, 'MMM d')} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Poll Preview */}
            {activePoll && (
              <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-display font-semibold">Active Poll</h3>
                </div>
                <PollCard poll={activePoll} />
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Gesture Hint */}
      <GestureHint />
    </div>
  );
}
