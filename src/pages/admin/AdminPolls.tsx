import { useState } from 'react';
import { mockPolls } from '@/data/mockData';
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
import { Plus, Minus } from 'lucide-react';
import { format } from 'date-fns';

const columns = [
  { key: 'question', label: 'Question', render: (value: string) => (
    <span className="font-medium">{value}</span>
  )},
  { key: 'totalVotes', label: 'Total Votes', render: (value: number) => (
    <Badge variant="outline">{value.toLocaleString()}</Badge>
  )},
  { key: 'createdAt', label: 'Created', render: (value: Date) => format(value, 'MMM d, yyyy')},
  { key: 'expiresAt', label: 'Expires', render: (value: Date) => format(value, 'MMM d, yyyy')},
  { key: 'isActive', label: 'Status', render: (value: boolean) => (
    <Badge className={value ? 'bg-pulse-success text-white' : 'bg-muted text-muted-foreground'}>
      {value ? 'Active' : 'Expired'}
    </Badge>
  )},
];

export default function AdminPolls() {
  const [isOpen, setIsOpen] = useState(false);
  const [optionCount, setOptionCount] = useState(4);

  const addOption = () => {
    if (optionCount < 10) setOptionCount(optionCount + 1);
  };

  const removeOption = () => {
    if (optionCount > 2) setOptionCount(optionCount - 1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Polls</h1>
          <p className="text-muted-foreground">Create and manage community polls</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="pulse" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              New Poll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create Poll</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="question">Poll Question</Label>
                <Textarea id="question" placeholder="Enter your poll question..." rows={3} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removeOption}
                      disabled={optionCount <= 2}
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      disabled={optionCount >= 10}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: optionCount }, (_, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`option${index + 1}`}>Option {index + 1}</Label>
                      <Input 
                        id={`option${index + 1}`} 
                        placeholder={`Option ${index + 1}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="pulse">Create Poll</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">All Polls</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentTable 
            columns={columns}
            data={mockPolls}
            onEdit={() => {}}
            onDelete={() => {}}
            onView={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}