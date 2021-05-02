<template>
  <div id="app">
    <TheNavBar v-if="isAuthenticated" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import TheNavBar from "@/components/TheNavBar.vue";

export default {
  components: {
    TheNavBar,
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
  padding-top: 5rem;
}
</style>
