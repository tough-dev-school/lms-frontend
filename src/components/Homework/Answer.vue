<template>
  <div class="answer">
    <HomeworkAuthor class="answer__author" :author="answer.author" />
    <AppDate :date="answer.created" />
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
  </div>
</template>

<script>
import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";

import HomeworkAuthor from "@/components/Homework/HomeworkAuthor.vue";

export default {
  components: {
    AppContent,
    AppDate,
    HomeworkAuthor,
  },
  props: {
    answer: { type: Object, required: true },
  },
};
</script>
<style scoped>
.answer {
  &__author {
    font-weight: bold;
    margin-right: 0.5rem;
  }
}
</style>
