<template>
  <form class="post-answer" @submit.prevent="submit">
    <label for="answer-text">Ваш ответ</label>
    <AppEditor
      id="answer-text"
      ref="input"
      v-model="text"
      :disabled="isLoading"
      :save-data-to="answerIdForSavingUserInput"
      @submit="submit"
    />
    <input type="submit" value="Отправить" class="post-answer__submit" :disabled="isLoading" />
  </form>
</template>

<script>
import { mapActions } from "vuex";

import AppEditor from "@/components/AppEditor.vue";

export default {
  components: {
    AppEditor,
  },
  props: {
    question: { type: Object, required: true },
    parent: {
      required: false,
      default: null,
      validator: (prop) => {
        return typeof prop === "object" || prop === null;
      },
    },
  },
  data() {
    return {
      text: null,
      isLoading: false,
    };
  },
  computed: {
    answerIdForSavingUserInput() {
      return `answer-${this.question.slug}-${this.parent?.slug}`;
    },
  },
  methods: {
    ...mapActions("question", ["POST_ANSWER", "FETCH_ANSWERS"]),
    async submit() {
      this.isLoading = true;
      const { text } = this;
      const parent = this.parent ? this.parent.slug : null;
      const question = this.question.slug;
      await this.POST_ANSWER({
        answer: { text, parent, question },
      });
      await this.FETCH_ANSWERS({ question });
      this.isLoading = false;
      this.$refs.input.clear();
      this.$emit("submitted");
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style scoped>
.post-answer {
  &__submit {
    margin-top: 1rem;
  }
}
</style>
