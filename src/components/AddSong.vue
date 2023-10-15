<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { v4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default defineComponent({
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const docRef = doc(db, "playlists", props.playlist.id);
    const error = ref<null | string>(null);

    const handleSubmit = async () => {
      try {
        const newSong = {
          title: title.value,
          artist: artist.value,
          id: v4(),
        };
        await updateDoc(docRef, {
          songs: [...props.playlist.songs, newSong],
        });
        title.value = "";
        artist.value = "";
      } catch (err: any) {
        error.value = err.message;
      }
    };

    return { title, artist, showForm, handleSubmit, error };
  },
});
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}

form {
  max-width: 100%;
  text-align: left;
}
</style>
