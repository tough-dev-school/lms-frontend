<template>
  <div :id="label" class="answer">
    <div class="answer__author-wapper">
      <AppUserAvatar v-if="!isChild" :user="answer.author" :color="currentColor" class="answer-editor__avatar" />
      <AppUserName :user="answer.author" :color="currentColor" class="answer__user-name" font="inter" />
      <AppAnswerDeleteButton :answer="answer" @deleted="$emit('deleted')" />
    </div>
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
      return this.user.uuid === this.answer.author.uuid;
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
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8px;
}
.answer__user-name {
  margin-right: 16px;
}
</style>
