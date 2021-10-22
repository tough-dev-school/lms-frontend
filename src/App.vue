<template>
  <div id="app">
    <AppHeader v-if="isAuthenticated" />
    <div class="container" :class="{ 'container--auth-pages': !isAuthenticated }">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("auth", ["user"]),
  },
  created() {
    // drop it after a week or two (f213)
    if (this.user && !("uuid" in this.user)) {
      this.FETCH_USER();
    }
  },
  methods: mapActions("auth", ["FETCH_USER"]),
};
</script>
<style scoped>
.container {
  display: flex;
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 5rem;

  &--auth-pages {
    padding-top: 8%;
  }
}
</style>
