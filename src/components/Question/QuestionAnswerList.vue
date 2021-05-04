<template>
  <div v-if="answers" class="answer-list">
    <QuestionAnswer v-for="answer in answers" :key="answer.slug" :answer="answer" :question="question" />
  </div>
</template>

<script>
import QuestionAnswer from "@/components/Question/QuestionAnswer.vue";

export default {
  name: "QuestionAnswerList",
  components: {
    QuestionAnswer,
  },
  props: {
    question: { type: Object, required: true },
    answers: { type: Array, required: true },
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
