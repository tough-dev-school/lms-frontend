<template>
  <ul class="answer-list">
    <li class="answer-list__item">
      <AnswerSingleAnswer
        v-for="answer in answers"
        :key="answer.slug"
        :answer="answer"
        :question="question"
        class="answer-list__answer"
        v-on="$listeners"
      />
    </li>
  </ul>
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
  display: flex;
  flex-direction: column;
}
.answer-list__item {
  margin-bottom: 32px;
}
</style>
