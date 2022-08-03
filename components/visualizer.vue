<template>
    <section id="visualizer">
        <div id="player">
            <div id="poster-image">
                <img :src="songArray[songIndex].imgSrc"
                     alt="Currently Playing Song Poster Image"/>
            </div>

            <div id="interactive-area">
                <h1>
                    <span>SLIME</span>
                    <svg id="logo"
                         viewBox="0 0 384 128"
                         x="0px"
                         y="0px">
                        <path d="M153.85,15.3c0.08,0.41,0.19,0.81,0.31,1.22c0.12,0.4,0.26,0.79,0.42,1.18c0.16,0.38,0.34,0.77,0.54,1.13
                                c0.19,0.37,0.41,0.73,0.64,1.08c0.23,0.35,0.49,0.69,0.75,1.01c0.26,0.33,0.55,0.64,0.84,0.93c0.29,0.29,0.61,0.58,0.93,0.84
                                c0.32,0.27,0.66,0.52,1.01,0.75c0.35,0.23,0.71,0.45,1.07,0.64c0.37,0.2,0.75,0.38,1.13,0.54c0.38,0.16,0.78,0.3,1.18,0.42
                                c0.4,0.12,0.81,0.22,1.22,0.31c0.41,0.08,0.83,0.15,1.24,0.19c0.42,0.04,0.84,0.06,1.26,0.06c0.42,0,0.84-0.02,1.26-0.06
                                c0.41-0.04,0.83-0.1,1.24-0.19c0.41-0.08,0.81-0.19,1.22-0.31c0.4-0.12,0.79-0.26,1.18-0.42c0.38-0.16,0.77-0.34,1.13-0.54
                                c0.37-0.19,0.73-0.41,1.07-0.64c0.35-0.23,0.69-0.48,1.01-0.75c0.33-0.26,0.64-0.55,0.93-0.84s0.58-0.61,0.84-0.93
                                c0.27-0.32,0.52-0.66,0.75-1.01c0.23-0.35,0.45-0.7,0.64-1.08c0.2-0.36,0.38-0.75,0.54-1.13c0.16-0.38,0.3-0.78,0.42-1.18
                                c0.12-0.4,0.22-0.81,0.31-1.22c0.08-0.41,0.15-0.83,0.19-1.24c0.04-0.42,0.06-0.84,0.06-1.26c0-0.42-0.02-0.84-0.06-1.26
                                c-0.04-0.41-0.1-0.83-0.19-1.24c-0.08-0.4-0.19-0.81-0.31-1.22c-0.12-0.4-0.26-0.79-0.42-1.18c-0.16-0.38-0.34-0.77-0.54-1.13
                                c-0.19-0.36-0.41-0.73-0.64-1.08c-0.23-0.35-0.48-0.69-0.75-1.01c-0.26-0.33-0.55-0.64-0.84-0.93s-0.61-0.58-0.93-0.84
                                c-0.32-0.26-0.66-0.52-1.01-0.75c-0.35-0.23-0.7-0.45-1.07-0.64c-0.37-0.2-0.75-0.38-1.13-0.54c-0.38-0.16-0.78-0.3-1.18-0.42
                                c-0.4-0.12-0.81-0.22-1.22-0.31c-0.41-0.08-0.83-0.14-1.24-0.19c-0.84-0.08-1.68-0.08-2.52,0c-0.41,0.05-0.83,0.1-1.24,0.19
                                c-0.4,0.08-0.81,0.19-1.22,0.31c-0.4,0.12-0.79,0.26-1.18,0.42c-0.38,0.16-0.77,0.34-1.13,0.54c-0.36,0.19-0.73,0.41-1.07,0.64
                                c-0.35,0.23-0.69,0.49-1.01,0.75c-0.33,0.26-0.64,0.55-0.93,0.84c-0.29,0.29-0.58,0.61-0.84,0.93c-0.26,0.32-0.52,0.66-0.75,1.01
                                c-0.23,0.35-0.45,0.71-0.64,1.08c-0.2,0.36-0.38,0.75-0.54,1.13c-0.16,0.38-0.3,0.78-0.42,1.18c-0.12,0.4-0.22,0.81-0.31,1.22
                                c-0.08,0.41-0.15,0.83-0.19,1.24c-0.04,0.42-0.06,0.84-0.06,1.26c0,0.42,0.02,0.84,0.06,1.26C153.7,14.47,153.77,14.89,153.85,15.3z
                                "/>
                        <path d="M371.2,102.4h-38.4V76.8h12.8c7.07,0,12.8-5.73,12.8-12.8c0-7.07-5.73-12.8-12.8-12.8h-12.8V38.45
                                c0.01-1.41-0.12-6.62-2.15-12.85h40.55c7.07,0,12.8-5.73,12.8-12.8S378.27,0,371.2,0h-75.6c-0.17,0-0.34,0.02-0.51,0.03
                                c-0.18,0-0.35-0.02-0.54-0.02c-12.65-0.15-20.92,4.46-25.91,8.87c-6.53-5.67-15.17-8.75-25.29-8.87
                                c-13.98-0.16-22.6,5.48-27.37,10.24c-10.87,10.87-11.2,26-11.19,28.2V51.2h-38.4c-7.07,0-12.8,5.73-12.8,12.8v38.4h-12.71
                                c-7.11-0.11-9.55-2.9-10.89-5.33c-1.76-3.2-1.97-6.8-1.99-7.39c0,0,0,0,0,0c0-0.03,0-0.05,0-0.06c0-0.01,0-0.01,0-0.02V12.8
                                C128,5.73,122.27,0,115.2,0H38.4c-1.57,0-9.86,0.22-18.52,4.55C7.06,10.96,0,22.98,0,38.4s7.06,27.44,19.88,33.85
                                c8.46,4.23,16.56,4.54,18.4,4.55c1.16,0.03,4.73,0.47,7.67,2.1c2.6,1.43,5.25,3.82,5.25,10.7s-2.65,9.27-5.25,10.7
                                c-2.94,1.62-6.48,2.06-7.66,2.1H12.8c-7.07,0-12.8,5.73-12.8,12.8c0,7.07,5.73,12.8,12.8,12.8h25.6c1.57,0,9.86-0.22,18.52-4.55
                                c12.82-6.41,19.88-18.43,19.88-33.85s-7.06-27.44-19.88-33.85c-8.46-4.23-16.57-4.54-18.4-4.55c-1.17-0.04-4.73-0.48-7.67-2.1
                                c-2.6-1.43-5.25-3.82-5.25-10.7s2.65-9.27,5.25-10.7c2.94-1.62,6.48-2.06,7.66-2.1h63.89v63.95c-0.01,1.82,0.19,9.93,4.42,18.43
                                c6.32,12.72,18.33,19.83,33.82,20.02c0.05,0,0.11,0,0.16,0h25.6c7.07,0,12.8-5.73,12.8-12.8V76.8h38.4c7.07,0,12.8-5.73,12.8-12.8
                                V38.4c0-0.05,0-0.11,0-0.16c-0.01-1.01,0.58-6.78,3.7-9.9c0.7-0.7,2.85-2.82,8.95-2.75c7.16,0.09,9.62,2.9,10.96,5.33
                                c1.84,3.34,1.99,7.1,2,7.44c0,0.01,0,0.01,0,0.02c0,0,0,0,0,0v76.8c0,7.07,5.73,12.8,12.8,12.8c7.07,0,12.8-5.73,12.8-12.8V38.43
                                c0-0.09,0-0.18,0-0.29c0.03-1.26,0.68-6.77,3.69-9.79c0.69-0.69,2.75-2.75,8.63-2.75c0.1,0,0.21,0,0.32,0
                                c7.16,0.09,9.62,2.9,10.96,5.33c1.76,3.2,1.97,6.8,1.99,7.39c0,0,0,0,0,0c0,0.03,0,0.05,0,0.06c0,0.01,0,0.01,0,0.02v76.8
                                c0,7.07,5.73,12.8,12.8,12.8h51.2c7.07,0,12.8-5.73,12.8-12.8C384,108.13,378.27,102.4,371.2,102.4z"/>
                    </svg>
                </h1>

                <h2>
                    <marquee direction="left">
                        {{ songArray[songIndex].title }}
                    </marquee>
                </h2>

                <div id="buttons">
                    <button id="prev"
                            class="button"
                            @click="onPrevClick">
                        <svg fill="none"
                             height="14"
                             viewBox="0 0 17 14"
                             width="17"
                             xmlns="http://www.w3.org/2000/svg">
                            <line x1="16"
                                  x2="2"
                                  y1="7"
                                  y2="7"/>
                            <path d="M7 1L0.999999 7L7 13"/>
                        </svg>

                        <span>Previous</span>
                    </button>

                    <button v-if="!isPlaying"
                            class="button button--large"
                            @click="onPlayClick">
                        <svg fill="none"
                             height="30"
                             style="transform: translateX(3px)"
                             viewBox="0 0 26 30"
                             width="26"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 15L0.999999 28.8564L1 1.14359L25 15Z"
                                  stroke="#88C5A3"
                                  stroke-linejoin="round"
                                  stroke-width="2"/>
                        </svg>
                        <span>Play</span>
                    </button>

                    <button v-if="isPlaying"
                            class="button button--large"
                            @click="onPauseClick">
                        <svg fill="none"
                             height="34"
                             viewBox="0 0 34 34"
                             width="34"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect height="32"
                                  rx="4"
                                  stroke="#88C5A3"
                                  stroke-width="2"
                                  width="8"
                                  x="1"
                                  y="1"/>
                            <rect height="32"
                                  rx="4"
                                  stroke="#88C5A3"
                                  stroke-width="2"
                                  width="8"
                                  x="25"
                                  y="1"/>
                        </svg>
                        <span>Pause</span>
                    </button>

                    <button class="button"
                            @click="onNextClick">
                        <svg fill="none"
                             height="14"
                             viewBox="0 0 17 14"
                             width="17"
                             xmlns="http://www.w3.org/2000/svg">
                            <line x1="1"
                                  x2="15"
                                  y1="7"
                                  y2="7"/>
                            <path d="M10 13L16 7L10 1"/>
                        </svg>
                        <span>Next</span>
                    </button>
                </div>
            </div>
        </div>

        <div id="analyser"
             :style="{
                color: `${songArray[songIndex].primaryColor}`,
                filter: `drop-shadow(0 0 var(--line-height) ${songArray[songIndex].glowColor})`
             }">
            <div v-for="(v,i) in points"
                 :key="i"
                 :style="{
                    height: `${115 * (v / 255)}%`,
                 }"
            ></div>
        </div>

        <audio id="audio"
               :src="songArray[songIndex].audioSrc">
        </audio>
    </section>
