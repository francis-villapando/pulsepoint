import { Announcement, Event, Poll, Feedback, CarouselImage } from '@/types/pulsepoint';

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Community Clean-Up Day This Saturday',
    content: 'Join your neighbors for our monthly community clean-up! Meet at the town square at 9 AM. Gloves and bags will be provided.',
    category: 'community' as any,
    createdAt: new Date('2026-01-20'),
    isPinned: true,
  },
  {
    id: '2',
    title: 'Water Main Maintenance Notice',
    content: 'Scheduled maintenance on Oak Street water main. Expect reduced water pressure from 10 PM to 6 AM on January 25th.',
    category: 'maintenance',
    createdAt: new Date('2026-01-19'),
  },
  {
    id: '3',
    title: 'New Playground Opening Ceremony',
    content: 'We are excited to announce the grand opening of Maple Park playground! Join us for ribbon cutting and refreshments.',
    category: 'celebration',
    createdAt: new Date('2026-01-18'),
  },
  {
    id: '4',
    title: 'Winter Storm Advisory',
    content: 'Heavy snowfall expected this weekend. Please stock up on essentials and check on elderly neighbors.',
    category: 'safety',
    createdAt: new Date('2026-01-21'),
    isPinned: true,
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Farmers Market',
    description: 'Fresh local produce, artisan goods, and live music every Saturday morning.',
    date: new Date('2026-01-25'),
    time: '8:00 AM - 1:00 PM',
    venue: 'Town Square',
    category: 'community',
  },
  {
    id: '2',
    title: 'Youth Basketball Tournament',
    description: 'Annual youth basketball tournament featuring teams from across the district.',
    date: new Date('2026-01-27'),
    time: '9:00 AM - 5:00 PM',
    venue: 'Community Sports Center',
    category: 'sports',
  },
  {
    id: '3',
    title: 'Digital Literacy Workshop',
    description: 'Free workshop on internet safety and basic computer skills for seniors.',
    date: new Date('2026-01-28'),
    time: '2:00 PM - 4:00 PM',
    venue: 'Public Library',
    category: 'education',
  },
  {
    id: '4',
    title: 'Cultural Heritage Festival',
    description: 'Celebrate our diverse community with food, music, and performances from around the world.',
    date: new Date('2026-02-01'),
    time: '11:00 AM - 8:00 PM',
    venue: 'Riverside Park',
    category: 'culture',
  },
  {
    id: '5',
    title: 'Free Health Screening',
    description: 'Blood pressure, glucose, and cholesterol screenings provided by local healthcare professionals.',
    date: new Date('2026-02-03'),
    time: '10:00 AM - 3:00 PM',
    venue: 'Community Health Center',
    category: 'health',
  },
];

export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'What should be the priority for next year\'s community budget?',
    options: [
      { id: '1a', text: 'Road repairs', votes: 145 },
      { id: '1b', text: 'Park improvements', votes: 203 },
      { id: '1c', text: 'Public safety', votes: 178 },
      { id: '1d', text: 'Youth programs', votes: 124 },
    ],
    createdAt: new Date('2026-01-15'),
    expiresAt: new Date('2026-01-30'),
    totalVotes: 650,
    isActive: true,
  },
  {
    id: '2',
    question: 'Preferred time for community meetings?',
    options: [
      { id: '2a', text: 'Weekday evenings (6-8 PM)', votes: 89 },
      { id: '2b', text: 'Saturday mornings (10 AM)', votes: 112 },
      { id: '2c', text: 'Sunday afternoons (2 PM)', votes: 67 },
    ],
    createdAt: new Date('2026-01-18'),
    expiresAt: new Date('2026-02-01'),
    totalVotes: 268,
    isActive: true,
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    content: 'The new bike lanes on Main Street are wonderful! Makes commuting so much safer.',
    category: 'praise',
    createdAt: new Date('2026-01-20'),
    status: 'reviewed',
  },
  {
    id: '2',
    content: 'Can we get more recycling bins near the playground areas?',
    category: 'suggestion',
    createdAt: new Date('2026-01-19'),
    status: 'pending',
  },
  {
    id: '3',
    content: 'Street lights on Elm Avenue have been out for two weeks now.',
    category: 'complaint',
    createdAt: new Date('2026-01-18'),
    status: 'addressed',
  },
  {
    id: '4',
    content: 'When will the community pool reopen for the season?',
    category: 'question',
    createdAt: new Date('2026-01-17'),
    status: 'reviewed',
  },
];

export const mockCarouselImages: CarouselImage[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=400&fit=crop',
    altText: 'Community Clean-Up Day 2026',
    uploadDate: new Date('2026-01-20'),
    isActive: true,
    eventTitle: 'Community Clean-Up Day',
    eventDate: new Date('2026-01-17'),
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
    altText: 'Farmers Market Opening',
    uploadDate: new Date('2026-01-15'),
    isActive: true,
    eventTitle: 'Farmers Market Opening',
    eventDate: new Date('2026-01-10'),
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    altText: 'Youth Basketball Tournament Finals',
    uploadDate: new Date('2026-01-10'),
    isActive: true,
    eventTitle: 'Youth Basketball Tournament Finals',
    eventDate: new Date('2026-01-05'),
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    altText: 'Digital Literacy Workshop',
    uploadDate: new Date('2026-01-05'),
    isActive: true,
    eventTitle: 'Digital Literacy Workshop',
    eventDate: new Date('2025-12-28'),
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=400&fit=crop',
    altText: 'Cultural Heritage Festival',
    uploadDate: new Date('2025-12-25'),
    isActive: true,
    eventTitle: 'Cultural Heritage Festival',
    eventDate: new Date('2025-12-20'),
  },
];
