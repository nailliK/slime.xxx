<template>
    <div id="init-screen"
         @click="toggleInit">
        <div class="init-message">
            Heads-up! This website plays audio and video. Tap or click anywhere to start.
        </div>
    </div>
</template>

<script lang="ts"
        setup>
let emit = defineEmits(['init']);

function toggleInit() {
    emit('init', true);
}
</script>
