<template>
    <article id="page">
        <header id="header">
            <h2>{{ currentSong.title }}</h2>
            <h3>
                <span>{{ formatTimeString(songProgress.progress) }}</span>
                <span>/</span>
                <span>{{ formatTimeString(songProgress.duration) }}</span>
            </h3>

            <media-player :auto-play="autoPlay"
                          :current-song="currentSong"
                          :is-full-screen="isFullscreen"
                          :is-playing="isPlaying"
                          :reference-integer="referenceInteger"
                          @next="nextSong"
                          @prev="prevSong"
                          @audio-data="updateAudioData"
                          @song-progress="updateSongProgress"
                          @is-playing="updateIsPlaying"></media-player>
        </header>

        <visualizer :audio-data="audioData"
                    :current-song="currentSong"
                    :is-full-screen="isFullscreen"
                    :isPlaying="isPlaying"
                    :primary-color="primaryColor"></visualizer>
    </article>
</template>

<script lang="ts"
        setup>
import {useRoute} from '#app';
import {songs} from '~/json/songs.json';
import {onMounted, ref, Ref} from 'vue';

const route = useRoute();
let id: Ref = ref(route.params.id[0]);
let isPlaying: Ref = ref(false);
let isFullscreen: Ref = ref(false);
let autoPlay: Ref = ref(typeof route.query.autoplay !== 'undefined');

let referenceInteger: Ref = ref(1024);
let audioData: Ref<Array<Number>> = ref([]);
let songProgress: Ref = ref({progress: 0, duration: 0});

let currentSong: Ref = ref(songs.find((s) => {
    return s.id === id.value;
}));

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

function formatTimeString(s) {
    if (isNaN(s)) {
        s = 0;
    }

    return new Date(s * 1000).toISOString().substr(11, 11).replace('.', ':');
}

function resetPrimaryColor() {
    n = Date.now();
}

function incrementPrimaryColor() {
    n += 0.25;

    const root = document.documentElement;
    root.style.setProperty('--color-primary', hslToHex(n, 100, 50));
    root.style.setProperty('--color-background', hslToHex(n, 100, 95));
    root.style.setProperty('--color-foreground', hslToHex(n, 100, 15));

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
        window.location.href = `/songs/${id.value}/prev`;
    }

}

function nextSong() {
    if (isFullscreen.value === false) {
        window.location.href = `/songs/${id.value}/next`;
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


function tick() {
    requestAnimationFrame(tick);
    incrementPrimaryColor();
}

onMounted(() => {
    window.addEventListener('keyup', onKeyPress);
    tick();
});

</script>
