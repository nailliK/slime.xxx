import { defineNuxtRouteMiddleware, navigateTo } from '#app';

import { songs } from '~/json/songs.json';

export default defineNuxtRouteMiddleware((to) => {
  if (
    to.path === '/' ||
    to.path === '' ||
    (to.path === '/songs' && to.params.id === '')
  ) {
    return navigateTo(`/songs/${songs[0].id}`);
  }
});
