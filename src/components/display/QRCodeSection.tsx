import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, QrCode } from 'lucide-react';

export function QRCodeSection() {
  return (
      <Card className="glass-card px-1 py-1 shadow-elevated">
        <CardContent className="p-2">
          <div className="relative">
            <div className="w-20 h-20 bg-card rounded-lg flex items-center justify-center shadow-soft">
              <QrCode className="w-14 h-14 text-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 gradient-secondary rounded-full shadow-elevated">
              <Smartphone className="h-3 w-3 text-secondary-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
