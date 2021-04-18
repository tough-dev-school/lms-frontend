<template>
  <div v-if="isLoaded" class="question">
    <h1>{{ question.name }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="question__content" v-html="question.text" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: mapState("homework", ["question"]),

  async created() {
    const { id } = this.$route.params;
    await this.FETCH_QUESTION({ id });
    this.isLoaded = true;
  },
  methods: mapActions("homework", ["FETCH_QUESTION"]),
};
</script>
