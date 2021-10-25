<template>
  <AppContainer class="app-header" tag="header">
    <section class="app-header__container">
      <AppHeaderUser class="app-header__user-block" :user="user" /> (
      <UiLink class="app-header__logout-link" href="#" @click.prevent="logout">Выйти</UiLink>
      )
    </section>
  </AppContainer>
</template>
<script>
import { mapMutations, mapState } from "vuex";

import AppHeaderUser from "@/components/AppHeaderUser.vue";
import AppContainer from "@/components/AppContainer.vue";
import UiLink from "@/components/ui-kit/UiLink.vue";

export default {
  components: {
    AppContainer,
    AppHeaderUser,
    UiLink,
  },
  computed: mapState("auth", ["user"]),
  methods: {
    ...mapMutations("auth", ["RESET"]),
    logout() {
      this.RESET();
      this.$router.push({
        name: "Login",
        query: { next: this.$route.fullPath },
      });
    },
  },
};
</script>
<style scoped>
.app-header {
  display: flex;
  width: 100%;
}
.app-header__container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 10px;
}
.app-header__user-block {
  margin-right: 16px;
}
.app-header__logout-link {
  margin: 0;
}
</style>
