<template>
  <div :id="label" class="answer">
    <AppAnswer :answer="answer" />
    <div class="answer__post-answer">
      <a href="#" @click.prevent="isAnswering = !isAnswering">Ответить</a>
      <QuestionPostAnswer v-if="isAnswering" ref="postAnswer" :parent="answer" :question="question" @submitted="isAnswering = false" />
    </div>
    <div class="answer__children" :class="{ 'answer__children--first': !answer.parent }">
      <QuestionAnswerList :parent="answer" :question="question" />
    </div>
  </div>
</template>

<script>
import AppAnswer from "@/components/homework/AppAnswer.vue";

import QuestionPostAnswer from "@/components/Question/QuestionPostAnswer.vue";

export default {
  components: {
    AppAnswer,
    QuestionAnswerList: () => import("@/components/Question/QuestionAnswerList.vue"),
    QuestionPostAnswer,
  },
  props: {
    question: { type: Object, required: true },
    answer: { type: Object, required: true },
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
  watch: {
    isAnswering(isAnswering) {
      if (isAnswering) {
        this.$nextTick(() => this.$refs.postAnswer.focus());
      }
    },
  },
};
</script>
<style scoped>
.answer {
  &__children {
    margin-top: 3rem;
    &--first {
      padding-left: 2rem;
    }
  }
}
@media (--desktop) {
  .answer {
    &__children--first {
      padding-left: 10rem;
    }
  }
}
</style>
