<template>
  <div id="app">
    <TheNavBar v-if="isAuthenticated" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TheNavBar from "@/components/TheNavBar.vue";

export default {
  components: {
    TheNavBar,
  },
  computed: mapGetters("auth", ["isAuthenticated"]),
};
</script>
<style scoped>
.container {
  padding-top: 5rem;
}
</style>
