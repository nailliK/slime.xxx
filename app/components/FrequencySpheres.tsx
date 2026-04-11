'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MarchingCubes, MarchingCube } from '@react-three/drei';
import { useAudio } from './AudioProvider';
import { getColorAtTime } from '../utils/colors';

export const SPHERE_COUNT = 64;

const MIN_DISTANCE = 0.2;
const MAX_DISTANCE = 0.85;
const LERP_SPEED = 0.16;
const BALL_STRENGTH = 0.25;
const BALL_SUBTRACT = 12;
const RESOLUTION = 72;
const ROTATION_Y_SPEED = 0.15;
const ROTATION_X_SPEED = 0.15;

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function randomDirections(count: number): THREE.Vector3[] {
  const rng = seededRandom(42);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    points.push(
      new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      )
    );
  }
  return points;
}

// Shared per-ball amplitude buffer — populated once per frame by the parent,
// read by each <Ball>. Avoids 64x redundant getByteFrequencyData() calls.
const amplitudes = new Float32Array(SPHERE_COUNT);

function Ball({ index, direction }: { index: number; direction: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const dist = MIN_DISTANCE + amplitudes[index] * (MAX_DISTANCE - MIN_DISTANCE);
    const pos = ref.current.position;
    pos.x += (direction.x * dist - pos.x) * LERP_SPEED;
    pos.y += (direction.y * dist - pos.y) * LERP_SPEED;
    pos.z += (direction.z * dist - pos.z) * LERP_SPEED;
  });

  return <MarchingCube ref={ref} strength={BALL_STRENGTH} subtract={BALL_SUBTRACT} />;
}

export default function FrequencySpheres() {
  const { analyserNode } = useAudio();
  const groupRef = useRef<THREE.Group>(null);
  const freqDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const directions = useMemo(() => randomDirections(SPHERE_COUNT), []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.1,
        clearcoatRoughness: 0.1,
        iridescence: 0.2
      }),
    []
  );

  // Rotate group, sample audio once, color cycle.
  // This runs at default priority before any <Ball> useFrame because the
  // parent component is mounted first, so its useFrame is registered first.
  // (Non-zero priorities would disable R3F's auto-rendering.)
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ROTATION_Y_SPEED;
      groupRef.current.rotation.x += delta * ROTATION_X_SPEED;
    }

    material.color.set(getColorAtTime(clock.getElapsedTime()));

    if (analyserNode) {
      if (!freqDataRef.current) {
        freqDataRef.current = new Uint8Array(analyserNode.frequencyBinCount);
      }
      analyserNode.getByteFrequencyData(freqDataRef.current);
      const data = freqDataRef.current;
      const bandSize = Math.floor(data.length / SPHERE_COUNT);

      for (let i = 0; i < SPHERE_COUNT; i++) {
        let sum = 0;
        const start = i * bandSize;
        for (let j = start; j < start + bandSize; j++) {
          sum += data[j];
        }
        amplitudes[i] = sum / bandSize / 255;
      }
    } else {
      amplitudes.fill(0);
    }
  });

  return (
    <group ref={groupRef}>
      <MarchingCubes resolution={RESOLUTION} maxPolyCount={40000}>
        <primitive object={material} attach="material" />
        {directions.map((dir, i) => (
          <Ball key={i} index={i} direction={dir} />
        ))}
      </MarchingCubes>
    </group>
  );
}
