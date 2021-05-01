<template>
  <div class="single-answer">
    <AppAnswer :answer="answer" @deleted="RELOAD_CURRENT_ANSWER" />
    <AnswerList v-if="answer.descendants" :answers="answer.descendants" :question="question" class="single-answer__children" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
  methods: mapActions("answer", ["RELOAD_CURRENT_ANSWER"]),
};
</script>
