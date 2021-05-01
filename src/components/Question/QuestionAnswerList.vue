<template>
  <div v-if="answers" class="answer-list">
    <QuestionAnswer
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

import QuestionAnswer from "@/components/Question/QuestionAnswer.vue";

import objectOrNullValidator from "@/utils/objectOrNullValidator.js";

export default {
  name: "QuestionAnswerList",
  components: {
    QuestionAnswer,
  },
  props: {
    question: { type: Object, required: true },
    parent: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
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
