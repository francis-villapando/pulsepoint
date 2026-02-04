import { useState } from 'react';
import { mockFeedback } from '@/data/mockData';
import { FeedbackContentTable } from '@/components/admin/FeedbackContentTable';
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
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">All Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <FeedbackContentTable 
            columns={columns}
            data={mockFeedback}
            onEdit={(item) => {
              // Handle feedback status update through dropdown
              console.log('Update feedback status:', item);
            }}
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
