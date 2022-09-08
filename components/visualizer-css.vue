<template>
    <section id="visualizer"
             :class="{
                fullscreen: videoMode
             }">
        <div id="canvas">
            <div class="scene">
                <div class="cube-group">
                    <div class="cube-group__wrapper">
                        <div v-for="(p,i) in visualizerPoints"
                             v-if="audioData"
                             :key="i"
                             :style="{
                             color: hslToHex(props.primaryColor.n, 100, (i/visualizerPoints.length)*100),
                             transform: `translate3d(calc(${p.x} * var(--cube-integer)),calc(${p.y} * var(--cube-integer)),calc(${p.z} * var(--cube-integer)))`

                         }"
                             class="cube"
                        >
                            <div :style="{transform: `scale3d(${p.s},${p.s},${p.s})`}"
                                 class="cube__face-group">
                                <div class="cube__face cube__face--front"></div>
                                <div class="cube__face cube__face--back"></div>
                                <div class="cube__face cube__face--left"></div>
                                <div class="cube__face cube__face--right"></div>
                                <div class="cube__face cube__face--top"></div>
                                <div class="cube__face cube__face--bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>

<script lang="ts"
        setup>
import {computed, ComputedRef, onMounted, Ref, ref} from 'vue';
import Color from '~/utils/interfaces/Color';

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
let cubeGroup: THREE.Group;
let cubeArray: Array<THREE.Mesh> = [];

// Template variables
let videoMode: ComputedRef<Boolean> = computed(() => props.videoMode);
let visualizerPoints: Ref<Array<{ x: number, y: number, z: number, s: number }>> = ref();


// Utilities
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

function draw() {
    if (typeof props.audioData !== 'undefined' && props.audioData.length > 0) {
        let d = props.audioData.map((n) => {
            return n;
        });

        let xyz = [];
        let x = 0;
        let y = 0;
        let z = 0;

        for (let p = 0; p < props.audioData.length; p++) {
            xyz.push({x, y, z, s: props.audioData[p] / 128});

            x++;
            if (x > cubeInteger - 1) {
                x = 0;
                y++;
            }

            if (y > cubeInteger - 1) {
                y = 0;
                z++;
            }
        }

        visualizerPoints.value = xyz;
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);

    // setTimeout(() => {
    // }, 1000 / fps);
}

function onResize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    let ratio = windowWidth / windowHeight;
}

onMounted(() => {
    window.addEventListener('resize', onResize);
    animate();
    onResize();
});
</script>
