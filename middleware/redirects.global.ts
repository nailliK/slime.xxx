import {defineNuxtRouteMiddleware, navigateTo} from '#app';
import {songs} from '~/json/songs.json';
import Song from '~/utils/interfaces/Song';

export default defineNuxtRouteMiddleware((to, from) => {
    let currentSong: Song = songs[0];
    let songIndex = 0;
    //
    // // Force navigation to the first song
    // if (to.fullPath.indexOf('songs') < 0) {
    //     return navigateTo(`/songs/${currentSong.id}`, {redirectCode: 301, replace: true});
    // } else if (!to.params.id) {
    //     return navigateTo(`/songs/${currentSong.id}`, {redirectCode: 301, replace: true});
    // }

    // check for next or previous directions
    if (typeof to.params.id !== 'undefined' && typeof to.params.id[1] !== 'undefined') {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].id === to.params.id[0]) {
                songIndex = i;
            }
        }

        if (to.params.id[1] === 'next') {
            songIndex++;
        }

        if (to.params.id[1] === 'prev') {
            songIndex--;
        }

        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        currentSong = songs[songIndex];
        return navigateTo(`/songs/${currentSong.id}?autoplay=true`, {redirectCode: 302, replace: true});

    }


});
