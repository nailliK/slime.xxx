<template>
    <article id="page"
             :style="{
        backgroundImage: `url(${currentSong.imgSrc})`
             }">
        <media-information v-if="isInit"
                           :current-song="currentSong"
                           :song-progress="songProgress"></media-information>

        <media-player v-if="isInit"
                      :current-song="currentSong"
                      :is-full-screen="isFullscreen"
                      :is-playing="isPlaying"
                      :reference-integer="referenceInteger"
                      @next="nextSong"
                      @prev="prevSong"
                      @audio-data="updateAudioData"
                      @song-progress="updateSongProgress"
                      @is-playing="updateIsPlaying"></media-player>

        <visualizer v-if="isInit"
                    :audio-data="audioData"
                    :current-song="currentSong"
                    :is-full-screen="isFullscreen"
                    :isPlaying="isPlaying"
                    :primary-color="primaryColor"></visualizer>

        <init-screen v-if="!isInit"
                     @init="toggleInit"></init-screen>
    </article>
</template>

<script lang="ts"
        setup>
import {useRequestHeaders, useRoute} from '#app';
import {songs} from '~/json/songs.json';
import {computed, ComputedRef, onMounted, Ref, ref} from 'vue';
import Environment from '~/utils/Helpers/Environment';

const headers = useRequestHeaders();
const route = useRoute();

let isInit: Ref = ref(false);
let isPlaying: Ref = ref(false);
let isFullscreen: Ref = ref(false);

let referenceInteger: Ref = ref(1024);
let audioData: Ref<Array<Number>> = ref([]);
let songProgress: Ref = ref({progress: 0, duration: 0});
let songIndex: Ref = ref(0);
let currentSong: ComputedRef = computed(() => songs[songIndex.value]);

let n = Date.now();
let primaryColor: Ref = ref({n: n, hex: hslToHex(n, 100, 50)});

// utilities
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function incrementPrimaryColor() {
    n += 0.25;

    const root = document.documentElement;
    root.style.setProperty('--color-primary', hslToHex(n, 100, 50));
    primaryColor.value = {n: n, hex: hslToHex(n, 100, 50)};
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
    if (isFullscreen.value === false) {
        songIndex.value--;

        if (songIndex.value < 0) {
            songIndex.value = songs.length - 1;
        }
    }

}

function nextSong() {
    if (isFullscreen.value === false) {
        songIndex.value++;

        if (songIndex.value > songs.length - 1) {
            songIndex.value = 0;
        }
    }
}

function onKeyPress(e) {
    switch (e.code) {
        case 'Escape' :
            document.body.className = '';
            document.exitFullscreen();
            isFullscreen.value = false;
            break;
        case 'KeyV' :
            document.body.className = 'fullscreen';
            document.body.requestFullscreen();
            isFullscreen.value = true;
            break;
    }
}

function toggleInit(n) {
    isInit.value = n;
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
