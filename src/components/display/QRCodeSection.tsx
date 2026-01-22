import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, QrCode } from 'lucide-react';

export function QRCodeSection() {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-card rounded-xl flex items-center justify-center shadow-soft">
              <QrCode className="w-24 h-24 text-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 gradient-secondary rounded-full shadow-elevated">
              <Smartphone className="h-4 w-4 text-secondary-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-display font-semibold mb-2">Connect with Your Phone</h3>
            <p className="text-muted-foreground">
              Scan this QR code to access community updates, participate in polls, and submit feedback from your smartphone.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
