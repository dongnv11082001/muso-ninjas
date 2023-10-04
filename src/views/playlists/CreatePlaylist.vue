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
    <button>Create</button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import { auth } from "@/firebase/config";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const fileRef = ref<File | null>();
    const fileError = ref("");
    const fileTypes = ["image/png", "image/jpeg"];

    const { url, uploadImage } = useStorage();

    const handleSubmit = async () => {
      if (!auth.currentUser) {
        console.log("Please login to create a playlist");
        return;
      }
      if (fileRef.value && auth.currentUser) {
        await uploadImage(fileRef.value);
        console.log("image uploaded, url: ", url.value);
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
