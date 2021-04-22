<template>
  <div class="answer">
    <AppUserName class="answer__author" :user="answer.author" />
    <AppDate :date="answer.created" />
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
    <div class="answer__answer">
      <a href="#" @click.prevent="isAnswering = !isAnswering">Ответить</a>
      <PostAnswer v-if="isAnswering" :parent="answer" :question="question" @submitted="isAnswering = false" />
    </div>
    <div class="answer__children" :class="{ 'answer__children--first': !answer.parent }">
      <AnswerList :parent="answer" :question="question" />
    </div>
  </div>
</template>

<script>
import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";

import AppUserName from "@/components/AppUserName.vue";
import PostAnswer from "@/components/Homework/PostAnswer.vue";

export default {
  components: {
    AppContent,
    AppDate,
    AppUserName,
    AnswerList: () => import("@/components/Homework/AnswerList.vue"),
    PostAnswer,
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
};
</script>
<style scoped>
.answer {
  &__author {
    font-weight: bold;
    margin-right: 0.5rem;
  }
  &__children {
    margin-top: 3rem;
    &--first {
      padding-left: 1rem;
    }
  }
}
</style>
