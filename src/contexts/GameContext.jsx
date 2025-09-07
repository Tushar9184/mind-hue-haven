import React, { createContext, useContext, useState } from 'react';

const initialTasks = [
  {
    id: '1',
    title: '5-Minute Meditation',
    description: 'Complete a 5-minute guided meditation session',
    points: 10,
    completed: false,
    category: 'meditation'
  },
  {
    id: '2',
    title: 'Daily Journal Entry',
    description: 'Write about your thoughts and feelings today',
    points: 15,
    completed: false,
    category: 'journaling'
  },
  {
    id: '3',
    title: 'Deep Breathing Exercise',
    description: 'Practice 4-7-8 breathing technique for 2 minutes',
    points: 8,
    completed: false,
    category: 'breathing'
  },
  {
    id: '4',
    title: 'Connect with a Friend',
    description: 'Reach out to someone you care about',
    points: 20,
    completed: false,
    category: 'social'
  }
];

const initialBadges = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first wellness task',
    tier: 'bronze',
    unlocked: false,
    pointsRequired: 10
  },
  {
    id: '2',
    name: 'Mindful Practitioner',
    description: 'Complete 5 meditation tasks',
    tier: 'silver',
    unlocked: false,
    pointsRequired: 50
  },
  {
    id: '3',
    name: 'Wellness Warrior',
    description: 'Reach 100 total points',
    tier: 'gold',
    unlocked: false,
    pointsRequired: 100
  },
  {
    id: '4',
    name: 'Mental Health Champion',
    description: 'Reach 250 total points',
    tier: 'platinum',
    unlocked: false,
    pointsRequired: 250
  }
];

const GameContext = createContext(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);
  const [badges, setBadges] = useState(initialBadges);

  const level = Math.floor(points / 50) + 1;

  const completeTask = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        addPoints(task.points);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const addPoints = (newPoints) => {
    const totalPoints = points + newPoints;
    setPoints(totalPoints);
    
    // Check for badge unlocks
    setBadges(prev => prev.map(badge => {
      if (!badge.unlocked && totalPoints >= badge.pointsRequired) {
        return { ...badge, unlocked: true };
      }
      return badge;
    }));
  };

  return (
    <GameContext.Provider
      value={{
        points,
        level,
        tasks,
        badges,
        completeTask,
        addPoints
      }}
    >
      {children}
    </GameContext.Provider>
  );
};