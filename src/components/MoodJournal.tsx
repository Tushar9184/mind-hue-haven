import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useJournal } from '@/contexts/JournalContext';
import { useMood, type MoodType } from '@/contexts/MoodContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PlusCircle, TrendingUp } from 'lucide-react';

const moodEmojis: Record<MoodType, string> = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  stressed: '😵',
  neutral: '😐'
};

export const MoodJournal = () => {
  const { currentMood } = useMood();
  const { addEntry, entries, getEntriesForPeriod } = useJournal();
  const [note, setNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const recentEntries = getEntriesForPeriod(7);
  
  const handleSubmit = () => {
    if (note.trim()) {
      addEntry(currentMood, note.trim());
      setNote('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="mood-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Daily Mood Journal</CardTitle>
              <CardDescription>
                Track your feelings and thoughts to build awareness
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-mood-soft rounded-2xl">
            <span className="text-2xl">{moodEmojis[currentMood]}</span>
            <span className="font-medium">Currently feeling {currentMood}</span>
          </div>

          <AnimatePresence>
            {!isAdding ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button 
                  onClick={() => setIsAdding(true)}
                  className="w-full mood-button"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Journal Entry
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="How are you feeling today? What's on your mind?"
                  className="min-h-[100px] resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSubmit} disabled={!note.trim()}>
                    Save Entry
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <Card className="mood-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Recent Entries ({recentEntries.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recentEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-card/50 rounded-2xl border border-border/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{moodEmojis[entry.mood]}</span>
                    <span className="text-sm font-medium capitalize">{entry.mood}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.note}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};