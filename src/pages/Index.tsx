import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Radio, Monitor, Smartphone, Settings, ArrowRight, Users, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15),_transparent_50%)]" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium animate-fade-in">
              <div className="h-2 w-2 rounded-full bg-pulse-success animate-pulse" />
              <span>Live Community Updates</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight animate-slide-up">
              <span className="text-gradient-primary">PulsePoint</span>
              <br />
              <span className="text-foreground">Community Hub</span>
            </h1>
            
            <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              An interactive display system connecting local government with citizens through real-time updates, events, polls, and community feedback.
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild variant="pulse" size="xl">
                <Link to="/display">
                  <Monitor className="h-5 w-5 mr-2" />
                  View Display
                </Link>
              </Button>
              <Button asChild variant="coral" size="xl">
                <Link to="/mobile">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Mobile View
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/admin">
                  <Settings className="h-5 w-5 mr-2" />
                  Admin Panel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Three Interfaces, One Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PulsePoint seamlessly connects public displays, mobile devices, and administrative controls to create a unified community engagement platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Display Card */}
          <Card className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
            <div className="h-2 gradient-primary" />
            <CardContent className="p-8 space-y-4">
              <div className="p-4 w-fit rounded-xl gradient-primary shadow-glow-primary group-hover:scale-110 transition-transform">
                <Monitor className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-semibold">Public Display</h3>
              <p className="text-muted-foreground">
                Large-format interactive display with gesture navigation for community announcements, events, and real-time polls.
              </p>
              <Button asChild variant="ghost" className="group/btn">
                <Link to="/display">
                  Explore Display
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Mobile Card */}
          <Card className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
            <div className="h-2 gradient-secondary" />
            <CardContent className="p-8 space-y-4">
              <div className="p-4 w-fit rounded-xl gradient-secondary shadow-glow-secondary group-hover:scale-110 transition-transform">
                <Smartphone className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-semibold">Mobile Connection</h3>
              <p className="text-muted-foreground">
                Scan and connect via QR code to browse updates, participate in polls, and submit feedback from your smartphone.
              </p>
              <Button asChild variant="ghost" className="group/btn">
                <Link to="/mobile">
                  Try Mobile View
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
            <div className="h-2 gradient-accent" />
            <CardContent className="p-8 space-y-4">
              <div className="p-4 w-fit rounded-xl bg-accent group-hover:scale-110 transition-transform">
                <Settings className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-display font-semibold">Admin Control</h3>
              <p className="text-muted-foreground">
                Comprehensive dashboard for publishing announcements, managing events, creating polls, and reviewing feedback.
              </p>
              <Button asChild variant="ghost" className="group/btn">
                <Link to="/admin">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-gradient-primary">1,234</div>
              <p className="text-muted-foreground">Daily Interactions</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-secondary">567</div>
              <p className="text-muted-foreground">Mobile Connections</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-pulse-info">918</div>
              <p className="text-muted-foreground">Poll Votes</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-accent-foreground">89</div>
              <p className="text-muted-foreground">Feedback Submitted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg">
                <Radio className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">PulsePoint</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting Communities, One Update at a Time
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
