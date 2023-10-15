<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.cover" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.username }}</p>
      <p class="description">{{ playlist.description }}</p>
    </div>
    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <p>{{ song.title }} - {{ song.artist }}</p>
          <button v-if="ownership">Delete</button>
        </div>
      </div>
      <AddSong :playlist="playlist" />
    </div>
  </div>
  <button v-if="ownership" @click="handleDelete">Delete playlist</button>
</template>

<script lang="ts">
import AddSong from "@/components/AddSong.vue";
import getUser from "@/composables/getUser";
import { db, storage } from "@/firebase/config";
import router from "@/router";
import { getDoc, doc, DocumentData, deleteDoc } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { defineComponent, ref, onMounted, computed } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const error = ref<null | string>("");
    const document = ref<DocumentData | null>(null);
    const { user } = getUser();
    const docRef = doc(db, "playlists", props.id);
    onMounted(async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        document.value = { ...docSnap.data(), id: docSnap.id };
        error.value = null;
      } else {
        error.value = "That playlist does not exist";
      }
    });
    const ownership = computed(() => {
      return (
        document.value &&
        user.value &&
        user.value?.uid === document.value?.userId
      );
    });
    const handleDelete = async () => {
      try {
        await deleteDoc(docRef);
        await deleteObject(storageRef(storage, document.value?.filePath));
        router.push({ name: "home" });
      } catch (err: any) {
        error.value = err.message;
      }
    };
    return {
      playlist: document,
      error,
      ownership,
      handleDelete,
    };
  },
  components: { AddSong },
});
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  width: 100%;
  margin: 0 auto;
}

.cover img {
  max-width: 100%;
}

.playlist-info {
  text-align: center;
}

.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.playlist-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}

.description {
  text-align: left;
}
.details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
