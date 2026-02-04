import { Poll } from '@/types/pulsepoint';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface PollDialogProps {
  poll: Poll;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export function PollDialog({ poll, isOpen, onOpenChange, children }: PollDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-display">{poll.question}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="h-4 w-4" />
                <span>Ends {format(poll.expiresAt, 'MMM d, yyyy')}</span>
                <span>•</span>
                <span>{poll.totalVotes} votes</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            {poll.options.map((option) => {
              const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;

              return (
                <div key={option.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{option.text}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-medium">{percentage}%</span>
                      <span className="text-xs text-muted-foreground">({option.votes} votes)</span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-pulse-success">
            <CheckCircle2 className="h-4 w-4" />
            <span>Current voting statistics</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
