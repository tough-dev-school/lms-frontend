<template>
  <div :id="label" class="answer">
    <AppAnswer :answer="answer" :is-child="isChild" :question="question" v-on="$listeners" />
    <div :class="{ 'answer__wrapper--answering': isAnswering }" class="answer__wrapper">
      <UiButtonAsText :disabled="isAnswering" class="answer__button-answer" @click="isAnswering = !isAnswering">Ответить</UiButtonAsText>
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
import UiButtonAsText from "@/components/ui-kit/UiButtonAsText.vue";
import QuestionPostAnswer from "@/components/Question/QuestionPostAnswer.vue";

export default {
  components: {
    AppAnswer,
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
<style lang="postcss" scoped>
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
