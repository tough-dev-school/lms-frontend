<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="app-content" v-html="typographed" />
</template>

<script>
/* eslint-disable no-irregular-whitespace */
import richtypo from "@/utils/richtypo.js";

export default {
  props: {
    html: { type: String, required: true },
  },
  computed: {
    typographed() {
      return richtypo(this.html);
    },
  },
};
</script>

<style>
.app-content {
  p {
    @mixin robot-text-two;
  }

  h1,
  h2,
  h3 {
    font-weight: bold;
  }
  h1 {
    @mixin inter-title-one;
  }
  h2 {
    @mixin inter-title-two;
  }
  h3 {
    @mixin inter-title-three;
  }

  ul {
    list-style: "— " outside;
    padding-left: 2rem;
  }

  ol {
    list-tyle: decimal outside;
    padding-left: 2rem;
  }

  /* TODO: ask how style blockqutes */
  blockquote {
    margin: 0;
  }
}
</style>
