<template>
  <div v-if="isLoaded && !error" class="question">
    <div class="question__question">
      <h1 class="question__title">Домашняя работа: {{ question.name }}</h1>
      <AppContent :html="question.text" />
    </div>
    <div v-if="answers.length" class="question__answer-list">
      <h3>{{ answersTitle }}</h3>
      <AnswerList :question="question" />
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

import AnswerList from "@/components/Homework/AnswerList.vue";
import PostAnswer from "@/components/Homework/PostAnswer.vue";

export default {
  components: {
    AppContent,
    AnswerList,
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
    ...mapGetters("question", ["getAnswers", "filterAnswers"]),
    answers() {
      const parent = this.parent ? this.parent.slug : null;
      return this.getAnswers({ parent });
    },
    answersTitle() {
      return this.answers.length == 1 ? "Ваш ответ" : "Ответы";
    },
    particularAnswerId() {
      // slug of the requested answer
      const { hash } = this.$route;
      return hash ? hash.split("#")[1] : null;
    },
    particularAnswerIsLoaded() {
      const { particularAnswerId } = this;
      return particularAnswerId && this.filterAnswers({ slug: particularAnswerId }).length == 1;
    },
  },

  async created() {
    const { id } = this.$route.params;
    this.error = null;
    try {
      await Promise.all([this.FETCH_QUESTION({ id }), this.FETCH_ANSWERS({ question: id })]);
      this.scrollToLoadedAnswer();
    } catch (e) {
      this.error = e;
    }
    this.isLoaded = true;
  },
  methods: {
    ...mapActions("question", ["FETCH_QUESTION", "FETCH_ANSWERS", "FETCH_PARTICULAR_ANSWER"]),
    async scrollToLoadedAnswer() {
      if (this.particularAnswerId) {
        if (!this.particularAnswerIsLoaded) {
          await this.FETCH_PARTICULAR_ANSWER({ question: this.question.slug, answer: this.particularAnswerId });
        }
        await this.$nextTick();
        this.$scrollTo(document.getElementById(this.particularAnswerId));
      }
    },
  },
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
