<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>
<script lang="ts">
import { auth } from "@/firebase/config";
import router from "@/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const isPending = ref(false);
    const error = ref("");

    const handleSubmit = async () => {
      try {
        isPending.value = true;
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push({ name: "home" });
      } catch (err: any) {
        isPending.value = false;
        error.value = "Incorrect login credentials";
      }
    };
    return {
      error,
      isPending,
      email,
      password,
      handleSubmit,
    };
  },
};
</script>
