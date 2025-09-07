import React, { createContext, useContext, useState, useEffect } from 'react';
const JournalContext = createContext(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Add some mock data for demo
      const mockEntries = [
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

  const addEntry = (mood, note) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood,
      note,
      timestamp: Date.now()
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const getEntriesForPeriod = (days) => {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return entries.filter(entry => entry.timestamp > cutoff);
  };

  const getMoodTrends = () => {
    const trends = {
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