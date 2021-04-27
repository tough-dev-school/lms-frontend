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

<style>
.app-content {
  p:last-child {
    margin-bottom: 15px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.5rem;
  }
  h1 {
    font-size: 3rem;
    line-height: 1;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1.5rem;
  }
}
</style>
