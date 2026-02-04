import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Announcement, Event } from '@/types/pulsepoint';
import { mockPolls, mockFeedback } from '@/data/mockData'; // Keep mock polls/feedback for now
import { StatsCard } from '@/components/admin/StatsCard';
import { ContentTable } from '@/components/admin/ContentTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Megaphone,
  Calendar,
  BarChart3,
  MessageSquare,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

const recentColumns = [
  { key: 'title', label: 'Title' },
  {
    key: 'type', label: 'Type', render: (value: string) => (
      <Badge variant="outline" className="capitalize">{value}</Badge>
    )
  },
  {
    key: 'date', label: 'Date', render: (value: Date) => {
      try {
        return format(new Date(value), 'MMM d, yyyy');
      } catch (e) {
        return 'N/A';
      }
    }
  },
  {
    key: 'status', label: 'Status', render: (value: string) => (
      <Badge className={value ? 'bg-pulse-success text-white' : 'bg-muted text-muted-foreground'}>
        {value ? 'Active' : 'Inactive'}
      </Badge>
    )
  },
];

const feedbackColumns = [
  {
    key: 'content', label: 'Feedback', render: (value: string) => (
      <span className="line-clamp-1 max-w-xs">{value}</span>
    )
  },
  {
    key: 'category', label: 'Category', render: (value: string) => (
      <Badge variant="outline" className="capitalize">{value}</Badge>
    )
  },
  {
    key: 'status', label: 'Status', render: (value: string) => (
      <Badge className={
        value === 'addressed' ? 'bg-pulse-success text-white' :
          value === 'reviewed' ? 'bg-pulse-info text-white' :
            'bg-accent text-accent-foreground'
      }>
        {value}
      </Badge>
    )
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aData, eData] = await Promise.all([
          api.announcements.getAll().catch(() => []),
          api.events.getAll().catch(() => [])
        ]);
        setAnnouncements(aData);
        setEvents(eData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Combine and sort for recent activity
  const recentActivity = [
    ...announcements.map(a => ({
      id: `ann-${a.id}`,
      title: a.title,
      type: 'announcement',
      date: a.createdAt,
      status: true // Announcements are active by default for now
    })),
    ...events.map(e => ({
      id: `evt-${e.id}`,
      title: e.title,
      type: 'event',
      date: e.createdAt,
      status: true // Events are active 
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your community content and engagement</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <StatsCard
          title="Total Announcements"
          value={announcements.length}
          change="Total"
          changeType="neutral"
          icon={Megaphone}
        />
        <StatsCard
          title="Upcoming Events"
          value={events.length}
          change="Total"
          changeType="neutral"
          icon={Calendar}
          iconColor="gradient-secondary"
        />
        <StatsCard
          title="Active Polls"
          value={mockPolls.filter(p => p.isActive).length}
          change="Total"
          changeType="neutral"
          icon={BarChart3}
          iconColor="bg-pulse-info"
        />
        <StatsCard
          title="Feedback Received"
          value={mockFeedback.length}
          change="Total"
          changeType="neutral"
          icon={MessageSquare}
          iconColor="bg-accent"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="font-display">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/announcements')}>
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading activity...</div>
            ) : (
              <ContentTable
                columns={recentColumns}
                data={recentActivity}
                onEdit={() => { }}
              />
            )}
          </CardContent>
        </Card>

        {/* Engagement Overview (Static for now) */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="font-display">Engagement Overview (Demo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Display Interactions</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full gradient-primary rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            {/* ... other stats ... */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Poll Participation</span>
                <span className="font-semibold">918</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-pulse-info rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="font-display">Recent Feedback</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/feedbacks')}>
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <ContentTable
            columns={feedbackColumns}
            data={mockFeedback}
            onEdit={() => { }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
