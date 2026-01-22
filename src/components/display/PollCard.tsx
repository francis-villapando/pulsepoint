import { useState } from 'react';
import { Poll } from '@/types/pulsepoint';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface PollCardProps {
  poll: Poll;
  onVote?: (pollId: string, optionId: string) => void;
  hasVoted?: boolean;
  isDisplay?: boolean;
}

export function PollCard({ poll, onVote, hasVoted = false, isDisplay }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(hasVoted);

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(poll.id, selectedOption);
      setVoted(true);
    }
  };

  return (
    <Card className={`overflow-hidden ${isDisplay ? 'p-4' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg gradient-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <CardTitle className={`${isDisplay ? 'text-xl' : 'text-lg'} font-display`}>
              {poll.question}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>Ends {format(poll.expiresAt, 'MMM d, yyyy')}</span>
              <span>•</span>
              <span>{poll.totalVotes} votes</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id}>
              {voted ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className={isSelected ? 'font-medium text-primary' : ''}>{option.text}</span>
                    <span className="text-muted-foreground">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ) : (
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`
                    w-full text-left p-3 rounded-lg border-2 transition-all
                    ${isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div className={`
                      h-4 w-4 rounded-full border-2 transition-all
                      ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'}
                    `}>
                      {isSelected && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className={isSelected ? 'font-medium' : ''}>{option.text}</span>
                  </div>
                </button>
              )}
            </div>
          );
        })}
        
        {!voted && (
          <Button 
            onClick={handleVote} 
            disabled={!selectedOption}
            variant="pulse"
            className="w-full mt-4"
          >
            Submit Vote
          </Button>
        )}
        
        {voted && (
          <div className="flex items-center justify-center gap-2 text-sm text-pulse-success pt-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Thank you for voting!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
