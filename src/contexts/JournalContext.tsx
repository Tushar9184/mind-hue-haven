import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodType } from './MoodContext';

export interface JournalEntry {
  id: string;
  date: string;
  mood: MoodType;
  note: string;
  timestamp: number;
}

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (mood: MoodType, note: string) => void;
  getEntriesForPeriod: (days: number) => JournalEntry[];
  getMoodTrends: () => { [key in MoodType]: number };
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Add some mock data for demo
      const mockEntries: JournalEntry[] = [
        {
          id: '1',
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          mood: 'happy',
          note: 'Had a great day studying with friends!',
          timestamp: Date.now() - 86400000
        },
        {
          id: '2',
          date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
          mood: 'anxious',
          note: 'Feeling nervous about upcoming exams.',
          timestamp: Date.now() - 172800000
        },
        {
          id: '3',
          date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
          mood: 'calm',
          note: 'Meditation session helped me relax.',
          timestamp: Date.now() - 259200000
        }
      ];
      setEntries(mockEntries);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (mood: MoodType, note: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood,
      note,
      timestamp: Date.now()
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const getEntriesForPeriod = (days: number) => {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return entries.filter(entry => entry.timestamp > cutoff);
  };

  const getMoodTrends = () => {
    const trends: { [key in MoodType]: number } = {
      happy: 0,
      sad: 0,
      anxious: 0,
      calm: 0,
      stressed: 0,
      neutral: 0
    };
    
    entries.forEach(entry => {
      trends[entry.mood]++;
    });
    
    return trends;
  };

  return (
    <JournalContext.Provider value={{
      entries,
      addEntry,
      getEntriesForPeriod,
      getMoodTrends
    }}>
      {children}
    </JournalContext.Provider>
  );
};