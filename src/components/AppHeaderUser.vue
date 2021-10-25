<template>
  <div class="header-user">
    <AppUserAvatar :user="user" />
    <div class="header-user__container">
      <AppUserName :user="user" />
      <p v-if="email" class="header-user__email">{{ email }}</p>
    </div>
  </div>
</template>
<script>
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";

export default {
  components: {
    AppUserAvatar,
    AppUserName,
  },
  props: {
    user: { type: Object, default: () => ({}) },
  },
  computed: {
    email() {
      return this.user?.email;
    },
  },
};
</script>
<style scoped>
.header-user {
  display: flex;
  align-items: center;
}
.header-user__container {
  display: none;
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
}
</style>
