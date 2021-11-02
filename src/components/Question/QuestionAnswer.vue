<template>
  <div :id="label" class="answer">
    <AppAnswer :answer="answer" :is-child="isChild" />
    <div :class="{ 'answer__wrapper--answering': isAnswering }" class="answer__wrapper">
      <UiButtonAsText :disabled="isAnswering" class="answer__button-answer" @click="isAnswering = !isAnswering">Ответить</UiButtonAsText>
      <AppDate :date="answer.created" />
    </div>

    <QuestionPostAnswer
      v-if="isAnswering"
      ref="postAnswer"
      :parent="answer"
      :question="question"
      class="answer__post-answer"
      @cancel="isAnswering = false"
      @submitted="isAnswering = false"
    />

    <QuestionAnswerList v-if="answer.descendants.length" :is-child="true" :answers="answer.descendants" :question="question" />
  </div>
</template>

<script>
import AppAnswer from "@/components/homework/AppAnswer.vue";
import AppDate from "@/components/AppDate.vue";
import UiButtonAsText from "@/components/ui-kit/UiButtonAsText.vue";
import QuestionPostAnswer from "@/components/Question/QuestionPostAnswer.vue";

export default {
  components: {
    AppAnswer,
    AppDate,
    QuestionAnswerList: () => import("@/components/Question/QuestionAnswerList.vue"),
    QuestionPostAnswer,
    UiButtonAsText,
  },
  props: {
    question: { type: Object, required: true },
    answer: { type: Object, required: true },
    isChild: { type: Boolean, default: false },
  },
  data() {
    return {
      isAnswering: false,
    };
  },
  computed: {
    label() {
      return `${this.answer.slug}`;
    },
  },
};
</script>
<style scoped>
.answer__wrapper {
  display: flex;
  margin-bottom: 32px;

  &--answering {
    margin-bottom: 16px;
  }
}
.answer__button-answer {
  margin-right: 16px !important;
}
.answer__post-answer {
  margin-bottom: 32px;
}
</style>
