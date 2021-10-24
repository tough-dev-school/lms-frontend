<template>
  <div :id="label" class="answer">
    <AppAnswer :answer="answer" />
    <div :class="{ 'answer__wrapper--answering': isAnswering }" class="answer__wrapper">
      <button :disabled="isAnswering" class="answer__button-answer" @click="isAnswering = !isAnswering">Ответить</button>
      <AppDate :date="answer.created" />
    </div>

    <!-- <div class="answer__post-answer"> -->
    <QuestionPostAnswer
      v-if="isAnswering"
      ref="postAnswer"
      :parent="answer"
      :question="question"
      class="answer__post-answer"
      @cancel="isAnswering = false"
      @submitted="isAnswering = false"
    />
    <!-- </div> -->

    <!-- <div class="answer__children" :class="{ 'answer__children--first': !answer.parent }"> -->
    <!-- :class="{ 'answer__children--first': !answer.parent }" -->
    <!-- class="answer__children" -->
    <QuestionAnswerList v-if="answer.descendants.length" is-child :answers="answer.descendants" :question="question" />
    <!-- </div> -->
  </div>
</template>

<script>
import AppAnswer from "@/components/homework/AppAnswer.vue";
import AppDate from "@/components/AppDate.vue";
import QuestionPostAnswer from "@/components/Question/QuestionPostAnswer.vue";

export default {
  components: {
    AppAnswer,
    AppDate,
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
};
</script>
<style scoped>
.answer__children {
  /* border: 1px solid black;
  padding-left: 40px; */
  /* margin-bottom: 30px;

  &--first {
    margin-bottom: 60px;
  } */
}
.answer__wrapper {
  display: flex;
  margin-bottom: 32px;

  &--answering {
    margin-bottom: 16px;
  }
}
.answer__button-answer {
  @mixin robot-text-two;
  display: inline;
  padding: 0;
  margin: 0;
  margin-right: 16px;
  color: var(--link);
  line-height: 1;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus:not(:active),
  &:hover:not(:active) {
    color: var(--link-hover);
  }

  &:disabled {
    pointer-events: none;
    color: var(--superlight);
  }
}
.answer__post-answer {
  margin-bottom: 32px;
}
/* .answer {
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
} */
</style>
