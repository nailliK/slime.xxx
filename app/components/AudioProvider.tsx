'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SPHERE_COUNT } from './FrequencySpheres';
import { clamp } from '../utils/math';

interface Track {
  title: string;
  filename: string;
}

interface AudioContextValue {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  playlist: Track[];
  volume: number;
  analyserNode: AnalyserNode | null;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

const TIME_UPDATE_INTERVAL = 250; // ms — smooth enough for a progress bar
const DEFAULT_VOLUME = 0.5;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playlistLenRef = useRef(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    fetch('/playlist.json')
      .then((res) => res.json())
      .then((data: Track[]) => {
        setPlaylist(data);
        playlistLenRef.current = data.length;
        setCurrentTrackIndex(data.length - 1);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      setCurrentTrackIndex((prev) => {
        const len = playlistLenRef.current;
        if (len === 0) return prev;
        return (prev + 1) % len;
      });
    };

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audioCtxRef.current?.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;

    const track = playlist[currentTrackIndex];
    if (!track) return;

    audio.src = `/music/${track.filename}`;
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentTrackIndex, playlist]);

  // Throttled time updates instead of RAF
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, TIME_UPDATE_INTERVAL);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const ensureAudioContext = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = SPHERE_COUNT * 2;
    analyserRef.current = analyser;

    const source = ctx.createMediaElementSource(audioRef.current!);
    source.connect(analyser);
    analyser.connect(ctx.destination);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;

    ensureAudioContext();

    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }).catch(() => {});
    }
  }, [isPlaying, playlist.length, ensureAudioContext]);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
  }, [playlist.length]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = clamp(v, 0, 1);
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        currentTime,
        duration,
        volume,
        playlist,
        analyserNode: analyserRef.current,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        setVolume,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}
