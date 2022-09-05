<template>
    <section id="media-player"
             :style="{
        display: isFullScreen ? 'none' : undefined
    }">
        <button id="prev"
                class="button"
                @click="onPrevClick">
            <svg viewBox="0 0 40 40"
                 x="0px"
                 y="0px">

                <path class="st0"
                      d="M40,40V0H0v40H40z M8,8h8v8l16-8v24l-16-8v8H8V8z"/>
            </svg>

            <span>Previous</span>
        </button>

        <button v-if="!isPlaying"
                class="button"
                @click="onPlayClick">
            <svg viewBox="0 0 40 40"
                 x="0px"
                 y="0px">

                <path class="st0"
                      d="M0,0v40h40V0H0z M8,32V8l24,12L8,32z"/>
            </svg>

            <span>Play</span>
        </button>

        <button v-if="isPlaying"
                class="button"
                @click="onPauseClick">
            <svg viewBox="0 0 40 40"
                 x="0px"
                 y="0px">
                <path class="st0"
                      d="M0,0v40h40V0H0z M16,32H8V8h8V32z M32,32h-8V8h8V32z"/>
            </svg>

            <span>Pause</span>
        </button>

        <button class="button"
                @click="onNextClick">
            <svg viewBox="0 0 40 40"
                 x="0px"
                 y="0px">

                <path class="st0"
                      d="M0,0v40h40V0H0z M32,32h-8v-8L8,32V8l16,8V8h8V32z"/>
            </svg>

            <span>Next</span>
        </button>

        <audio id="audio"
               :src="currentSong.audioSrc"
               @ended="onNextClick">
        </audio>
    </section>
</template>

<script lang="ts"
        setup>
import Song from '~/utils/interfaces/Song';
import {ComputedRef, onMounted} from 'vue';

let props = defineProps({
    currentSong: {
        type: Object as () => Song,
        default: null
    },
    referenceInteger: {
        type: Number,
        default: 1024
    },
    isPlaying: {
        type: Boolean,
        default: false
    },
    isFullScreen: {
        type: Boolean,
        default: false
    },
    autoPlay: {
        type: Boolean,
        default: false
    }
});

let emit = defineEmits(['audioData', 'isPlaying', 'songProgress', 'next', 'prev']);

let audioElement: HTMLAudioElement;
let audioContext: AudioContext;
let analyser: AnalyserNode;
let sourceNode: MediaElementAudioSourceNode;
let fftSize: number = 1024;
let audioData: Array<number> = [];

let isFullScreen: ComputedRef = computed(() => {
    return props.isFullScreen;
});

function initElements(): void {
    audioElement = <HTMLAudioElement>document.getElementById('audio');
}

function initListeners(): void {
    window.addEventListener('keyup', onKeyPress);
}

function initAnalyser() {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 1;
    analyser.fftSize = fftSize;
    sourceNode = audioContext.createMediaElementSource(audioElement);
    sourceNode.connect(analyser);
    sourceNode.connect(audioContext.destination);
}

// Listeners
function onKeyPress(e) {
    switch (e.code) {
        case 'Space' :
            if (props.isPlaying === false) {
                onPlayClick(null);
            } else {
                onPauseClick(null);
            }
            break;
        case 'ArrowLeft':
            onPrevClick(null);
            break;
        case 'ArrowRight':
            onNextClick(null);
            break;
    }
}

function onPlayClick(e) {
    emit('isPlaying', true);
    audioElement.play();
}

function onPauseClick(e) {
    emit('isPlaying', false);
    audioElement.pause();
}

function onNextClick(e) {
    emit('next');
}

function onPrevClick(e) {
    emit('prev');
}

function tick() {
    requestAnimationFrame(tick);

    let freqArray: Uint8Array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(freqArray);
    audioData = [...freqArray];

    emit('audioData', audioData);

    emit('songProgress', {
        progress: audioElement.currentTime,
        duration: audioElement.duration
    });
}

onMounted(() => {
    initElements();
    initListeners();
    initAnalyser();
    tick();

    if (props.autoPlay) {
        onPlayClick(null);
    }
});

</script>
