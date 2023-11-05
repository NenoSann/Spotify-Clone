import { createRouter, createWebHistory } from "vue-router";
import app from "../App.vue";
import loginPage from '@/pages/loginPage.vue';
import homePage from "@/pages/homePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: homePage,
    },
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    }
  ],
});

export default router;
