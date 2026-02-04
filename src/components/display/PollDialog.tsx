import { Poll } from '@/types/pulsepoint';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';

interface PollDialogProps {
  poll: Poll;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  onVote?: (pollId: string, optionId: string) => void;
  hasVoted?: boolean;
}

export function PollDialog({ poll, isOpen, onOpenChange, children, onVote, hasVoted = false }: PollDialogProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted || !onVote) return;
    setSelectedOption(optionId);
  };

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(poll.id, selectedOption);
      setSelectedOption(null);
      setConfirmOpen(true);
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    onOpenChange(false);
  };

  return (
    <>
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
                const isSelected = selectedOption === option.id;

                return (
                  <div
                    key={option.id}
                    className={`space-y-2 cursor-pointer ${hasVoted ? 'opacity-50' : ''}`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`p-2 rounded-lg transition-all ${isSelected ? 'bg-primary/10' : 'bg-muted/50'} w-full`}>
                        <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!hasVoted && onVote && (
              <Button
                variant="pulse"
                onClick={handleVote}
                disabled={!selectedOption}
                className="w-full"
              >
                Submit Vote
              </Button>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Click options to select your choice</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Vote Cast Successfully"
        description="Your vote has been recorded. Thank you for participating!"
        onConfirm={handleConfirmClose}
        confirmText="OK"
        type="success"
      />
    </>
  );
}
