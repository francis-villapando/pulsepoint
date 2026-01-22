import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'gradient-primary'
}: StatsCardProps) {
  return (
    <Card className="shadow-soft hover:shadow-elevated transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-display font-bold">{value}</p>
            {change && (
              <p className={cn(
                'text-sm mt-2',
                changeType === 'positive' && 'text-pulse-success',
                changeType === 'negative' && 'text-destructive',
                changeType === 'neutral' && 'text-muted-foreground'
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconColor}`}>
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
