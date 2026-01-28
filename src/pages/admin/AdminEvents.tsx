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
            <Button variant="pulse" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create Event</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your event..." rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="text" placeholder="e.g., 8:00 AM - 1:00 PM" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" placeholder="Enter event venue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
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
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="pulse">Create Event</Button>
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
            onEdit={() => {}}
            onDelete={() => {}}
            onView={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}