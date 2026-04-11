'use client';

import { useCallback, useRef } from 'react';

interface SliderProps {
  value: number; // 0–1
  onChange: (value: number) => void;
  className?: string;
}

export default function Slider({ value, onChange, className = '' }: SliderProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (clientX: number) => {
      const bar = barRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      onChange(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
    },
    [onChange]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      update(e.clientX);
      const onMove = (ev: MouseEvent) => update(ev.clientX);
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [update]
  );

  return (
    <div
      ref={barRef}
      className={`h-2 bg-on-surface/20 cursor-pointer ${className}`}
      onMouseDown={onMouseDown}
    >
      <div
        className="h-full transition-none"
        style={{ width: `${value * 100}%`, backgroundColor: 'var(--cycle-color)' }}
      />
    </div>
  );
}
