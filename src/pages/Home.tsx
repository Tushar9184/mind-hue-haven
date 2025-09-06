import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatBot } from '@/components/ChatBot';
import { Brain, Heart, Users, Calendar, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMood } from '@/contexts/MoodContext';
import { useGame } from '@/contexts/GameContext';
import { MoodJournal } from '@/components/MoodJournal';
import { BreathingCircle } from '@/components/BreathingCircle';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 bg-mood-soft px-4 py-2 rounded-full"
        >
          <span className="text-2xl">{moodEmoji}</span>
          <span className="text-sm font-medium">
            {currentMood === 'neutral' ? 'Welcome to your wellness journey' : `You're feeling ${currentMood} today`}
          </span>
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Mental Wellness Matters
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A safe, confidential space for students to access mental health support, 
          connect with peers, and build healthy coping strategies.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="mood-button">
              Start Conversation
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" asChild>
              <Link to="/booking">Book Appointment</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Award, label: "Wellness Points", value: points, delay: 0.1 },
          { icon: Heart, label: "Wellness Level", value: `Level ${level}`, delay: 0.2 },
          { icon: Award, label: "Badges Earned", value: unlockedBadges, delay: 0.3 }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="mood-card text-center">
              <CardContent className="pt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: stat.delay + 0.2, type: "spring" }}
                  className="flex items-center justify-center gap-2 mb-2"
                >
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Wellness Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <MoodJournal />
        </div>
        <div className="space-y-6">
          <BreathingCircle />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="mood-card transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-primary/10 rounded-2xl"
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild className="w-full justify-start hover:translate-x-1 transition-transform">
                  <Link to={feature.link}>
                    Explore →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
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