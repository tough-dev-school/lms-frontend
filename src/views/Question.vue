<template>
  <div v-if="isLoaded && !error" class="question">
    <h1>{{ question.name }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="question__content" v-html="question.text" />
  </div>
  <div v-else-if="error" class="question question__error">
    <h2>
      Упс, что-то пошло не так <span v-if="error.length > 1">{{ error }}</span>
    </h2>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      isLoaded: false,
      error: null,
    };
  },
  computed: mapState("question", ["question"]),

  async created() {
    const { id } = this.$route.params;
    this.error = null;
    try {
      await Promise.all([this.FETCH_QUESTION({ id }), this.FETCH_ANSWERS({ question: id })]);
    } catch (e) {
      this.error = `${e.response?.status}: ${e.response?.statusText}`;
    }
    this.isLoaded = true;
  },
  methods: mapActions("question", ["FETCH_QUESTION", "FETCH_ANSWERS"]),
};
</script>
