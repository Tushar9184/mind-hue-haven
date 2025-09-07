export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  likes: number;
  replies: number;
  timestamp: Date;
  isAnonymous: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  category: string;
  duration?: string;
  thumbnail: string;
  url: string;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: 'counselor' | 'helpline';
  status: 'available' | 'booked' | 'completed';
  counselor?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  joinDate: Date;
  phq9Score?: number;
  gad7Score?: number;
  mood: string;
  streakDays: number;
}

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hi there! I'm here to help with your mental wellness. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
    suggestions: ['I feel anxious', 'I\'m feeling sad', 'I need study tips', 'I can\'t sleep']
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Struggling with exam anxiety - any tips?',
    content: 'Finals are coming up and I can barely sleep. Has anyone found effective ways to manage study stress?',
    author: 'StudentHelper23',
    tags: ['anxiety', 'academicStress', 'sleep'],
    likes: 12,
    replies: 8,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isAnonymous: true
  },
  {
    id: '2',
    title: 'Morning meditation routine that changed my life',
    content: 'Wanted to share a simple 10-minute routine that has really helped my mental clarity...',
    author: 'MindfulMornings',
    tags: ['meditation', 'routine', 'morningRituals'],
    likes: 24,
    replies: 15,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isAnonymous: false
  },
  {
    id: '3',
    title: 'Feeling overwhelmed with coursework',
    content: 'Does anyone else feel like they\'re drowning in assignments? Looking for support and maybe study buddies.',
    author: 'Anonymous',
    tags: ['overwhelmed', 'academicStress', 'support'],
    likes: 8,
    replies: 6,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isAnonymous: true
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Guided Meditation for Anxiety',
    description: 'A calming 10-minute meditation to help reduce anxiety and stress',
    type: 'audio',
    category: 'Meditation',
    duration: '10 min',
    thumbnail: '🧘‍♀️',
    url: '#'
  },
  {
    id: '2',
    title: 'Understanding Depression: A Student Guide',
    description: 'Comprehensive guide on recognizing and coping with depression in college',
    type: 'guide',
    category: 'Mental Health Education',
    thumbnail: '📖',
    url: '#'
  },
  {
    id: '3',
    title: 'Sleep Hygiene for Better Rest',
    description: 'Video guide on creating healthy sleep habits for students',
    type: 'video',
    category: 'Sleep & Wellness',
    duration: '15 min',
    thumbnail: '😴',
    url: '#'
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Audio guide for releasing physical tension and stress',
    type: 'audio',
    category: 'Relaxation',
    duration: '20 min',
    thumbnail: '💆‍♀️',
    url: '#'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: new Date(2024, 0, 15),
    time: '10:00 AM',
    type: 'counselor',
    status: 'available',
    counselor: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    date: new Date(2024, 0, 15),
    time: '2:00 PM',
    type: 'counselor',
    status: 'available',
    counselor: 'Dr. Mike Chen'
  },
  {
    id: '3',
    date: new Date(2024, 0, 16),
    time: '11:00 AM',
    type: 'counselor',
    status: 'available',
    counselor: 'Dr. Sarah Johnson'
  }
];

export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    username: 'StudentHelper23',
    joinDate: new Date(2023, 8, 15),
    phq9Score: 12,
    gad7Score: 8,
    mood: 'anxious',
    streakDays: 5
  },
  {
    id: '2',
    username: 'MindfulMornings',
    joinDate: new Date(2023, 6, 20),
    phq9Score: 6,
    gad7Score: 4,
    mood: 'calm',
    streakDays: 23
  }
];

export const mockAnalytics = {
  dailyUsers: [
    { date: '2024-01-01', users: 45 },
    { date: '2024-01-02', users: 52 },
    { date: '2024-01-03', users: 48 },
    { date: '2024-01-04', users: 61 },
    { date: '2024-01-05', users: 55 },
    { date: '2024-01-06', users: 67 },
    { date: '2024-01-07', users: 59 }
  ],
  moodDistribution: [
    { mood: 'Happy', count: 23, percentage: 35 },
    { mood: 'Calm', count: 18, percentage: 27 },
    { mood: 'Neutral', count: 12, percentage: 18 },
    { mood: 'Anxious', count: 8, percentage: 12 },
    { mood: 'Sad', count: 5, percentage: 8 }
  ],
  sessionsBooked: {
    thisWeek: 24,
    lastWeek: 18,
    increase: 33
  }
};