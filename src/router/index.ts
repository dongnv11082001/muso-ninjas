import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import CreatePlaylist from "@/views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "@/views/playlists/PlaylistDetails.vue";
import { auth } from "@/firebase/config";

const requireAuth = (to: any, from: any, next: any) => {
  if (!auth.currentUser) {
    next({ name: "login" });
  } else {
    next();
  }
};

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
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "playlistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
