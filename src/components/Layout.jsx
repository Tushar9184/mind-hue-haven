import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { MoodSelector } from './MoodSelector';
import { ThemeToggle } from './ThemeToggle';
import { useMood } from '@/contexts/MoodContext';

export const Layout = () => {
  const location = useLocation();
  const { currentMood } = useMood();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'MindSpace - Your Mental Wellness Companion';
      case '/booking':
        return 'Book an Appointment';
      case '/resources':
        return 'Wellness Resources';
      case '/forum':
        return 'Peer Support Community';
      case '/dashboard':
        return 'Analytics Dashboard';
      case '/profile':
        return 'Your Wellness Journey';
      default:
        return 'MindSpace';
    }
  };

  return (
    <div className="min-h-screen transition-all duration-500">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-card/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MindSpace
              </h1>
              <span className="text-2xl">{currentMood === 'neutral' ? '🧠' : ''}</span>
            </div>
            
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <MoodSelector />
              <ThemeToggle />
            </div>
          </div>
          
          <div className="lg:hidden mt-4 flex items-center justify-between">
            <MoodSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{getPageTitle()}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
        
        <Outlet />
      </main>
    </div>
  );
};