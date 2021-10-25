<template>
  <component :is="tag" class="app-container">
    <slot />
  </component>
</template>
<script>
export default {
  props: {
    tag: { type: String, default: "div" },
  },
};
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: auto;
}
</style>
