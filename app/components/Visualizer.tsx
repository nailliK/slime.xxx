'use client';

import dynamic from 'next/dynamic';

const VisualizerCanvas = dynamic(() => import('./VisualizerCanvas'), {
  ssr: false,
});

export default function Visualizer() {
  return (
    <div className="fixed inset-0 w-full h-full z-1">
      <VisualizerCanvas />
    </div>
  );
}
