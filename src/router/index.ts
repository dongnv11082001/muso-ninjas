import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "createPlaylist",
    component: CreatePlaylist,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
