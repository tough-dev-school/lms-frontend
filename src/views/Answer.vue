<template>
  <div v-if="isLoaded && !error" class="answer">
    <div class="answer__quetion">
      <h1 class="answer__question-title">{{ question.name }}, ответ пользователя <AppUserName :user="answer.author" /></h1>
      <AppCollapsible title="Почитать задание">
        <AppContent :html="question.text" />
      </AppCollapsible>
    </div>
    <HomeworkAnswer :answer="answer" :question="question" class="answer__answer" read-only-root />
    <PostAnswer :parent="answer" :question="question" @submit="postAnswer" class="answer__post-answer" />
  </div>
  <div v-else-if="error" class="question question__error">
    <h2>Упс, что-то пошло не так <AppHTTPError :exception="error" /></h2>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AppContent from "@/components/AppContent.vue";
import AppHTTPError from "@/components/AppHTTPError.vue";
import AppCollapsible from "@/components/AppCollapsible.vue";
import AppUserName from "@/components/AppUserName.vue";
import PostAnswer from "@/components/Answer/PostAnswer.vue";
import HomeworkAnswer from "@/components/Homework/HomeworkAnswer.vue";

export default {
  components: {
    HomeworkAnswer,
    AppContent,
    AppCollapsible,
    AppHTTPError,
    AppUserName,
    PostAnswer,
  },
  data() {
    return {
      isLoaded: false,
      error: null,
    };
  },
  computed: {
    ...mapState("answer", ["question", "answer"]),
  },
  async created() {
    const { id } = this.$route.params;
    this.error = null;
    try {
      await this.FETCH_ANSWER({ id });
    } catch (e) {
      this.error = e;
    }
    this.isLoaded = true;
  },
  methods: {
    ...mapActions("answer", ["FETCH_ANSWER", "POST_ANSWER"]),
    postAnswer({ answer }) {
      this.POST_ANSWER({ answer });
    },
  },
};
</script>
