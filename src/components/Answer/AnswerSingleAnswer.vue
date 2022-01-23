<template>
  <div class="single-answer">
    <AppAnswer :answer="answer" v-on="$listeners" />
    <AnswerList
      v-if="answer.descendants"
      :answers="answer.descendants"
      :question="question"
      class="single-answer__children"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import AppAnswer from "@/components/homework/AppAnswer.vue";

export default {
  components: {
    AppAnswer,
    AnswerList: () => import("@/components/Answer/AnswerList.vue"),
  },
  props: {
    answer: { type: Object, required: true },
    question: { type: Object, required: true },
  },
};
</script>
