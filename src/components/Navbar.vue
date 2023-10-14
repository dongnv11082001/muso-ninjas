<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ncs_10_years.jpeg" alt="" />
      <h1><router-link :to="{ name: 'home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="currentUser">
          <router-link :to="{ name: 'createPlaylist' }">
            Create playlist
          </router-link>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { auth } from "@/firebase/config";
import router from "@/router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
export default {
  setup() {
    const currentUser = ref(auth.currentUser);
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user;
    });
    const handleClick = async () => {
      await signOut(auth);
      router.push({ name: "login" });
    };
    return {
      handleClick,
      currentUser,
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
}
nav .links a:hover {
  text-decoration: underline;
}
</style>
