import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const BreathingCircle = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);

  const phaseColors = {
    inhale: 'hsl(150, 40%, 55%)', // Calm green
    hold: 'hsl(35, 70%, 60%)',   // Warm yellow
    exhale: 'hsl(230, 50%, 60%)'  // Calming blue
  };

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const currentDuration = phaseDurations[phase];
          
          if (prev >= currentDuration - 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
            } else if (phase === 'hold') {
              setPhase('exhale');
            } else {
              setPhase('inhale');
              setCycles(prevCycles => prevCycles + 1);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setSeconds(0);
    setCycles(0);
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
    }
  };

  const getCircleScale = () => {
    const progress = seconds / phaseDurations[phase];
    switch (phase) {
      case 'inhale': return 0.5 + (progress * 0.5); // Grow from 0.5 to 1
      case 'hold': return 1; // Stay at full size
      case 'exhale': return 1 - (progress * 0.5); // Shrink from 1 to 0.5
    }
  };

  return (
    <Card className="mood-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <span className="text-2xl">🌸</span>
          Guided Breathing
        </CardTitle>
        <CardDescription>
          Follow the circle to regulate your breathing and find calm
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        {/* Breathing Circle */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-dashed border-border/30"
          />
          <motion.div
            className="w-32 h-32 rounded-full shadow-2xl flex items-center justify-center text-white font-medium"
            animate={{
              scale: getCircleScale(),
              backgroundColor: phaseColors[phase]
            }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
          >
            <div className="text-center">
              <div className="text-lg font-bold">{getInstruction()}</div>
              <div className="text-sm opacity-80">
                {phaseDurations[phase] - seconds}s
              </div>
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-primary">{getInstruction()}</p>
          <p className="text-sm text-muted-foreground">
            Cycles completed: {cycles}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsActive(!isActive)}
              className="mood-button"
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Inhale (4s)</span>
            <span>Hold (4s)</span>
            <span>Exhale (6s)</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              animate={{
                backgroundColor: phaseColors[phase],
                width: `${((seconds + 1) / phaseDurations[phase]) * 100}%`
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};