import { useGlobalState } from '@/utils/GlobalState.tsx';
import { useEffect } from 'react';
import './MediaPlayerControls.css';
import BucketService from '@/utils/BucketService.ts';
import ArrayTools from '@/utils/ArrayTools.ts';

export default function MediaPlayerControls() {
  const { state, dispatch } = useGlobalState();

  const {
    audioFiles,
    playing,
    currentTrackIndex,
    currentTrack,
    currentTime,
    totalTime,
    userInteracting,
  } = state;

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const bucketService: BucketService = new BucketService();
      let bucketFiles = await bucketService.bucketContents('audio/');
      bucketFiles = new ArrayTools().shuffleArray(bucketFiles);
      bucketFiles.forEach((audioFile) => {
        const fileUrl = `${import.meta.env.VITE_DIGITAL_OCEAN_SPACES_ENDPOINT}/${audioFile.Key}`;
        dispatch({
          type: 'ADD_AUDIO_FILE',
          payload: fileUrl,
        });
      });
    };

    fetchAudioFiles();
  }, [dispatch]);

  useEffect(() => {
    if (audioFiles.length > 0 && !currentTrack) {
      dispatch({
        type: 'SET_CURRENT_TRACK_INDEX',
        payload: 0,
      });
    }

    if (audioFiles.length > 0 && currentTrackIndex !== null) {
      dispatch({
        type: 'SET_CURRENT_TRACK',
        payload: audioFiles[currentTrackIndex],
      });
    }
  }, [audioFiles, currentTrack, currentTrackIndex]);

  useEffect(() => {
    if (currentTrackIndex && totalTime && currentTime) {
      if (
        Math.floor(totalTime) > 0 &&
        Math.ceil(currentTime) >= Math.floor(totalTime) - 1
      ) {
        handleNext();
      }
    }
  }, [currentTime, totalTime, currentTrackIndex]);

  const handlePlay = () => {
    dispatch({
      type: 'SET_USER_INTERACTING',
      payload: true,
    });

    dispatch({
      type: 'SET_PLAYING',
      payload: !playing,
    });
  };

  const handlePrevious = () => {
    dispatch({
      type: 'SET_USER_INTERACTING',
      payload: true,
    });

    if (currentTrackIndex !== null) {
      const previousTrackIndex = currentTrackIndex - 1;
      if (previousTrackIndex >= 0) {
        dispatch({
          type: 'SET_CURRENT_TRACK_INDEX',
          payload: previousTrackIndex,
        });
      }
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'SET_USER_INTERACTING',
      payload: true,
    });

    if (currentTrackIndex !== null) {
      const nextTrackIndex = currentTrackIndex + 1;
      if (nextTrackIndex < audioFiles.length) {
        dispatch({
          type: 'SET_CURRENT_TRACK_INDEX',
          payload: nextTrackIndex,
        });
      }
    }
  };
  return (
    currentTrackIndex !== null && (
      <section id={'media-player-controls'}>
        <span className={'add-background'}>
          <button
            disabled={currentTrackIndex === 0 || !userInteracting}
            onClick={handlePrevious}
          >
            Prev
          </button>
          <button onClick={handlePlay}>{playing ? 'Pause' : 'Play'}</button>
          <button
            disabled={
              currentTrackIndex === audioFiles.length - 1 || !userInteracting
            }
            onClick={handleNext}
          >
            Next
          </button>
        </span>
      </section>
    )
  );
}
