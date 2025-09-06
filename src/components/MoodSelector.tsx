import React from 'react';
import { useMood, type MoodType } from '@/contexts/MoodContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const moods: { value: MoodType; label: string; emoji: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'stressed', label: 'Stressed', emoji: '😵' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' }
];

export const MoodSelector = () => {
  const { currentMood, setMood, moodEmoji } = useMood();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      <span className="text-sm font-medium text-muted-foreground">How are you feeling?</span>
      
      <div className="flex gap-2 md:hidden">
        {moods.map((mood) => (
          <motion.div
            key={mood.value}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Button
              variant={currentMood === mood.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setMood(mood.value)}
              className="text-lg p-2 h-auto transition-all duration-300"
            >
              {mood.emoji}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="hidden md:block">
        <Select value={currentMood} onValueChange={(value) => setMood(value as MoodType)}>
          <SelectTrigger className="w-40">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span className="text-lg">{moodEmoji}</span>
                {moods.find(m => m.value === currentMood)?.label}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {moods.map((mood) => (
              <SelectItem key={mood.value} value={mood.value}>
                <span className="flex items-center gap-2">
                  <span className="text-lg">{mood.emoji}</span>
                  {mood.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};