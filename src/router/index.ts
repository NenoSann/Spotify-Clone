import { createRouter, createWebHistory } from "vue-router";
import loginPage from '@/pages/loginPage.vue';
import user from "@/pages/user.vue";
import artist from '@/views/Artist.vue';
import album from '@/views/Album.vue';
import search from '@/views/Search.vue'
import Playlist from "@/views/Playlist.vue";
import MainBoard from "@/views/MainBoard.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: MainBoard,
    },
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/user/:id',
      name: 'userProfilePage',
      component: user,
      meta: {
        key: (route) => route.params.id
      }
    },
    {
      path: '/artist/:id',
      name: 'artistPage',
      component: artist,
      meta: {
        key: (route) => route.params.id
      }
    },
    {
      path: '/album/:id',
      name: 'albumPage',
      component: album,
      meta: {
        key: (route) => route.params.id
      }
    },
    {
      path: '/search/:id',
      name: 'searchPage',
      component: search,
      meta: {
        key: (route) => route.params.id
      }
    },
    {
      path: '/playlist/:id',
      name: 'playlistPage',
      component: Playlist,
      meta: {
        key: (route) => route.params.id
      }
    },
  ],
});

export default router;
