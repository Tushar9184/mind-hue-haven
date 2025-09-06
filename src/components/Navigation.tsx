import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3, 
  User,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/booking', icon: Calendar, label: 'Booking' },
  { to: '/resources', icon: BookOpen, label: 'Resources' },
  { to: '/forum', icon: Users, label: 'Forum' },
  { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/profile', icon: User, label: 'Profile' }
];

export const Navigation = () => {
  return (
    <nav className="sticky top-20 z-40 bg-card/90 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap min-w-fit",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};