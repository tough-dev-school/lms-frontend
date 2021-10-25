<template>
  <div :id="label" class="answer">
    <div class="answer__author-wapper">
      <AppUserAvatar v-if="!isChild" :user="answer.author" :color="currentColor" class="answer-editor__avatar" />
      <AppUserName :user="answer.author" :color="currentColor" font="inter" />
    </div>
    <AppAnswerDeleteButton :answer="answer" class="answer__delete" @deleted="$emit('deleted')" />
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppContent from "@/components/AppContent.vue";
import AppAnswerDeleteButton from "@/components/homework/AppAnswerDeleteButton.vue";
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";

import getUserName from "@/utils/getUserName";

export default {
  components: {
    AppContent,
    AppAnswerDeleteButton,
    AppUserAvatar,
    AppUserName,
  },
  props: {
    answer: { type: Object, required: true },
    isChild: { type: Boolean, default: false },
  },
  computed: {
    ...mapState("auth", ["user"]),
    label() {
      return `${this.answer.slug}`;
    },
    isUserComment() {
      // TODO: should be chaned to user id or something
      const userName = getUserName(this.user);
      const authorName = getUserName(this.answer.author);
      return userName === authorName;
    },
    currentColor() {
      return this.isUserComment ? "secondary" : "primary";
    },
  },
};
</script>
<style scoped>
.answer__author-wapper {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.answer__delete {
  margin-left: 1rem;
}
</style>
