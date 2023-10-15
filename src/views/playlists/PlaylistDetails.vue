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
      <div v-if="!playlist.songs?.length">
        No songs have been added to this playlist yet.
      </div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <p>{{ song.title }} - {{ song.artist }}</p>
          <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
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
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { defineComponent, ref, onMounted, computed } from "vue";
import { Playlist } from "@/types/playlist";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { AddSong },
  setup(props) {
    const error = ref<null | string>("");
    const playlist = ref<Playlist>();
    const { user } = getUser();
    const docRef = doc(db, "playlists", props.id);

    onMounted(async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        playlist.value = { ...docSnap.data(), id: docSnap.id } as Playlist;
        error.value = null;
      } else {
        error.value = "That playlist does not exist";
      }
    });

    const ownership = computed(() => {
      return (
        playlist.value &&
        user.value &&
        user.value?.uid === playlist.value?.userId
      );
    });

    const handleDelete = async () => {
      try {
        await deleteDoc(docRef);
        await deleteObject(storageRef(storage, playlist.value?.filePath));
        router.push({ name: "home" });
      } catch (err: any) {
        error.value = err.message;
      }
    };

    const handleClick = async (id: string) => {
      if (!playlist.value?.songs) {
        console.log("no songs");
        return;
      }
      const filteredSongs = playlist.value?.songs.filter(
        (song) => song.id != id
      );
      await updateDoc(docRef, { songs: filteredSongs });
    };

    return {
      playlist,
      error,
      ownership,
      handleDelete,
      handleClick,
    };
  },
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
  margin-bottom: 16px;
}
</style>
