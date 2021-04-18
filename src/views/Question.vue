<template>
  <div v-if="isLoaded && !error" class="question">
    <div class="question__question">
      <h1 class="question__title">Домашняя работа: {{ question.name }}</h1>
      <AppContent :html="question.text" />
    </div>
    <div v-if="answers.length" class="question__answer-list">
      <h3>{{ answersTitle }}</h3>
      <Answer v-for="answer in answers" :key="answer.slug" :answer="answer" />
    </div>
    <PostAnswer :question="question" />
  </div>
  <div v-else-if="error" class="question question__error">
    <h2>Упс, что-то пошло не так <AppHTTPError :exception="error" /></h2>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

import AppContent from "@/components/AppContent.vue";
import AppHTTPError from "@/components/AppHTTPError.vue";

import Answer from "@/components/Homework/Answer.vue";
import PostAnswer from "@/components/Homework/PostAnswer.vue";

export default {
  components: {
    Answer,
    AppContent,
    AppHTTPError,
    PostAnswer,
  },
  data() {
    return {
      isLoaded: false,
      error: null,
    };
  },
  computed: {
    ...mapState("question", ["question"]),
    ...mapGetters("question", ["getAnswers"]),
    answers() {
      return this.getAnswers();
    },
    answersTitle() {
      return this.answers.length == 1 ? "Ваш ответ" : "Ответы";
    },
  },

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

<style scoped>
.question {
  &__question {
    margin-bottom: 5rem;
  }
  &__title {
    margin-bottom: 3rem;
  }
}
</style>
