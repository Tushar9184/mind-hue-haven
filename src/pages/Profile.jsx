import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Trophy, 
  Target, 
  Flame,
  TrendingUp,
  Star
} from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useMood } from '@/contexts/MoodContext';

export const Profile = () => {
  const { points, level, tasks, badges, completeTask } = useGame();
  const { currentMood, moodEmoji } = useMood();
  
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const nextLevelPoints = (level * 50);
  const currentLevelProgress = (points % 50);
  
  const wellnessStreak = 7; // Mock streak data
  const weeklyGoal = 5;
  const completedThisWeek = 3;

  const getBadgeIcon = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return '🥉';
      case 'silver':
        return '🥈';
      case 'gold':
        return '🥇';
      case 'platinum':
        return '💎';
      default:
        return '🏆';
    }
  };

  const recentActivity = [
    { action: 'Completed 5-minute meditation', points: 10, time: '2 hours ago' },
    { action: 'Reached 7-day wellness streak', points: 25, time: 'Yesterday' },
    { action: 'Posted in community forum', points: 5, time: '2 days ago' },
    { action: 'Completed breathing exercise', points: 8, time: '3 days ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="mood-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {moodEmoji}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold mb-1">Your Wellness Journey</h2>
              <p className="text-muted-foreground mb-3">
                Level {level} Wellness Explorer • {points} total points
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="gap-1">
                  <Flame className="h-3 w-3" />
                  {wellnessStreak} day streak
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {completedThisWeek}/{weeklyGoal} weekly goal
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {completedTasks.length} tasks completed
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">{currentMood !== 'neutral' ? moodEmoji : '😊'}</div>
              <p className="text-sm text-muted-foreground">Current mood</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress & Level */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="mood-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Level Progress
              </CardTitle>
              <CardDescription>
                Complete wellness tasks to level up and unlock new badges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Level {level}</span>
                <span className="text-sm text-muted-foreground">
                  {currentLevelProgress}/50 points to Level {level + 1}
                </span>
              </div>
              
              <Progress value={(currentLevelProgress / 50) * 100} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{points}</div>
                  <div className="text-xs text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{level}</div>
                  <div className="text-xs text-muted-foreground">Current Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{unlockedBadges.length}</div>
                  <div className="text-xs text-muted-foreground">Badges Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Tasks */}
          <Card className="mood-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Today's Wellness Tasks
              </CardTitle>
              <CardDescription>
                Complete these activities to earn points and improve your wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-mood-soft rounded-2xl">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                      <span className="text-xs text-primary font-medium">+{task.points} points</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => completeTask(task.id)}
                    className="ml-4"
                  >
                    Complete
                  </Button>
                </div>
              ))}
              
              {pendingTasks.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold">All tasks completed!</h3>
                  <p className="text-sm text-muted-foreground">New tasks will be available tomorrow.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mood-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      +{activity.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges & Achievements */}
        <div className="space-y-6">
          <Card className="mood-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Badges Earned
              </CardTitle>
              <CardDescription>
                Your wellness achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unlockedBadges.length > 0 ? (
                  unlockedBadges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-mood-soft rounded-2xl">
                      <div className="text-2xl">{getBadgeIcon(badge.tier)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                        <Badge className={`badge-${badge.tier} mt-1 text-xs`}>
                          {badge.tier}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Complete tasks to earn badges!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mood-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Next Badges
              </CardTitle>
              <CardDescription>
                Keep going to unlock these
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {badges.filter(badge => !badge.unlocked).slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 border border-border/50 rounded-2xl opacity-60">
                    <div className="text-2xl opacity-50">{getBadgeIcon(badge.tier)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress 
                          value={(points / badge.pointsRequired) * 100} 
                          className="h-1 flex-1" 
                        />
                        <span className="text-xs text-muted-foreground">
                          {points}/{badge.pointsRequired}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mood-card">
            <CardHeader>
              <CardTitle>Weekly Goal</CardTitle>
              <CardDescription>
                Complete {weeklyGoal} wellness tasks this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={(completedThisWeek / weeklyGoal) * 100} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{completedThisWeek} / {weeklyGoal} completed</span>
                  <span className="font-medium">{Math.round((completedThisWeek / weeklyGoal) * 100)}%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {weeklyGoal - completedThisWeek > 0 
                    ? `${weeklyGoal - completedThisWeek} more tasks to reach your goal!`
                    : 'Goal completed! Great job!'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};