import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Event } from '@/types/pulsepoint';
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
import { Plus } from 'lucide-react';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const columns = [
  {
    key: 'title', label: 'Title', render: (value: string) => (
      <span className="font-medium">{value}</span>
    )
  },
  {
    key: 'category', label: 'Category', render: (value: string) => (
      <Badge variant="outline" className="capitalize">{value}</Badge>
    )
  },
  {
    key: 'date', label: 'Date', render: (value: Date) => {
      try {
        return format(new Date(value), 'MMM d, yyyy');
      } catch (e) {
        return 'Invalid Date';
      }
    }
  },
  { key: 'time', label: 'Time', render: (value: string) => value },
  { key: 'venue', label: 'Venue', render: (value: string) => value },
];

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    try {
      const data = await api.events.getAll();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const newEvent = {
      title: target.title.value,
      description: target.description.value,
      date: target.date.value, // API schema transform handles string -> Date
      time: target.time.value,
      venue: target.venue.value,
      category: target.category.value
    };

    try {
      await api.events.create(newEvent as any);
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      fetchEvents();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const target = e.target as any;
    const updatedData = {
      title: target.title.value,
      description: target.description.value,
      date: target.date.value,
      time: target.time.value,
      venue: target.venue.value,
      category: target.category.value
    };

    try {
      await api.events.update(editingEvent.id, updatedData);
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
      fetchEvents();
      setIsEditOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (item: Event) => {
    try {
      await api.events.delete(item.id);
      toast({
        title: "Deleted",
        description: "Event removed successfully",
      });
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Events</h1>
          <p className="text-muted-foreground">Create and manage community events</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="pulse" size="lg" className="ml-auto">
              <Plus className="h-5 w-5 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create Event</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Enter event title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Describe your event..." rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" required />
                <p className="text-xs text-muted-foreground">Please enter the event time in HH:MM format</p>
              </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" placeholder="Enter event venue" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Please select a category for this event</p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="pulse" type="submit">Create Event</Button>
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
              <DialogTitle className="font-display text-xl">Update Event</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4" onSubmit={handleEditSubmit}>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" name="title" placeholder="Enter event title" defaultValue={editingEvent?.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" name="description" placeholder="Describe your event..." rows={4} defaultValue={editingEvent?.description} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input id="edit-date" name="date" type="date" defaultValue={editingEvent?.date ? new Date(editingEvent.date).toISOString().split('T')[0] : ''} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input id="edit-time" name="time" type="text" placeholder="e.g., 8:00 AM - 1:00 PM" defaultValue={editingEvent?.time} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-venue">Venue</Label>
                <Input id="edit-venue" name="venue" placeholder="Enter event venue" defaultValue={editingEvent?.venue} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select name="category" defaultValue={editingEvent?.category} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button variant="pulse" type="submit">Update Event</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentTable
            columns={columns}
            data={events}
            onEdit={(item) => {
              setEditingEvent(item);
              setIsEditOpen(true);
            }}
            onDelete={handleDelete}
            editTitle="Update Event"
            editDescription="Are you sure you want to update this event? This will update the details displayed to the community."
          />
        </CardContent>
      </Card>
    </div>
  );
}
