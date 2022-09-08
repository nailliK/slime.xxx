<template>
    <section id="visualizer"
             :class="{
                fullscreen: videoMode
             }">
        <div id="canvas"></div>

    </section>
</template>

<script lang="ts"
        setup>
import {computed, ComputedRef, onMounted} from 'vue';
import * as THREE from 'three';
import Color from '~/utils/interfaces/Color';
// import {RecordRTCPromisesHandler} from 'recordrtc';

// let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
// let recorder = new RecordRTCPromisesHandler();

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
let fps: number = 12;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let light: THREE.SpotLight;
let cubeGroup: THREE.Group;
let cubeArray: Array<THREE.Mesh> = [];

let cameraFOV: ComputedRef<Number> = computed(() => {

});

// Template variables
let videoMode: ComputedRef<Boolean> = computed(() => props.videoMode);

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
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    renderer.setSize(windowWidth, windowHeight);

    camera.aspect = windowWidth / windowHeight;

    camera.position.setZ((cubeWidth * cubeInteger));
    camera.position.setY((cubeWidth * cubeInteger));

    camera.fov = 1.5 * Math.atan(windowHeight / (2 * camera.position.z)) * (180 / Math.PI);
    camera.updateProjectionMatrix();

    camera.lookAt(cubeGroup.position);

    for (let p = 0; p < cubeArray.length; p++) {
        let cube: THREE.Mesh = cubeArray[p];
        cube.material.color = new THREE.Color(hslToHex(props.primaryColor.n, 100, (p / Math.pow(cubeInteger, 3)) * 100));

        if (typeof props.audioData !== 'undefined' && props.audioData.length > 0) {
            let scale = props.audioData[p] / 128;
            cube.scale.setX(scale);
            cube.scale.setY(scale);
            cube.scale.setZ(scale);
        }
    }

    cubeGroup.rotateX(0.005);
    cubeGroup.rotateY(0.005);

    renderer.render(scene, camera);
}

function animate() {
    draw();

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / fps);
}


function initVisualizer() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);
    cubeGroup = new THREE.Group();

    scene.add(cubeGroup);

    let x = 0;
    let y = 0;
    let z = 0;

    for (let i = 0; i < Math.pow(cubeInteger, 3); i++) {
        let b = cubeWidth;

        let geometry = new THREE.BoxGeometry(b, b, b);
        let material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(props.primaryColor.hex)
        });

        let cube = new THREE.Mesh(geometry, material);

        cube.position.setX(b * x);
        cube.position.setY(b * y);
        cube.position.setZ(b * z);

        cube.translateX((-(cubeWidth * cubeInteger) / 2) + cubeWidth / 2);
        cube.translateY((-(cubeWidth * cubeInteger) / 2) + cubeWidth / 2);
        cube.translateZ((-(cubeWidth * cubeInteger) / 2) + cubeWidth / 2);

        cubeArray.push(cube);
        cubeGroup.add(cube);

        x++;
        if (x >= cubeInteger) {
            x = 0;
            y++;
        }

        if (y >= cubeInteger) {
            y = 0;
            z++;
        }

        if (z >= cubeInteger) {
            z = 0;
        }
    }

    //cubeGroup.position.setY(cubeWidth * cubeInteger * 2);

    animate();
}

function onResize() {


}

onMounted(() => {
    initVisualizer();
    window.addEventListener('resize', onResize);
});
</script>
