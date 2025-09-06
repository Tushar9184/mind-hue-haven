import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatBot } from '@/components/ChatBot';
import { Brain, Heart, Users, Calendar, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMood } from '@/contexts/MoodContext';
import { useGame } from '@/contexts/GameContext';

export const Home = () => {
  const { currentMood, moodEmoji } = useMood();
  const { points, level, badges } = useGame();
  
  const unlockedBadges = badges.filter(badge => badge.unlocked).length;

  const features = [
    {
      icon: Brain,
      title: 'AI Mental Health Support',
      description: 'Get instant help and coping strategies from our intelligent assistant',
      link: '#chatbot'
    },
    {
      icon: Calendar,
      title: 'Book Counseling Sessions',
      description: 'Schedule appointments with professional counselors on campus',
      link: '/booking'
    },
    {
      icon: BookOpen,
      title: 'Wellness Resources',
      description: 'Access guided meditations, educational content, and self-help tools',
      link: '/resources'
    },
    {
      icon: Users,
      title: 'Peer Support Community',
      description: 'Connect with others in a safe, moderated environment',
      link: '/forum'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-mood-soft px-4 py-2 rounded-full">
          <span className="text-2xl">{moodEmoji}</span>
          <span className="text-sm font-medium">
            {currentMood === 'neutral' ? 'Welcome to your wellness journey' : `You're feeling ${currentMood} today`}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Mental Wellness Matters
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A safe, confidential space for students to access mental health support, 
          connect with peers, and build healthy coping strategies.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button className="mood-button">
            Start Conversation
          </Button>
          <Button variant="outline" asChild>
            <Link to="/booking">Book Appointment</Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="mood-card text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{points}</span>
            </div>
            <p className="text-sm text-muted-foreground">Wellness Points</p>
          </CardContent>
        </Card>
        
        <Card className="mood-card text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">Level {level}</span>
            </div>
            <p className="text-sm text-muted-foreground">Wellness Level</p>
          </CardContent>
        </Card>
        
        <Card className="mood-card text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{unlockedBadges}</span>
            </div>
            <p className="text-sm text-muted-foreground">Badges Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="mood-card hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to={feature.link}>
                  Explore →
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Chat Section */}
      <div id="chatbot" className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Start Your Wellness Conversation</h2>
          <p className="text-muted-foreground">
            Our AI assistant is trained to provide immediate support and guide you to appropriate resources
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ChatBot />
        </div>
      </div>

      {/* Emergency Notice */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-destructive mb-2">Crisis Support Available 24/7</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you're experiencing a mental health crisis, immediate help is available
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="destructive">National Crisis Helpline: 988</Button>
              <Button variant="outline">Campus Emergency: (555) 123-4567</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};