<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
</template>

<script lang="ts">
import getCollection from "@/composables/getCollections";
import ListView from "@/components/ListView.vue";

export default {
  name: "Home",
  components: {
    ListView,
  },
  setup() {
    const { error, documents: playlists } = getCollection("playlists");
    return { error, playlists };
  },
};
</script>
