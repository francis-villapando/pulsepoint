import { useState } from 'react';
import { mockFeedback } from '@/data/mockData';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, MessageSquare, CheckCircle, AlertCircle, ThumbsUp, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';

const columns = [
  { key: 'content', label: 'Feedback', render: (value: string) => (
    <span className="font-medium line-clamp-2">{value}</span>
  )},
  { key: 'category', label: 'Type', render: (value: string) => (
    <Badge variant="outline" className="capitalize">
      {value}
    </Badge>
  )},
  { key: 'createdAt', label: 'Submitted', render: (value: Date) => format(value, 'MMM d, yyyy')},
  { key: 'status', label: 'Status', render: (value: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500', text: 'Pending' },
      reviewed: { color: 'bg-blue-500', text: 'Reviewed' },
      addressed: { color: 'bg-green-500', text: 'Addressed' },
    };
    const config = statusConfig[value as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  }},
];

const categoryConfig = {
  praise: { icon: ThumbsUp, color: 'text-pulse-success' },
  suggestion: { icon: MessageSquare, color: 'text-pulse-info' },
  complaint: { icon: AlertCircle, color: 'text-destructive' },
  question: { icon: HelpCircle, color: 'text-pulse-warning' },
};

export default function AdminFeedbacks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Community Feedback</h1>
          <p className="text-muted-foreground">Manage and respond to community feedback</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="pulse" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add Response
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Add Response</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="response">Response</Label>
                <Textarea id="response" placeholder="Write your response to the feedback..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="addressed">Addressed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="pulse">Save Response</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Feedback</p>
                <p className="text-2xl font-bold">{mockFeedback.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-info text-info-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending</p>
                <p className="text-2xl font-bold">
                  {mockFeedback.filter(f => f.status === 'pending').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Addressed</p>
                <p className="text-2xl font-bold">
                  {mockFeedback.filter(f => f.status === 'addressed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Reviewed</p>
                <p className="text-2xl font-bold">
                  {mockFeedback.filter(f => f.status === 'reviewed').length}
                </p>
              </div>
              <HelpCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">All Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentTable 
            columns={columns}
            data={mockFeedback}
            onEdit={() => {}}
            onDelete={() => {}}
            onView={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}