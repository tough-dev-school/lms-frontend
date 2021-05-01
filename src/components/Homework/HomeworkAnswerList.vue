<template>
  <div v-if="answers" class="answer-list">
    <Answer
      v-for="answer in answers"
      :key="answer.slug"
      :answer="answer"
      :question="question"
      :class="{ 'answer-list__answer--root': !parent }"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Answer from "@/components/Homework/HomeworkAnswer.vue";

export default {
  name: "HomeworkAnswerList",
  components: {
    Answer,
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
    ...mapGetters("question", ["getAnswers"]),
    answers() {
      const parent = this.parent ? this.parent.slug : null;
      return this.getAnswers({ parent });
    },
  },
};
</script>
<style scoped>
.answer-list {
  &__answer {
    &--root {
      margin-bottom: 5rem;
    }
  }
}
</style>
