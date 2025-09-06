import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { mockAnalytics } from '@/data/mockData';
import { TrendingUp, Users, Calendar, MessageSquare, Heart, Activity } from 'lucide-react';

export const Dashboard = () => {
  const moodColors = ['#4ade80', '#60a5fa', '#a78bfa', '#fb7185', '#fbbf24'];
  
  const weeklyTrend = [
    { week: 'Week 1', sessions: 18, posts: 24, engagement: 85 },
    { week: 'Week 2', sessions: 22, posts: 31, engagement: 92 },
    { week: 'Week 3', sessions: 19, posts: 28, engagement: 88 },
    { week: 'Week 4', sessions: 24, posts: 35, engagement: 95 }
  ];

  const wellnessMetrics = [
    {
      title: 'Total Active Users',
      value: '1,247',
      change: '+12%',
      icon: Users,
      description: 'Students engaged this month'
    },
    {
      title: 'Sessions Booked',
      value: mockAnalytics.sessionsBooked.thisWeek.toString(),
      change: `+${mockAnalytics.sessionsBooked.increase}%`,
      icon: Calendar,
      description: 'Counseling appointments this week'
    },
    {
      title: 'Forum Interactions',
      value: '2,156',
      change: '+18%',
      icon: MessageSquare,
      description: 'Posts, replies, and reactions'
    },
    {
      title: 'Wellness Tasks Completed',
      value: '3,892',
      change: '+25%',
      icon: Activity,
      description: 'Gamification engagement'
    }
  ];

  const riskCategories = [
    { category: 'Low Risk', count: 892, color: '#4ade80', percentage: 71.6 },
    { category: 'Moderate Risk', count: 267, color: '#fbbf24', percentage: 21.4 },
    { category: 'High Risk', count: 88, color: '#fb7185', percentage: 7.0 }
  ];

  const resourceUsage = [
    { resource: 'Meditation Audio', usage: 342 },
    { resource: 'Sleep Guides', usage: 289 },
    { resource: 'Anxiety Resources', usage: 234 },
    { resource: 'Study Tips', usage: 198 },
    { resource: 'Breathing Exercises', usage: 156 }
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wellnessMetrics.map((metric, index) => (
          <Card key={index} className="mood-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{metric.change}</span>
                <span>from last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily User Engagement */}
        <Card className="mood-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daily User Engagement
            </CardTitle>
            <CardDescription>
              Student interactions over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.dailyUsers}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        <Card className="mood-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Current Mood Distribution
            </CardTitle>
            <CardDescription>
              How students are feeling today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.moodDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {mockAnalytics.moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodColors[index % moodColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} students`, props.payload.mood]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {mockAnalytics.moodDistribution.map((mood, index) => (
                <div key={mood.mood} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: moodColors[index % moodColors.length] }}
                    />
                    <span>{mood.mood}</span>
                  </div>
                  <span className="font-medium">{mood.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Trends */}
        <Card className="mood-card">
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>
              Comparison of key metrics over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Counseling Sessions"
                />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Forum Posts"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Assessment Overview */}
        <Card className="mood-card">
          <CardHeader>
            <CardTitle>Risk Assessment Overview</CardTitle>
            <CardDescription>
              Distribution based on screening scores (anonymous)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskCategories.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.category}</span>
                    <span>{category.count} students ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-mood-soft rounded-lg">
              <p className="text-xs text-muted-foreground">
                * All data is anonymized and aggregated to protect student privacy. 
                High-risk indicators trigger automatic outreach protocols.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Most Used Resources</CardTitle>
          <CardDescription>
            Popular wellness content by student engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resourceUsage} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" />
              <YAxis dataKey="resource" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Admin Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-mood-soft rounded-2xl hover:bg-mood-accent/20 transition-colors text-left">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-sm">Export Reports</div>
              <div className="text-xs text-muted-foreground">Generate analytics</div>
            </button>
            
            <button className="p-4 bg-mood-soft rounded-2xl hover:bg-mood-accent/20 transition-colors text-left">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium text-sm">Manage Users</div>
              <div className="text-xs text-muted-foreground">User administration</div>
            </button>
            
            <button className="p-4 bg-mood-soft rounded-2xl hover:bg-mood-accent/20 transition-colors text-left">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="font-medium text-sm">Moderate Forum</div>
              <div className="text-xs text-muted-foreground">Review flagged content</div>
            </button>
            
            <button className="p-4 bg-mood-soft rounded-2xl hover:bg-mood-accent/20 transition-colors text-left">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="font-medium text-sm">Crisis Alerts</div>
              <div className="text-xs text-muted-foreground">Review urgent cases</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};