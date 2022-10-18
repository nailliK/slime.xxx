<template>
  <section
    id="visualizer"
    :class="{
      fullscreen: videoMode
    }"
  >
    <div id="canvas">
      <div
        v-for="(p, i) in points"
        :key="i"
        :style="{
          transform: `rotate(${p.rotation}rad) scaleY(${p.scale})`
        }"
        class="point-container"
      >
        <div class="point" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, Ref, computed, onMounted, ref } from 'vue';
import Color from '@/utils/interfaces/Color';
import Song from '@/utils/interfaces/Song';

const props = defineProps({
  audioData: {
    default: () => {
      return [];
    },
    type: Array as PropType<number[]>
  },
  currentSong: {
    default: () => {},
    type: Object as () => Song
  },
  primaryColor: {
    default: () => {},
    type: Object as () => Color
  },
  referenceInteger: {
    default: 512,
    type: Number
  },
  videoMode: {
    default: false,
    type: Boolean
  }
});

// Template variables
const videoMode: ComputedRef<Boolean> = computed(() => {
  return props.videoMode;
});
const points: Ref = ref([]);
const r: Ref = ref(0);

function draw() {
  r.value = r.value + 0.01;

  let pointData: number[] = [];
  if (typeof props.audioData !== 'undefined' && props.audioData.length > 0) {
    pointData = props.audioData;
  } else {
    for (let i = 0; i < props.referenceInteger; i++) {
      pointData.push(128);
    }
  }

  points.value = [];
  const numPoints = pointData.length;
  const angleStep = (Math.PI * 2) / numPoints;

  for (let p = 0; p < numPoints; p++) {
    const scale = (pointData[p] / 255) * 1.5;
    const rotation = p * angleStep;
    points.value.push({
      rotation,
      scale,
      value: pointData[p]
    });
  }
}

function animate() {
  draw();
  requestAnimationFrame(animate);
}

onMounted(() => {
  animate();
});
</script>