</template>

<script lang="ts"
        setup>
import {onMounted, Ref, ref} from 'vue';


let windowWidth: number = 0;
let windowHeight: number = 0;
let maxHeight: number = 0;
let fftSize: number = 256;
let fps = 12;
let then = Date.now();
let now = Date.now();
let elapsed = 0;

const songArray: Array<{}> = [
    {
        audioSrc: '/audio/2022-07-30.mp3',
        imgSrc: '/images/THE_RADNESS_I_am_slime_2b7ef6f0-72b0-43cc-819e-c6e931b57281.png',
        title: 'Meditation: 2022-07-30',
        glowColor: 'rgba(79,31,82,0.75)',
        primaryColor: '#4f1f52'
    },
    {
        audioSrc: '/audio/2022-07-22.mp3',
        glowColor: 'rgba(55, 154, 114, 0.75)',
        primaryColor: '#379A72',
        imgSrc: '/images/THE_RADNESS_I_am_slime_3279a317-9b68-4840-9eb3-3d94e80e394b.png',
        title: 'Meditation: 2022-07-22'
    },
    {
        audioSrc: '/audio/2022-07-20.mp3',
        glowColor: 'rgba(175,79,93,0.75)',
        imgSrc: '/images/THE_RADNESS_I_am_slime_eab2de4f-a06a-4008-be43-405d4d4f8813.png',
        primaryColor: '#af4f5d',
        title: 'Meditation: 2022-07-20'
    },
    {
        audioSrc: '/audio/2022-07-07.mp3',
        glowColor: 'rgba(217,87,26,0.75)',
        imgSrc: '/images/THE_RADNESS_I_am_slime_ecb4c730-6e54-40c2-ab3a-858e287c2a39.png',
        primaryColor: '#D9571A',
        title: 'Meditation: 2022-07-07'
    }

];

