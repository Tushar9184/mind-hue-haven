import React, { createContext, useContext, useState, useEffect } from 'react';

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  stressed: '😵',
  neutral: '😐'
};

const MoodContext = createContext(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState('neutral');

  const setMood = (mood) => {
    setCurrentMood(mood);
    // Apply mood theme to document root
    document.documentElement.setAttribute('data-mood', mood);
  };

  useEffect(() => {
    // Initialize with neutral mood
    document.documentElement.setAttribute('data-mood', 'neutral');
  }, []);

  return (
    <MoodContext.Provider
      value={{
        currentMood,
        setMood,
        moodEmoji: moodEmojis[currentMood]
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};