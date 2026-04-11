'use client';

import { useEffect, type RefObject } from 'react';
import { getColorAtTime } from './colors';

// Single shared RAF loop — all subscribers receive the same computed color
// each frame so they stay perfectly in sync, regardless of mount order.
const subscribers = new Set<HTMLElement>();
let rafId = 0;
let startTime: number | null = null;

function tick(time: number) {
  if (startTime === null) startTime = time;
  const color = getColorAtTime((time - startTime) / 1000);
  for (const el of subscribers) {
    el.style.setProperty('--cycle-color', color);
  }
  rafId = requestAnimationFrame(tick);
}

function subscribe(el: HTMLElement) {
  subscribers.add(el);
  if (subscribers.size === 1) {
    rafId = requestAnimationFrame(tick);
  }
}

function unsubscribe(el: HTMLElement) {
  subscribers.delete(el);
  if (subscribers.size === 0) {
    cancelAnimationFrame(rafId);
    startTime = null;
  }
}

export function useColorCycle(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    subscribe(el);
    return () => unsubscribe(el);
  }, [ref]);
}
