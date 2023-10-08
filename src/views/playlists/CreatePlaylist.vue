<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title" />
    <textarea
      placeholder="Playlist description"
      v-model="description"
    ></textarea>
    <label>Upload cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import getUser from "@/composables/getUser";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const fileRef = ref<File | null>();
    const fileError = ref("");
    const fileTypes = ["image/png", "image/jpeg"];
    const isPending = ref(false);
    const { user } = getUser();

    const { url, uploadImage } = useStorage();

    const handleSubmit = async () => {
      if (!user) {
        console.log("Please login to create a playlist");
        return;
      }
      if (fileRef.value) {
        isPending.value = true;
        await uploadImage(fileRef.value);
        try {
          const collectionRef = collection(db, "playlists");
          await addDoc(collectionRef, {
            title: title.value,
            description: description.value,
            cover: url.value,
            userId: user.value?.uid,
            username: user.value?.displayName,
            createdAt: serverTimestamp(),
          });
        } catch (err: any) {
          isPending.value = false;
          console.log(err.message);
        }
      }
    };

    const handleChange = (e: Event) => {
      const inputElement = e.target as HTMLInputElement;
      if (
        inputElement.files &&
        fileTypes.includes(inputElement.files[0].type)
      ) {
        const selected = inputElement.files[0];
        fileRef.value = selected;
      } else {
        fileRef.value = null;
        fileError.value = "Please select an image file (png or jpeg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
    };
  },
};
</script>

<style scoped>
input[type="file"] {
  border: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}

button {
  margin-top: 20px;
}
</style>
