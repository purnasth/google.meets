import { useEffect, useRef, useState } from 'react';
import { LOADER_STEPS } from '../constants/loader';

export function useProgress(
  duration: number = 2500,
  steps: number = LOADER_STEPS,
) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    let current = 0;
    const stepTime = duration / steps;
    intervalRef.current = window.setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= steps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, stepTime);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, steps]);

  return progress;
}
