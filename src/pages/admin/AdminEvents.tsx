import { useState } from 'react';
import { mockEvents } from '@/data/mockData';
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
import { format } from 'date-fns';

const columns = [
  { key: 'title', label: 'Title', render: (value: string) => (
    <span className="font-medium">{value}</span>
  )},
  { key: 'category', label: 'Category', render: (value: string) => (
    <Badge variant="outline" className="capitalize">{value}</Badge>
  )},
  { key: 'date', label: 'Date', render: (value: Date) => format(value, 'MMM d, yyyy')},
  { key: 'time', label: 'Time', render: (value: string) => value },
  { key: 'venue', label: 'Venue', render: (value: string) => value },
];

export default function AdminEvents() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: ''
  });
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setEventData({
      title: (e.target as any).title.value,
      description: (e.target as any).description.value,
      date: (e.target as any).date.value,
      time: (e.target as any).time.value,
      venue: (e.target as any).venue.value,
      category: (e.target as any).category.value
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
                  <Input id="time" name="time" type="text" placeholder="e.g., 8:00 AM - 1:00 PM" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" placeholder="Enter event venue" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category">
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
                <Input id="edit-title" name="title" placeholder="Enter event title" defaultValue={editingEvent?.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" name="description" placeholder="Describe your event..." rows={4} defaultValue={editingEvent?.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input id="edit-date" name="date" type="date" defaultValue={editingEvent?.date} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input id="edit-time" name="time" type="text" placeholder="e.g., 8:00 AM - 1:00 PM" defaultValue={editingEvent?.time} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-venue">Venue</Label>
                <Input id="edit-venue" name="venue" placeholder="Enter event venue" defaultValue={editingEvent?.venue} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select name="category" defaultValue={editingEvent?.category}>
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
            data={mockEvents}
            onEdit={(item) => {
              setEditingEvent(item);
              setIsEditOpen(true);
            }}
            onDelete={(item) => console.log('Archive event:', item)}
            editTitle="Update Event"
            editDescription="Are you sure you want to update this event? This will update the details displayed to the community."
          />
        </CardContent>
      </Card>

      {/* Creation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Event Created Successfully!"
        description={`Your event "${eventData.title}" has been published to the community display.`}
        onConfirm={() => setIsConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />

      {/* Update Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isUpdateConfirmationOpen}
        onOpenChange={setIsUpdateConfirmationOpen}
        title="Event Updated Successfully!"
        description={`Your event "${editingEvent?.title}" has been updated in the community display.`}
        onConfirm={() => setIsUpdateConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />
    </div>
  );
}
