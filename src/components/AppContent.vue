<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="app-content" v-html="typographed" />
</template>

<script>
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
    line-height: 2.9rem;
    font-size: 17px;
  }
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

@media (--desktop) {
  .app-content {
    p {
      line-height: 3.2rem;
      font-size: 18px;
    }
  }
}
</style>
