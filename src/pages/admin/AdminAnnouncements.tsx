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
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    category: '',
    isPinned: false
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setAnnouncementData({
      title: (e.target as any).title.value,
      content: (e.target as any).content.value,
      category: (e.target as any).category.value,
      isPinned: (e.target as any).pinned.checked
    });
    setIsOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate edit submission
    setIsEditOpen(false);
    setIsUpdateConfirmationOpen(true);
  };

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
            <Button variant="pulse" size="lg" className="ml-auto">
              <Plus className="h-5 w-5 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
            <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create Announcement</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Enter announcement title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" placeholder="Write your announcement..." rows={4} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community</SelectItem>
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
                <Switch id="pinned" name="pinned" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="pulse" type="submit">Create Announcement</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <div></div>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Update Announcement</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4" onSubmit={handleEditSubmit}>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" name="title" placeholder="Enter announcement title" defaultValue={editingAnnouncement?.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea id="edit-content" name="content" placeholder="Write your announcement..." rows={4} defaultValue={editingAnnouncement?.content} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select name="category" defaultValue={editingAnnouncement?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="edit-pinned">Pin Announcement</Label>
                  <p className="text-xs text-muted-foreground">Show at the top of the display</p>
                </div>
                <Switch id="edit-pinned" name="pinned" defaultChecked={editingAnnouncement?.isPinned} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button variant="pulse" type="submit">Update Announcement</Button>
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
            onEdit={(item) => {
              setEditingAnnouncement(item);
              setIsEditOpen(true);
            }}
            onDelete={(item) => console.log('Archive announcement:', item)}
            editTitle="Update Announcement"
            editDescription="Are you sure you want to update this announcement? This will update the content displayed to the community."
          />
        </CardContent>
      </Card>

      {/* Creation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Announcement Created Successfully!"
        description={`Your announcement "${announcementData.title}" has been published to the community display.`}
        onConfirm={() => setIsConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />

      {/* Update Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isUpdateConfirmationOpen}
        onOpenChange={setIsUpdateConfirmationOpen}
        title="Announcement Updated Successfully!"
        description={`Your announcement "${editingAnnouncement?.title}" has been updated in the community display.`}
        onConfirm={() => setIsUpdateConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />
    </div>
  );
}
