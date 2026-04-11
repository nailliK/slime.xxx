'use client';

import { useRef } from 'react';
import { useAudio } from './AudioProvider';
import { useColorCycle } from '../utils/useColorCycle';
import Slider from './Slider';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Player() {
  const {
    isPlaying,
    currentTrackIndex,
    currentTime,
    duration,
    volume,
    playlist,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
  } = useAudio();

  const containerRef = useRef<HTMLDivElement>(null);
  useColorCycle(containerRef);

  const track = playlist[currentTrackIndex];
  const progress = duration > 0 ? currentTime / duration : 0;

  const onSeek = (pct: number) => {
    if (duration > 0) seekTo(pct * duration);
  };

  return (
    <div ref={containerRef} className="w-full max-w-lg flex flex-col items-center gap-2 py-4">
      <h1 className="text-[16px] tracking-wide text-center" style={{ color: 'var(--cycle-color)' }}>
        {track?.title ?? 'SLIME'}
      </h1>

      <div className="w-full flex items-center gap-2">
        <span className="text-[16px] text-on-surface/60 shrink-0">{formatTime(currentTime)}</span>
        <Slider value={progress} onChange={onSeek} className="flex-1" />
        <span className="text-[16px] text-on-surface/60 shrink-0">{formatTime(duration)}</span>
      </div>

      <div className="w-full flex items-center gap-4 justify-center">
        <button
          onClick={prevTrack}
          className="w-4 h-4 flex items-center justify-center text-on-surface hover:opacity-80 transition-colors text-[16px] cursor-pointer"
          aria-label="Previous track"
        >
          &lt;&lt;
        </button>
        <button
          onClick={togglePlay}
          className="min-w-4 h-4 flex items-center justify-center hover:opacity-80 transition-colors text-[16px] cursor-pointer"
          style={{ color: 'var(--cycle-color)' }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? ' || ' : ' > '}
        </button>
        <button
          onClick={nextTrack}
          className="w-4 h-4 flex items-center justify-center text-on-surface hover:opacity-80 transition-colors text-[16px] cursor-pointer"
          aria-label="Next track"
        >
          &gt;&gt;
        </button>

        <div className="ml-2 flex items-center gap-2">
          <span className="text-[16px] text-on-surface/60">vol</span>
          <Slider value={volume} onChange={setVolume} className="w-16" />
        </div>
      </div>
    </div>
  );
}