let audioElement: HTMLAudioElement;
let audioContext: AudioContext;
let analyser: AnalyserNode;
let sourceNode: MediaElementAudioSourceNode;

let visualizerInit: boolean = false;

// Template variables
const hRef: Ref<number> = ref(0);
const wRef: Ref<number> = ref(0);
const isPlaying: Ref<boolean> = ref(false);
const songIndex: Ref<number> = ref(0);
let points: Ref<Array<number>> = ref([]);
let c: Ref<number> = ref(0);

function play() {
    if (audioElement.readyState >= 2) {
        audioElement.play();
        isPlaying.value = true;
    } else {
        setTimeout(play, 500);
    }
}

function pause() {
    audioElement.pause();
    isPlaying.value = false;
}

function prev() {
    pause();

    songIndex.value--;
    if (songIndex.value < 0) {
        songIndex.value = songArray.length - 1;
    }
    audioElement.load();

    play();
}

function next() {
    pause();

    songIndex.value++;
    if (songIndex.value >= songArray.length) {
        songIndex.value = 0;
    }
    audioElement.load();


    play();
}

function draw(): void {
    let freqArray: Uint8Array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(freqArray);
    points.value = [...freqArray];
    c.value += 0.125;
}

function tick(): void {
    requestAnimationFrame(tick);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > 1000 / fps) {
        then = now - (elapsed % 1000 / fps);
        draw();
    }
}

