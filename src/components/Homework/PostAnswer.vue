<template>
  <form class="post-answer" @submit.prevent="submit">
    <label for="answer-text">Ваш ответ</label>
    <textarea id="answer-text" v-model="text" :disabled="isLoading" />
    <input type="submit" value="Отправить" :disabled="isLoading" />
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    question: { type: Object, required: true },
  },
  data() {
    return {
      text: null,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("question", ["POST_ANSWER"]),
    async submit() {
      this.isLoading = true;
      await this.POST_ANSWER({
        question: this.question.slug,
        answer: { text: this.text },
      });
      this.isLoading = false;
      this.text = null;
    },
  },
};
</script>
