<template>
  <div class="header-user">
    <AppUserAvatar :user="user" />
    <div class="header-user__container">
      <AppUserName :user="user" />
      <p v-if="email" class="header-user__email" data-test-id="user-email">{{ email }}</p>
    </div>
    <div class="header-user__menu">
      <UiLink class="header-user__profile-link" to="/profile">Профиль</UiLink>
      <UiLink class="header-user__logout-link" href="#" @click.prevent="handleLogout">Выйти</UiLink>
    </div>
  </div>
</template>
<script>
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";
import UiLink from "@/components/ui-kit/UiLink.vue";

export default {
  components: {
    AppUserAvatar,
    AppUserName,
    UiLink,
  },
  props: {
    user: { type: Object, default: () => ({}) },
  },
  computed: {
    email() {
      return this.user?.email;
    },
  },
  methods: {
    handleLogout() {
      this.$emit("logout");
    },
  },
};
</script>
<style lang="postcss" scoped>
.header-user {
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    .header-user__menu {
      display: flex;
    }
  }

  &__profile-link,
  &__logout-link {
    width: 100%;
    height: 26px;
    margin: 0;
  }
}
.header-user__container {
  display: none;
}
.header-user__menu {
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  width: 100%;
  min-width: 100px;
  padding: 12px;
  background: var(--background);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  flex-direction: column;
}

@media (--after-mobile) {
  .header-user__container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .header-user__email {
    @mixin robot-text-three;
    margin: 0;
    color: var(--superlight);
    line-height: 1;
  }
  .header-user__menu {
    left: 0;
  }
}
</style>