function initElements(): void {
    audioElement = <HTMLAudioElement>document.getElementById('audio');
}

function initListeners(): void {
    window.addEventListener('resize', onResize);
    audioElement.addEventListener('play', onPlay);
    audioElement.addEventListener('ended', onEnded);
}

function initVisualizer() {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 1;
    analyser.fftSize = fftSize;
    sourceNode = audioContext.createMediaElementSource(audioElement);
    sourceNode.connect(analyser);
    sourceNode.connect(audioContext.destination);
    onResize();
}

function onResize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    hRef.value = window.innerHeight;
    wRef.value = window.innerWidth;
    maxHeight = windowHeight;

    if (typeof analyser !== 'undefined') {
        if (windowWidth > windowHeight) {
            analyser.fftSize = 256;
        } else {
            analyser.fftSize = 128;
        }
        console.log(analyser.fftSize);
    }

}

function onPlay() {
    if (!visualizerInit) {
        console.log('init visualizer');
        initVisualizer();
        tick();
        visualizerInit = true;
    }
}

function onEnded() {
    next();
}

function onPlayClick(e) {
    e.preventDefault();
    play();
}

function onPauseClick(e) {
    e.preventDefault();
    pause();
}

function onPrevClick(e) {
    e.preventDefault();
    prev();
}

function onNextClick(e) {
    e.preventDefault();
    next();
}

onMounted(() => {
    console.log('Visualizer mounted');
    initElements();
    initListeners();
    onResize();
});
</script>
