import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Heart, Calendar } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useJournal } from '@/contexts/JournalContext';

export const WellnessScore = () => {
  const { points, level, tasks } = useGame();
  const { entries, getEntriesForPeriod } = useJournal();

  // Calculate wellness score based on multiple factors
  const calculateWellnessScore = () => {
    const recentEntries = getEntriesForPeriod(7);
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const journalStreak = Math.min(recentEntries.length, 7);

    // Weighted scoring system
    const taskScore = (completedTasks / totalTasks) * 40; // 40% weight
    const levelScore = (level / 10) * 30; // 30% weight  
    const journalScore = (journalStreak / 7) * 30; // 30% weight

    return Math.round(taskScore + levelScore + journalScore);
  };

  const wellnessScore = calculateWellnessScore();
  const recentEntries = getEntriesForPeriod(7);
  const completedTasks = tasks.filter(task => task.completed).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent wellness habits! 🌟";
    if (score >= 60) return "Good progress on your wellness journey! 🌱";
    if (score >= 40) return "Keep building those healthy habits! 💪";
    return "Let's start with small steps today! 🌸";
  };

  return (
    <Card className="mood-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Wellness Score</CardTitle>
            <CardDescription>Your overall mental wellness progress</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`text-6xl font-bold ${getScoreColor(wellnessScore)}`}
          >
            {wellnessScore}
          </motion.div>
          <Progress value={wellnessScore} className="w-full h-3" />
          <p className="text-sm text-muted-foreground">{getScoreMessage(wellnessScore)}</p>
        </div>

        {/* Contributing Factors */}
        <div className="grid grid-cols-1 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between p-3 bg-mood-soft rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Tasks Completed</span>
            </div>
            <span className="text-sm font-bold">{completedTasks}/{tasks.length}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between p-3 bg-mood-soft rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Current Level</span>
            </div>
            <span className="text-sm font-bold">Level {level}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between p-3 bg-mood-soft rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Journal Entries (7d)</span>
            </div>
            <span className="text-sm font-bold">{recentEntries.length}/7</span>
          </motion.div>
        </div>

        {/* Improvement Tips */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <h4 className="font-medium text-sm mb-2">💡 Quick Tips to Improve:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {completedTasks < tasks.length && (
              <li>• Complete daily wellness tasks for more points</li>
            )}
            {recentEntries.length < 3 && (
              <li>• Write in your mood journal more regularly</li>
            )}
            {level < 5 && (
              <li>• Engage with resources and forums to level up</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};