<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="app-content" v-html="html" />
</template>

<script>
export default {
  props: {
    html: { type: String, required: true },
  },
};
</script>
