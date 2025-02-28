import { useGlobalState } from '@/utils/GlobalState.tsx';
import './MediaPlayerInformation.css';

export default function MediaPlayerInformation() {
  const { state } = useGlobalState();

  const { currentTrack, currentTime, totalTime, currentImage } = state;

  return (
    currentTrack && (
      <section id={'media-player-information'}>
        <div>
          <span className={'add-background'}>
            current Image: <a href={currentImage || ''}>{currentImage || ''}</a>
          </span>
        </div>

        <div>
          <span className={'add-background'}>
            current track: <a href={currentTrack}>{currentTrack}</a>
          </span>
        </div>

        <div>
          <span className={'add-background'}>
            current time: {Math.round(currentTime || 0)}s /{' '}
            {Math.round(totalTime || 0)}s
          </span>
        </div>
      </section>
    )
  );
}
