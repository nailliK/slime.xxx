'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { getColorAtTime } from './colors';

export function useColorCycle(ref: RefObject<HTMLElement | null>) {
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!ref?.current) return;
    const el = ref.current;

    const tick = (time: number) => {
      if (startRef.current === null) startRef.current = time;
      const elapsed = (time - startRef.current) / 1000;
      el.style.setProperty('--cycle-color', getColorAtTime(elapsed));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ref]);
}
