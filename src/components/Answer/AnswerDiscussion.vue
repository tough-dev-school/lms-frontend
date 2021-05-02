<template>
  <div v-if="answer.descendants.length" class="answer-discussion">
    <h2>{{ title }}</h2>
    <AnswerList :answers="answer.descendants" :question="question" />
    <div ref="bottom"></div>
  </div>
</template>

<script>
import AnswerList from "@/components/Answer/AnswerList.vue";

export default {
  components: { AnswerList },

  props: {
    answer: { type: Object, required: true },
    question: { type: Object, required: true },
  },

  computed: {
    title() {
      return this.answer.descendants.length > 1 ? "Обсуждение" : "Ваш ответ";
    },
  },
  methods: {
    scrollToBottom() {
      this.$scrollTo(this.$refs.bottom);
    },
  },
};
</script>
