<template>
  <div class="app-collapsible">
    <button type="button" class="app-collapsible__btn button button-clear" @click="isCollapsed = !isCollapsed">{{ title }}</button>
    <div class="app-collapsible__content" :class="{ 'app-collapsible__content--collapsed': isCollapsed }">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, required: false, default: "Раскрыть" },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
};
</script>

<style scoped>
.app-collapsible {
  &__btn {
    padding: 0;
  }
  &__content {
    padding-left: 3rem;
    &--collapsed {
      display: none;
    }
  }
}
</style>
