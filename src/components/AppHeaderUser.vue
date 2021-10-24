<template>
  <div class="header-user">
    <div class="header-user__circle">
      <p class="header-user__abbreviation">{{ abbreviation }}</p>
    </div>
    <div class="header-user__container">
      <p class="header-user__name">{{ name }}</p>
      <p v-if="email" class="header-user__email">{{ email }}</p>
    </div>
  </div>
</template>
<script>
import getUserName from "@/utils/getUserName.js";
import getAbbreviation from "@/utils/getAbbreviation.js";

export default {
  props: {
    user: { type: Object, default: () => ({}) },
  },
  computed: {
    email() {
      return this.user?.email;
    },
    name() {
      return getUserName(this.user);
    },
    abbreviation() {
      return getAbbreviation(this.name);
    },
  },
};
</script>
<style scoped>
.header-user {
  display: flex;
  align-items: center;
}
.header-user__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 8px;
  background: black;
  border-radius: 999px;
}
.header-user__abbreviation {
  @mixin robot-text-two;
  margin: 0;
  color: var(--background);
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
  .header-user__name {
    @mixin robot-text-two;
    margin: 0;
    line-height: 1;
  }
  .header-user__email {
    @mixin robot-text-three;
    margin: 0;
    color: var(--superlight);
    line-height: 1;
  }
}
</style>
