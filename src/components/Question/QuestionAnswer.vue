<template>
  <div :id="label" class="answer">
    <AppUserName class="answer__author" :user="answer.author" />
    <a :href="`#${label}`" class="answer__data"><AppDate :date="answer.created" /></a>
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
    <div class="answer__answer">
      <a href="#" @click.prevent="isAnswering = !isAnswering">Ответить</a>
      <QuestionPostAnswer v-if="isAnswering" ref="postAnswer" :parent="answer" :question="question" @submitted="isAnswering = false" />
    </div>
    <div class="answer__children" :class="{ 'answer__children--first': !answer.parent }">
      <QuestionAnswerList :parent="answer" :question="question" />
    </div>
  </div>
</template>

<script>
import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";

import AppUserName from "@/components/AppUserName.vue";
import QuestionPostAnswer from "@/components/Question/QuestionPostAnswer.vue";

export default {
  components: {
    AppContent,
    AppDate,
    AppUserName,
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
  &__author {
    font-weight: bold;
    margin-right: 0.5rem;
  }
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
    &__text {
      max-width: 80%;
    }
  }
}
</style>
