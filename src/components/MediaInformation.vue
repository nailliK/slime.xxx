<template>
    <header id="media-information">
        <h2>{{ currentSong.title }}</h2>
        <h3>
            <span>{{ formatTimeString(songProgress.progress) }}</span>
            <span>/</span>
            <span>{{ formatTimeString(songProgress.duration) }}</span>
        </h3>
    </header>
</template>

<script lang="ts"
        setup>
import Song from '@/utils/interfaces/Song';
import SongProgress from '@/utils/interfaces/SongProgress';

let props = defineProps({
    currentSong: {
        type: Object as () => Song,
        default: undefined
    },
    songProgress: {
        type: Object as () => SongProgress,
        default: undefined
    }
});

function formatTimeString(s) {
    if (isNaN(s)) {
        s = 0;
    }

    return new Date(s * 1000).toISOString().substr(11, 11).replace('.', ':');
}
</script>
