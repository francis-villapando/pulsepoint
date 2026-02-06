import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { ArchivesContentTable } from '@/components/admin/ArchivesContentTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ArchiveItem {
  id: string;
  type: 'carousel' | 'announcement' | 'event' | 'poll' | 'feedback';
  title: string;
  content: string;
  archiveDate: Date;
}

const columns = [
  {
    key: 'type',
    label: 'Type',
    render: (value: string) => (
      <span className="font-medium capitalize">
        {value === 'carousel' ? 'Carousel Image' :
          value === 'announcement' ? 'Announcement' :
            value === 'event' ? 'Event' :
              value === 'poll' ? 'Poll' : 'Feedback'}
      </span>
    )
  },
  {
    key: 'title',
    label: 'Title/Question/Feedback',
    render: (value: string) => (
      <span className="font-medium line-clamp-2">{value}</span>
    )
  },
  {
    key: 'archiveDate',
    label: 'Archive Date',
    render: (value: Date) => {
      try {
        return format(new Date(value), 'MMM d, yyyy');
      } catch (e) {
        return 'Invalid Date';
      }
    }
  },
];

export default function AdminArchives() {
  const [archivedItems, setArchivedItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const [carousel, announcements, events] = await Promise.all([
        api.carousel.getArchived().catch(() => []),
        api.announcements.getArchived().catch(() => []),
        api.events.getArchived().catch(() => []),
      ]);

      const items: ArchiveItem[] = [
        ...carousel.map(item => ({
          id: String(item.id),
          type: 'carousel' as const,
          title: item.altText,
          content: item.imageUrl,
          archiveDate: new Date(item.updatedAt || Date.now()),
        })),
        ...announcements.map(item => ({
          id: String(item.id),
          type: 'announcement' as const,
          title: item.title,
          content: item.content,
          archiveDate: new Date(item.updatedAt || Date.now()),
        })),
        ...events.map(item => ({
          id: String(item.id),
          type: 'event' as const,
          title: item.title,
          content: item.description,
          archiveDate: new Date(item.updatedAt || Date.now()),
        })),
      ];

      // Sort by archive date descending
      items.sort((a, b) => b.archiveDate.getTime() - a.archiveDate.getTime());
      setArchivedItems(items);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch archives",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const handleRestore = async (item: ArchiveItem) => {
    try {
      if (item.type === 'carousel') {
        await api.carousel.restore(item.id);
      } else if (item.type === 'announcement') {
        await api.announcements.restore(item.id);
      } else if (item.type === 'event') {
        await api.events.restore(item.id);
      }

      toast({
        title: "Restored",
        description: `${item.title} has been restored successfully.`,
      });
      fetchArchives();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to restore ${item.type}`,
        variant: "destructive",
      });
    }
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
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">Loading archives...</div>
          ) : archivedItems.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No archived items found.</div>
          ) : (
            <ArchivesContentTable
              columns={columns}
              data={archivedItems}
              onRestore={handleRestore}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
