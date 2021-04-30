<template>
  <div v-if="parent.descendants" class="answer-list">
    <HomeworkAnswer
      v-for="answer in parent.descendants"
      :key="answer.slug"
      :answer="answer"
      :question="question"
      :class="{ 'answer-list__answer--root': !parent }"
    />
  </div>
</template>

<script>
import HomeworkAnswer from "@/components/Homework/HomeworkAnswer.vue";

export default {
  name: "AnswerList",
  components: {
    HomeworkAnswer,
  },
  props: {
    question: { type: Object, required: true },
    parent: {
      required: false,
      default: null,
      validator: (prop) => {
        return typeof prop === "object" || prop === null;
      },
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
