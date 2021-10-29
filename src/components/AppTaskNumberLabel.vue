<template>
  <p class="task-number">{{ text }}</p>
</template>
<script>
export default {
  props: {
    text: { type: String, default: "" },
  },
};
</script>
<style scoped>
.task-number {
  @mixin robot-text-one;
  padding: 4px 8px;
  width: fit-content;
  color: var(--background);
  background: var(--basic);
}
</style>
