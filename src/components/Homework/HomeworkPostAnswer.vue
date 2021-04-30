<template>
  <PostAnswer ref="input" :question="question" :parent="parent" @submit="submit" />
</template>

<script>
import { mapActions } from "vuex";

import PostAnswer from "@/components/Answer/PostAnswer.vue";

export default {
  components: {
    PostAnswer,
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
  computed: {
    answerIdForSavingUserInput() {
      return `answer-${this.question.slug}-${this.parent?.slug}`;
    },
  },
  methods: {
    ...mapActions("question", ["POST_ANSWER"]),
    async submit({ question, answer }) {
      await this.POST_ANSWER({ question, answer });
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
