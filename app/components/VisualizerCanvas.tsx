'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FrequencySpheres from './FrequencySpheres';

export default function VisualizerCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.4], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, 5, -5]} intensity={0.6} />
      <directionalLight position={[5, -5, -5]} intensity={0.6} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <FrequencySpheres />
    </Canvas>
  );
}
