<template>
  <div :id="label" class="answer" :class="{ 'answer--deleted': isDeleted }">
    <div class="answer__author-wapper">
      <AppUserAvatar v-if="!isChild" :user="answer.author" :color="currentColor" class="answer-editor__avatar" />
      <AppUserName :user="answer.author" :color="currentColor" class="answer__user-name" />
      <UiLink :to="answerUrl">
        <AppDate :date="answer.created" class="answer__date" />
      </UiLink>
      <AppAnswerDeleteButton :answer="answer" @deleted="deleted" />
    </div>
    <div class="answer__text">
      <AppContent :html="answer.text" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";
import AppAnswerDeleteButton from "@/components/homework/AppAnswerDeleteButton.vue";
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";
import UiLink from "@/components/ui-kit/UiLink";

export default {
  components: {
    AppContent,
    AppDate,
    AppAnswerDeleteButton,
    AppUserAvatar,
    AppUserName,
    UiLink,
  },
  props: {
    answer: { type: Object, required: true },
    isChild: { type: Boolean, default: false },
  },
  data() {
    return {
      isDeleted: false,
    };
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
    answerUrl() {
      return {
        name: "Single answer",
        params: { id: this.answer.slug },
      };
    },
  },
  methods: {
    deleted(answer) {
      this.isDeleted = true;
      this.$emit("deleted", answer);
    },
  },
};
</script>
<style lang="postcss" scoped>
.answer {
  &--deleted {
    opacity: 0.5;
    pointer-events: none;
  }
  &__author-wapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 8px;
  }
  &__user-name {
    margin-right: 0.6rem;
  }
  &__date {
    &:hover {
      color: var(--link-hover);
    }
  }
}
</style>
