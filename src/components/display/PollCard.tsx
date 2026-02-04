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
  return (
    <Card className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-[1.02] group ${isDisplay ? 'p-3' : 'p-2'} w-[400px] max-w-full h-auto max-h-[300px] overflow-y-auto`}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <div className="p-1.5 rounded-lg gradient-primary">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className={`${isDisplay ? 'text-lg' : 'text-base'} font-display group-hover:text-primary transition-colors line-clamp-1`}>
              {poll.question}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>Ends {format(poll.expiresAt, 'MMM d')}</span>
              <span>•</span>
              <span>{poll.totalVotes} votes</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;

          return (
            <div key={option.id} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium line-clamp-1">{option.text}</span>
                <span className="text-muted-foreground">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-1.5" />
            </div>
          );
        })}
        
        <div className="flex items-center justify-center gap-1 text-xs text-pulse-success pt-1">
          <span>Current voting statistics</span>
        </div>
      </CardContent>
    </Card>
  );
}
