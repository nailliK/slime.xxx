<template>
    <section id="visualizer"
             :class="{
                fullscreen: videoMode
             }">
        <div id="canvas">
            <div v-for="(p,i) in points"
                 :key="i"
                 :style="{
                transform: `rotate(${p.rotation}rad) scaleY(${p.scale})`,
            }"
                 class="point-container">
                <div class="point"></div>
            </div>
        </div>

    </section>
</template>

<script lang="ts"
        setup>
import {computed, ComputedRef, onMounted, Ref, ref} from 'vue';
import Color from '~/utils/interfaces/Color';
import Point from '~/utils/interfaces/Point';

let props = defineProps({
    audioData: {
        type: Array,
        default: []
    },
    primaryColor: {
        type: Object as () => Color,
        default: {}
    },
    referenceInteger: {
        type: Number,
        default: 512
    },
    videoMode: {
        type: Boolean,
        default: false
    }
});

let windowWidth: number = 0;
let windowHeight: number = 0;
let cubeInteger = 8;
let cubeWidth: number = cubeInteger * cubeInteger;
let fps: number = 24;

// Template variables
let videoMode: ComputedRef<Boolean> = computed(() => props.videoMode);
let points: Ref<Array<Point>> = ref();


// Utilities
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function draw() {
    let pointData = [];
    if (typeof props.audioData !== 'undefined' && props.audioData.length > 0) {
        pointData = props.audioData;
    } else {
        for (let i = 0; i < props.referenceInteger; i++) {
            pointData.push(128);
        }
    }

    points.value = [];
    let numPoints = pointData.length;
    let angleStep = (Math.PI * 2) / numPoints;
    for (let p = 0; p < numPoints; p++) {
        points.value.push({value: pointData[p], scale: pointData[p] / 128, rotation: p * angleStep});
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

function onResize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

onMounted(() => {
    window.addEventListener('resize', onResize);
    animate();
    onResize();
});
</script>
