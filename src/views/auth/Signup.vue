<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>
<script lang="ts">
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
export default {
  setup() {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const isPending = ref(false);
    const error = ref("");

    const handleSubmit = async () => {
      try {
        isPending.value = true;
        const user = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        await updateProfile(user.user, { displayName: displayName.value });
      } catch (err: any) {
        isPending.value = false;
        error.value = "Email is already in use";
      }
    };
    return {
      error,
      isPending,
      email,
      password,
      handleSubmit,
      displayName,
    };
  },
};
</script>
