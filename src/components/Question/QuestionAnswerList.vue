<template>
  <ul v-if="answers" class="answer-list" :class="{ 'answer-list--child': isChild }">
    <li v-for="answer in answers" :key="answer.slug" :class="{ 'answer-list__item--child': isChild }" class="answer-list__item">
      <QuestionAnswer :answer="answer" :question="question" :is-child="isChild" v-on="$listeners" />
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
<style lang="postcss" scoped>
.answer-list {
  margin-bottom: 16px;

  &--child {
    padding-left: 16px;
  }
}
.answer-list__item {
  margin-bottom: 24px;

  &--child {
    margin-bottom: 16px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

@media (--after-mobile) {
  .answer-list {
    margin-bottom: 32px;

    &--child {
      padding-left: 32px;
    }
  }
  .answer-list__item {
    margin-bottom: 48px;

    &--child {
      margin-bottom: 32px;
    }
  }
}
</style>
