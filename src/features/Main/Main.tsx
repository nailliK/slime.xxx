import './Main.css';
import MediaPlayer from '@/features/MediaPlayer';
import MediaPlayerControls from '@/features/MediaPlayerControls/MediaPlayerControls.tsx';
import MediaPlayerInformation from '@/features/MediaPlayerInformation';
import MediaVisualizer from '@/features/MediaVisualizer';

function Main() {
  return (
    <main id={'main'}>
      <MediaPlayerInformation />
      <MediaPlayerControls />
      <MediaPlayer />
      <MediaVisualizer />
    </main>
  );
}

export default Main;
