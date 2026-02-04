import { useState } from 'react';
import { mockAnnouncements, mockEvents, mockPolls, mockFeedback, mockCarouselImages } from '@/data/mockData';
import { ArchivesContentTable } from '@/components/admin/ArchivesContentTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Archive, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';

// Mock archived data - in a real app, this would come from your database
const mockArchivedItems = [
  {
    id: 'archive-1',
    type: 'carousel' as const,
    title: 'Community Clean-Up Day 2026',
    content: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=400&fit=crop',
    archiveDate: new Date('2026-01-22'),
  },
  {
    id: 'archive-2',
    type: 'announcement' as const,
    title: 'Water Main Maintenance Notice',
    content: 'Scheduled maintenance on Oak Street water main. Expect reduced water pressure from 10 PM to 6 AM on January 25th.',
    archiveDate: new Date('2026-01-21'),
  },
  {
    id: 'archive-3',
    type: 'event' as const,
    title: 'Farmers Market',
    content: 'Fresh local produce, artisan goods, and live music every Saturday morning.',
    archiveDate: new Date('2026-01-20'),
  },
  {
    id: 'archive-4',
    type: 'poll' as const,
    title: 'What should be the priority for next year\'s community budget?',
    content: 'Road repairs, Park improvements, Public safety, Youth programs',
    archiveDate: new Date('2026-01-19'),
  },
  {
    id: 'archive-5',
    type: 'feedback' as const,
    title: 'The new bike lanes on Main Street are wonderful!',
    content: 'Makes commuting so much safer.',
    archiveDate: new Date('2026-01-18'),
  },
];

const columns = [
  { key: 'type', label: 'Type', render: (value: string) => (
    <span className="font-medium capitalize">
      {value === 'carousel' ? 'Carousel Image' : 
       value === 'announcement' ? 'Announcement' :
       value === 'event' ? 'Event' :
       value === 'poll' ? 'Poll' : 'Feedback'}
    </span>
  )},
  { key: 'title', label: 'Title/Question/Feedback', render: (value: string) => (
    <span className="font-medium line-clamp-2">{value}</span>
  )},
  { key: 'archiveDate', label: 'Archive Date', render: (value: Date) => format(value, 'MMM d, yyyy')},
];

export default function AdminArchives() {
  const handleRestore = (item: any) => {
    // In a real app, this would call your API to restore the item
    console.log('Restore item:', item);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Archived Content</h1>
          <p className="text-muted-foreground">View and manage archived items from all content types</p>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">All Archived Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ArchivesContentTable 
            columns={columns}
            data={mockArchivedItems}
            onRestore={handleRestore}
          />
        </CardContent>
      </Card>
    </div>
  );
}
