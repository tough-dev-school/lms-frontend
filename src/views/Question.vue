<template>
  <div v-if="isLoaded && !error" class="question">
    <h1>{{ question.name }}</h1>
    <AppContent :html="question.text" />
  </div>
  <div v-else-if="error" class="question question__error">
    <h2>Упс, что-то пошло не так <AppHTTPError :exception="error" /></h2>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

import AppContent from "@/components/AppContent.vue";
import AppHTTPError from "@/components/AppHTTPError.vue";

export default {
  components: {
    AppContent,
    AppHTTPError,
  },
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
      this.error = e;
    }
    this.isLoaded = true;
  },
  methods: mapActions("question", ["FETCH_QUESTION", "FETCH_ANSWERS"]),
};
</script>
