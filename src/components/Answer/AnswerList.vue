<template>
  <div class="answer-list">
    <AnswerSingleAnswer v-for="answer in answers" :key="answer.slug" :answer="answer" :question="question" class="answer-list__answer" />
  </div>
</template>
<script>
import AnswerSingleAnswer from "@/components/Answer/AnswerSingleAnswer.vue";

export default {
  components: {
    AnswerSingleAnswer,
  },
  props: {
    answers: { type: Array, required: true },
    question: { type: Object, required: true },
  },
};
</script>
<style scoped>
.answer-list {
  &__answer {
    margin-bottom: 3rem;
  }
}
</style>
