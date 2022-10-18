<template>
  <article
    id="page"
    :style="{
      backgroundImage: `url(${currentSong.imgSrc})`,
      backgroundPosition: `${currentSong.imgAnchor}`
    }"
  >
    <media-information
      :current-song="currentSong"
      :song-progress="songProgress"
    />

    <MediaPlayer
      :current-song="currentSong"
      :is-full-screen="isFullscreen"
      :is-playing="isPlaying"
      :reference-integer="referenceInteger"
      @next="nextSong"
      @pause="handleMediaPause"
      @play="handleMediaPlay"
      @prev="prevSong"
      @audio-data="updateAudioData"
      @song-progress="updateSongProgress"
      @is-playing="updateIsPlaying"
    />

    <AudioVisualizer
      :audio-data="audioData"
      :current-song="currentSong"
      :is-full-screen="isFullscreen"
      :is-playing="isPlaying"
    />
  </article>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue';
import { songs } from '@/json/songs.json';
import ScreenRecorder from '@/utils/classes/ScreenRecorder';
import Environment from '@/utils/helpers/Environment';
import MediaPlayer from "@/components/MediaPlayer.vue"

let screenRecorder: ScreenRecorder | null = null;
const isPlaying: Ref = ref(false);
const isFullscreen: Ref = ref(false);
const isRecording: Ref = ref(false);
const referenceInteger: Ref = ref(1024);
const audioData: Ref = ref([]);
const songProgress: Ref = ref({
  duration: 0,
  progress: 0
});
const router = useRouter();
const route = useRoute();
const songIndex: ComputedRef = computed(() => {
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].id === route.params.id[0]) {
      return i;
    }
  }
});
const currentSong: ComputedRef = computed(() => {
  return songs[songIndex.value];
});

let n = Date.now();

// utilities
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function incrementPrimaryColor() {
  n += 0.25;

  const root = document.documentElement;
  root.style.setProperty('--color-primary', hslToHex(n, 100, 50));
}

function updateSongProgress(n) {
  songProgress.value = n;
}

function updateAudioData(n) {
  audioData.value = n;
}

function updateIsPlaying(n) {
  isPlaying.value = n;
}

function prevSong() {
  let n = songIndex.value;
  n--;

  if (n < 0) {
    n = songs.length - 1;
  }

  window.location.href = `/songs/${songs[n].id}`;
}

function nextSong() {
  let n = songIndex.value;

  n++;

  if (n > songs.length - 1) {
    n = 0;
  }

  window.location.href = `/songs/${songs[n].id}`;
}

function handleMediaPlay() {
  if (screenRecorder !== null && isRecording.value) {
    screenRecorder.startRecording();
  }
}

function handleMediaPause() {
  if (screenRecorder !== null) {
    screenRecorder.stopRecording();
    screenRecorder.saveVideo(`${currentSong.value.title}.webm`);
  }
}

async function onKeyPress(e) {
  switch (e.code) {
    case 'Escape':
      if (isFullscreen.value) {
        document.body.className = '';
        isFullscreen.value = false;
        await document.exitFullscreen();
      }
      break;
    case 'KeyV':
      if (!isFullscreen.value) {
        document.body.className = 'fullscreen';
        await document.body.requestFullscreen();
        isFullscreen.value = true;
      }
      break;
    case 'KeyR':
      isRecording.value = !isRecording.value;

      if (screenRecorder === null && isRecording.value) {
        screenRecorder = new ScreenRecorder();
      }
      break;
  }
}

function tick() {
  requestAnimationFrame(tick);
  incrementPrimaryColor();
}

onMounted(() => {
  if (Environment.isMobile()) {
    referenceInteger.value = 512;
  }
  window.addEventListener('keyup', onKeyPress);
  tick();
});
</script>
