import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import { auth } from "@/firebase/config";

const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
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
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/auth/Signup.vue"),
  },
  {
    path: "/playlists/create",
    name: "createPlaylist",
    component: () => import("@/views/playlists/CreatePlaylist.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "playlistDetails",
    component: () => import("@/views/playlists/PlaylistDetails.vue"),
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/playlists/user",
    name: "userPlaylists",
    component: () => import("@/views/playlists/UserPlaylists.vue"),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
