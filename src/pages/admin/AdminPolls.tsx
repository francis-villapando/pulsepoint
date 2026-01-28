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
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);
  const [optionCount, setOptionCount] = useState(4);
  const [pollData, setPollData] = useState({
    question: '',
    options: ['', '', '', ''],
    startDate: '',
    endDate: ''
  });
  const [editingPoll, setEditingPoll] = useState<any>(null);
  const [editingOptionCount, setEditingOptionCount] = useState(4);

  const addOption = () => {
    if (optionCount < 10) setOptionCount(optionCount + 1);
  };

  const removeOption = () => {
    if (optionCount > 2) setOptionCount(optionCount - 1);
  };

  const addEditOption = () => {
    if (editingOptionCount < 10) setEditingOptionCount(editingOptionCount + 1);
  };

  const removeEditOption = () => {
    if (editingOptionCount > 2) setEditingOptionCount(editingOptionCount - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    const formData = new FormData(e.target as HTMLFormElement);
    const options = Array.from({ length: optionCount }, (_, index) => 
      formData.get(`option${index + 1}`) as string
    ).filter(Boolean);
    
    setPollData({
      question: formData.get('question') as string,
      options,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string
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
          <h1 className="text-3xl font-display font-bold">Polls</h1>
          <p className="text-muted-foreground">Create and manage community polls</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="pulse" size="lg" className="ml-auto">
              <Plus className="h-5 w-5 mr-2" />
              New Poll
            </Button>
          </DialogTrigger>
            <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create Poll</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="question">Poll Question</Label>
                <Textarea id="question" name="question" placeholder="Enter your poll question..." rows={3} required />
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
                      type='button'
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      disabled={optionCount >= 10}
                      type='button'
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: optionCount }, (_, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`option${index + 1}`}>Option {index + 1}</Label>
                      <Input 
                        id={`option${index + 1}`} 
                        name={`option${index + 1}`}
                        placeholder={`Option ${index + 1}`}
                        required 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="date" required />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)} type="button">Cancel</Button>
                <Button variant="pulse" type='submit'>Create Poll</Button>
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
              <DialogTitle className="font-display text-xl">Update Poll</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4" onSubmit={handleEditSubmit}>
              <div className="space-y-2">
                <Label htmlFor="edit-question">Poll Question</Label>
                <Textarea id="edit-question" name="question" placeholder="Enter your poll question..." rows={3} defaultValue={editingPoll?.question} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removeEditOption}
                      disabled={editingOptionCount <= 2}
                      type='button'
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addEditOption}
                      disabled={editingOptionCount >= 10}
                      type='button'
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: editingOptionCount }, (_, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`edit-option${index + 1}`}>Option {index + 1}</Label>
                      <Input 
                        id={`edit-option${index + 1}`} 
                        name={`option${index + 1}`}
                        placeholder={`Option ${index + 1}`}
                        defaultValue={editingPoll?.options?.[index]?.text || ''}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input id="edit-startDate" name="startDate" type="date" defaultValue={editingPoll?.startDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input id="edit-endDate" name="endDate" type="date" defaultValue={editingPoll?.endDate} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)} type="button">Cancel</Button>
                <Button variant="pulse" type='submit'>Update Poll</Button>
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
            onEdit={(item) => {
              setEditingPoll(item);
              setEditingOptionCount(item.options?.length || 4);
              setIsEditOpen(true);
            }}
            onDelete={(item) => console.log('Archive poll:', item)}
            editTitle="Update Poll"
            editDescription="Are you sure you want to update this poll? This will update the question and options displayed to the community."
          />
        </CardContent>
      </Card>

      {/* Creation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Poll Created Successfully!"
        description={`Your poll "${pollData.question}" has been published to the community display.`}
        onConfirm={() => setIsConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />

      {/* Update Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isUpdateConfirmationOpen}
        onOpenChange={setIsUpdateConfirmationOpen}
        title="Poll Updated Successfully!"
        description={`Your poll "${editingPoll?.question}" has been updated in the community display.`}
        onConfirm={() => setIsUpdateConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />
    </div>
  );
}
