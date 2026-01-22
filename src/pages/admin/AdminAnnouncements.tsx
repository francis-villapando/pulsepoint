import { useState } from 'react';
import { mockAnnouncements } from '@/data/mockData';
import { ContentTable } from '@/components/admin/ContentTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Pin } from 'lucide-react';
import { format } from 'date-fns';

const columns = [
  { key: 'title', label: 'Title', render: (value: string, row: any) => (
    <div className="flex items-center gap-2">
      {row.isPinned && <Pin className="h-4 w-4 text-secondary" />}
      <span className="font-medium">{value}</span>
    </div>
  )},
  { key: 'category', label: 'Category', render: (value: string) => (
    <Badge variant="outline" className="capitalize">{value}</Badge>
  )},
  { key: 'createdAt', label: 'Created', render: (value: Date) => format(value, 'MMM d, yyyy')},
  { key: 'isPinned', label: 'Pinned', render: (value: boolean) => (
    <Badge className={value ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
      {value ? 'Pinned' : 'Normal'}
    </Badge>
  )},
];

export default function AdminAnnouncements() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Announcements</h1>
          <p className="text-muted-foreground">Create and manage community announcements</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="pulse" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create Announcement</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter announcement title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Write your announcement..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pinned">Pin Announcement</Label>
                  <p className="text-xs text-muted-foreground">Show at the top of the display</p>
                </div>
                <Switch id="pinned" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="pulse">Publish</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">All Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentTable 
            columns={columns}
            data={mockAnnouncements}
            onEdit={() => {}}
            onDelete={() => {}}
            onView={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
