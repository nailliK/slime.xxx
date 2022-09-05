import {defineNuxtPlugin, navigateTo} from '#app';
import {songs} from '~/json/songs.json';
import Song from '~/utils/interfaces/Song';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:error', () => {
        let currentSong: Song = songs[0];
        let songIndex = 0;

        // Force navigation to the first song
        return navigateTo(`/songs/${currentSong.id}?autoplay=true`, {redirectCode: 301, replace: true});

    });
});
