<template>
  <div class="answer">
    <AppUserName class="answer__author" :user="answer.author" />
    <AppDate :date="answer.created" />
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
  </div>
</template>

<script>
import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";

import AppUserName from "@/components/AppUserName.vue";

export default {
  components: {
    AppContent,
    AppDate,
    AppUserName,
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
