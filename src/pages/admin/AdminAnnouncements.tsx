import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Announcement } from '@/types/pulsepoint';
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
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const columns = [
  {
    key: 'title', label: 'Title', render: (value: string, row: any) => (
      <div className="flex items-center gap-2">
        {row.isPinned && <Pin className="h-4 w-4 text-secondary" />}
        <span className="font-medium">{value}</span>
      </div>
    )
  },
  {
    key: 'category', label: 'Category', render: (value: string) => (
      <Badge variant="outline" className="capitalize">{value}</Badge>
    )
  },
  {
    key: 'createdAt', label: 'Created', render: (value: Date) => {
      try {
        return format(new Date(value), 'MMM d, yyyy');
      } catch (e) {
        return 'Invalid Date';
      }
    }
  },
  {
    key: 'isPinned', label: 'Pinned', render: (value: boolean) => (
      <Badge className={value ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
        {value ? 'Pinned' : 'Normal'}
      </Badge>
    )
  },
];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const data = await api.announcements.getAll();
      setAnnouncements(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const newAnnouncement = {
      title: target.title.value,
      content: target.content.value,
      category: target.category.value,
      isPinned: target.pinned.checked
    };

    try {
      await api.announcements.create(newAnnouncement as any); // using any to bypass Omit check for now if strict
      toast({
        title: "Success",
        description: "Announcement created successfully",
      });
      fetchAnnouncements();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive",
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;

    const target = e.target as any;
    const updatedData = {
      title: target.title.value,
      content: target.content.value,
      category: target.category.value,
      isPinned: target.pinned.checked
    };

    try {
      await api.announcements.update(editingAnnouncement.id, updatedData);
      toast({
        title: "Success",
        description: "Announcement updated successfully",
      });
      fetchAnnouncements();
      setIsEditOpen(false);
      setEditingAnnouncement(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (item: Announcement) => {
    try {
      await api.announcements.delete(item.id);
      toast({
        title: "Archived",
        description: "Announcement moved to archives successfully",
      });
      fetchAnnouncements();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive announcement",
        variant: "destructive",
      });
    }
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
                <Select name="category" required>
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
                <p className="text-xs text-muted-foreground">Please select a category for this announcement</p>
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
                <Input id="edit-title" name="title" placeholder="Enter announcement title" defaultValue={editingAnnouncement?.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea id="edit-content" name="content" placeholder="Write your announcement..." rows={4} defaultValue={editingAnnouncement?.content} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select name="category" defaultValue={editingAnnouncement?.category} required>
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
            data={announcements}
            onEdit={(item) => {
              setEditingAnnouncement(item);
              setIsEditOpen(true);
            }}
            onDelete={handleDelete}
            editTitle="Update Announcement"
            editDescription="Are you sure you want to update this announcement? This will update the content displayed to the community."
          />
        </CardContent>
      </Card>
    </div>
  );
}
