'use client';

import { AudioProvider } from './AudioProvider';
import SlimeLogo from './SlimeLogo';
import Visualizer from './Visualizer';
import Player from './Player';

export default function SlimeApp() {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-surface">
        <SlimeLogo />
        <Visualizer />
        <main className="fixed bottom-0 left-0 right-0 flex flex-col items-center px-4 pb-8 max-w-2xl mx-auto w-full z-10">
          <Player />
        </main>
      </div>
    </AudioProvider>
  );
}
