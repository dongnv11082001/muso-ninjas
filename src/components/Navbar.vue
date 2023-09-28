<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ncs_10_years.jpeg" alt="" />
      <h1><router-link :to="{ name: 'home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <button @click="handleClick">Logout</button>
        <router-link class="btn" :to="{ name: 'signup' }">Signup</router-link>
        <router-link class="btn" :to="{ name: 'login' }">Login</router-link>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { auth } from "@/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
export default {
  setup() {
    const route = useRouter();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        route.push({ name: "home" });
      }
    });
    const handleClick = async () => {
      await signOut(auth);
      route.push({ name: "login" });
    };
    return {
      handleClick,
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav img {
  max-height: 60px;
  border-radius: 4px;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>
