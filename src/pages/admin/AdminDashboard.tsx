import { ContentTable } from '@/components/admin/ContentTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAnnouncements, mockEvents, mockPolls, mockFeedback } from '@/data/mockData';
import { 
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

const recentColumns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type', render: (value: string) => (
    <Badge variant="outline" className="capitalize">{value}</Badge>
  )},
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status', render: (value: string) => (
    <Badge className={value === 'active' ? 'bg-pulse-success' : 'bg-muted text-muted-foreground'}>
      {value}
    </Badge>
  )},
];

const recentActivity = [
  { id: 1, title: 'Community Clean-Up Day', type: 'announcement', date: 'Jan 20', status: 'active' },
  { id: 2, title: 'Farmers Market', type: 'event', date: 'Jan 25', status: 'active' },
  { id: 3, title: 'Budget Priority Poll', type: 'poll', date: 'Jan 15', status: 'active' },
  { id: 4, title: 'Water Main Notice', type: 'announcement', date: 'Jan 19', status: 'active' },
];

const feedbackColumns = [
  { key: 'content', label: 'Feedback', render: (value: string) => (
    <span className="line-clamp-1 max-w-xs">{value}</span>
  )},
  { key: 'category', label: 'Category', render: (value: string) => (
    <Badge variant="outline" className="capitalize">{value}</Badge>
  )},
  { key: 'status', label: 'Status', render: (value: string) => (
    <Badge className={
      value === 'addressed' ? 'bg-pulse-success text-white' : 
      value === 'reviewed' ? 'bg-pulse-info text-white' : 
      'bg-accent text-accent-foreground'
    }>
      {value}
    </Badge>
  )},
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your community content and engagement</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="font-display">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ContentTable 
              columns={recentColumns}
              data={recentActivity}
              onEdit={() => {}}
            />
          </CardContent>
        </Card>

        {/* Engagement Overview */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="font-display">Engagement Overview</CardTitle>
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
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Mobile Connections</span>
                <span className="font-semibold">567</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full gradient-secondary rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Poll Participation</span>
                <span className="font-semibold">918</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-pulse-info rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Feedback Submissions</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="font-display">Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentTable 
            columns={feedbackColumns}
            data={mockFeedback}
            onEdit={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
