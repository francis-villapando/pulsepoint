export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'safety' | 'maintenance' | 'celebration';
  createdAt: Date;
  expiresAt?: Date;
  isPinned?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  venue: string;
  category: 'community' | 'sports' | 'education' | 'culture' | 'health';
  imageUrl?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: Date;
  expiresAt: Date;
  totalVotes: number;
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Feedback {
  id: string;
  content: string;
  category: 'suggestion' | 'complaint' | 'praise' | 'question';
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'addressed';
}

export type ViewMode = 'display' | 'admin' | 'mobile';
