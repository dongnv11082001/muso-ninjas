<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'createPlaylist' }" class="btn"
      >Create a New Playlist</router-link
    >
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollections";

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    if (!user.value) {
      return;
    }
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ebebeb;
}
.btn {
  margin-top: 20px;
}
</style>
