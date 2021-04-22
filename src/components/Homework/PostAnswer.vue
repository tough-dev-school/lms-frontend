<template>
  <form class="post-answer" @submit.prevent="submit">
    <label for="answer-text">Ваш ответ</label>
    <AppTextInput
      id="answer-text"
      ref="input"
      v-model="text"
      :disabled="isLoading"
      :save-data-to="answerIdForSavingUserInput"
      @submit="submit"
    />
    <input type="submit" value="Отправить" :disabled="isLoading" />
  </form>
</template>

<script>
import { mapActions } from "vuex";

import AppTextInput from "@/components/AppTextInput.vue";

export default {
  components: {
    AppTextInput,
  },
  props: {
    question: { type: Object, required: true },
  },
  data() {
    return {
      text: null,
      isLoading: false,
    };
  },
  computed: {
    answerIdForSavingUserInput() {
      return `answer-${this.question.slug}`;
    },
  },
  methods: {
    ...mapActions("question", ["POST_ANSWER"]),
    async submit() {
      this.isLoading = true;
      const { text } = this;
      await this.POST_ANSWER({
        question: this.question.slug,
        answer: { text },
      });
      this.isLoading = false;
      this.$refs.input.clear();
    },
  },
};
</script>
