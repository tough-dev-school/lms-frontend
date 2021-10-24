<template>
  <div :id="label" class="answer">
    <!-- <AppUserName class="answer__author" :user="answer.author" /> -->
    <!-- TODO: change to new component -->
    <AppHeaderUser :user="answer.author" />
    <!-- <a :href="`#${label}`" class="answer__date"><AppDate :date="answer.created" /></a> -->
    <AppAnswerDeleteButton :answer="answer" class="answer__delete" @deleted="$emit('deleted')" />
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
  </div>
</template>

<script>
import AppContent from "@/components/AppContent.vue";
// import AppDate from "@/components/AppDate.vue";
import AppHeaderUser from "@/components/AppHeaderUser.vue";
// import AppUserName from "@/components/AppUserName.vue";
import AppAnswerDeleteButton from "@/components/homework/AppAnswerDeleteButton.vue";

export default {
  components: {
    AppContent,
    AppHeaderUser,
    AppAnswerDeleteButton,
    // AppUserName,
  },
  props: {
    answer: { type: Object, required: true },
  },
  computed: {
    label() {
      return `${this.answer.slug}`;
    },
  },
};
</script>
<style scoped>
.answer {
  /* padding-left: 1rem; */
  &__author {
    display: inline-block;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  &__delete {
    margin-left: 1rem;
  }
  .answer--highlighted {
    animation: highlighted-answer-fade 2s ease-out;
  }
}

@keyframes highlighted-answer-fade {
  from {
    background-color: #ffcc66;
  }
  to {
    background-color: white;
  }
}

@media (--desktop) {
  .answer {
    &__text {
      max-width: 80%;
    }
  }
}
</style>
