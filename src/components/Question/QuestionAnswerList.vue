<template>
  <ul v-if="answers" class="answer-list">
    <li v-for="answer in answers" :key="answer.slug" :class="{ 'answer-list__item--child': isChild }" class="answer-list__item">
      <QuestionAnswer :answer="answer" :question="question" />
    </li>
  </ul>
</template>

<script>
import QuestionAnswer from "@/components/Question/QuestionAnswer.vue";

export default {
  name: "QuestionAnswerList",
  components: {
    QuestionAnswer,
  },
  props: {
    isChild: { type: Boolean, default: false },
    question: { type: Object, required: true },
    answers: { type: Array, required: true },
  },
};
</script>
<style scoped>
.answer-list {
  margin-bottom: 32px;
  padding-left: 32px;

  /* &--child {
    margin-bottom: 32px;
  } */
}
/* .answer-list__item:not(:last-child) {
  margin-bottom: 32px;
} */

.answer-list__item {
  margin-bottom: 64px;

  &--child {
    margin-bottom: 32px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
