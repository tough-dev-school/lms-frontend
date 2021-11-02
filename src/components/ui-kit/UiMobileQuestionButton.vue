<template>
  <button class="mobile-question-button" v-on="{ ...$listeners }">?</button>
</template>
<script>
export default {};
</script>
<style scoped>
.mobile-question-button {
  @mixin inter-title-default;
  @mixin base-hover;
  position: fixed;
  right: 16px;
  bottom: 32px;
  z-index: 1;
  width: 48px;
  height: 48px;
  padding: 0;
  color: var(--background);
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  vertical-align: middle;
  border: none;
  border-radius: 999px;
  background: var(--large-hover);
}
@media (--after-mobile) {
  .mobile-question-button {
    display: none;
  }
}
</style>
