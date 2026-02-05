import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    iconColor?: string;
}

export function StatsCard({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    iconColor
}: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                            <h2 className="text-3xl font-bold font-display">{value}</h2>
                            <span className={cn(
                                "text-xs font-medium px-1.5 py-0.5 rounded-full",
                                changeType === 'positive' && "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
                                changeType === 'negative' && "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
                                changeType === 'neutral' && "text-muted-foreground bg-muted"
                            )}>
                                {change}
                            </span>
                        </div>
                    </div>
                    <div className={cn(
                        "p-3 rounded-xl",
                        iconColor || "gradient-primary shadow-glow-primary"
                    )}>
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
