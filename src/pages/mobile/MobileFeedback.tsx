import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Send, Lightbulb, AlertCircle, ThumbsUp, HelpCircle } from 'lucide-react';

const categories = [
  { value: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'text-primary' },
  { value: 'complaint', label: 'Complaint', icon: AlertCircle, color: 'text-destructive' },
  { value: 'praise', label: 'Praise', icon: ThumbsUp, color: 'text-pulse-success' },
  { value: 'question', label: 'Question', icon: HelpCircle, color: 'text-pulse-info' },
];

export default function MobileFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && message.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <Card className="text-center py-8">
        <CardContent className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow-primary">
            <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-display font-semibold">Thank You!</h2>
          <p className="text-muted-foreground">
            Your feedback has been submitted and will be reviewed by our team.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSubmitted(false);
              setCategory('');
              setMessage('');
            }}
          >
            Submit Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-display font-semibold">Share Your Feedback</h2>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left
                      ${category === cat.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea 
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts with us..."
                rows={5}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {message.length}/500 characters
              </p>
            </div>

            <Button 
              type="submit" 
              variant="pulse" 
              className="w-full"
              disabled={!category || !message.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Your feedback is anonymous and helps us improve our community services.
      </p>
    </div>
  );
}
