import { createRouter, createWebHistory } from "vue-router";
import loginPage from '@/pages/loginPage.vue';
import homePage from "@/pages/homePage.vue";
import user from "@/pages/user.vue";
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
      path: '/user',
      name: 'userProfilePage',
      component: user
    }
  ],
});

export default router;
