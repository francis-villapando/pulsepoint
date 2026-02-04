import { Hand, ChevronLeft, ChevronRight } from 'lucide-react';

export function GestureHint() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card rounded-full px-8 py-4 shadow-elevated">
      <div className="flex items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <ChevronLeft className="h-5 w-5 gesture-hint" />
          <span className="text-sm font-medium">Swipe  up and down to navigate</span>
          <ChevronRight className="h-5 w-5 gesture-hint" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2">
          <Hand className="h-5 w-5" />
          <span className="text-sm font-medium">Tap to select</span>
        </div>
      </div>
    </div>
  );
}
