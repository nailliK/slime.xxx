import './MediaPlayer.css';
import { useGlobalState } from '@/utils/GlobalState.tsx';
import { useEffect, useRef } from 'react';

function MediaPlayer() {
  const { state, dispatch } = useGlobalState();
  const canPlayRef = useRef<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const { playing, userInteracting, currentTrack, currentTrackIndex } = state;

  useEffect(() => {
    if (audioRef.current && userInteracting) {
      console.log(playing);

      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioRef, currentTrack, userInteracting, playing]);

  useEffect(() => {
    if (audioRef.current) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioRef.current);
      analyzerRef.current = audioContext.createAnalyser();
      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.gain.value = 0.5;
      source.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyzerRef.current);
      analyzerRef.current.connect(audioContext.destination);

      dispatchFrequencyData();
      adjustGain();
    }
  }, [audioRef, currentTrack]);

  const adjustGain = () => {
    if (analyzerRef.current && gainNodeRef.current) {
      const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
      analyzerRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const gainValue = Math.min(1.0, Math.max(0.1, 1 / (average / 256)));

      if (isFinite(gainValue)) {
        gainNodeRef.current.gain.value = gainValue;
      }
    }
    requestAnimationFrame(adjustGain);
  };

  const dispatchFrequencyData = () => {
    if (analyzerRef.current) {
      const frequencyData = new Uint8Array(
        analyzerRef.current.frequencyBinCount,
      );
      analyzerRef.current.getByteFrequencyData(frequencyData);
      dispatch({
        type: 'SET_FREQUENCY_DATA',
        payload: frequencyData,
      });
    }
    requestAnimationFrame(dispatchFrequencyData);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch({
        type: 'SET_CURRENT_TIME',
        payload: audioRef.current.currentTime,
      });

      dispatch({
        type: 'SET_TOTAL_TIME',
        payload: audioRef.current.duration,
      });
    }
  };

  const handleLoadStart = () => {
    dispatch({
      type: 'SET_AUDIO_LOADING',
      payload: true,
    });
  };

  const handleCanPlay = () => {
    dispatch({
      type: 'SET_AUDIO_LOADING',
      payload: false,
    });
  };

  return (
    currentTrackIndex !== null && (
      <section id={'media-player'}>
        <audio
          autoPlay={canPlayRef.current}
          crossOrigin={'anonymous'}
          id={'audio'}
          src={`${currentTrack}`}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
        ></audio>
      </section>
    )
  );
}

export default MediaPlayer;
