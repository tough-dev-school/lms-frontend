<template>
  <div :id="label" class="answer" :class="{ 'answer--deleted': isDeleted }">
    <div class="answer__author-wapper">
      <AppUserAvatar v-if="!isChild" :user="answer.author" :color="currentColor" class="answer-editor__avatar" />
      <AppUserName :user="answer.author" :color="currentColor" class="answer__user-name" />
      <UiLink :to="answerUrl" class="answer__date-link">
        <AppDate :date="answer.created" class="answer__date" />
      </UiLink>
      <Icon class="answer__edit-button" scale="0.8" name="edit" @click.prevent="isEditing = !isEditing" />
      <AppAnswerDeleteButton class="answer__delete-button" :answer="answer" @deleted="deleted" />
    </div>
    <div v-if="!isEditing" class="answer__text">
      <AppContent :html="answer.text" />
    </div>
    <div v-else class="answer__editor">
      <AppAnswerEditor :initial-answer="answer" :question="question" @cancel="isEditing = false" @submit="updated" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppAnswerEditor from "@/components/homework/AppAnswerEditor.vue";
import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";
import AppAnswerDeleteButton from "@/components/homework/AppAnswerDeleteButton.vue";
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";
import UiLink from "@/components/ui-kit/UiLink";

import "vue-awesome/icons/edit";

export default {
  components: {
    AppAnswerEditor,
    AppContent,
    AppDate,
    AppAnswerDeleteButton,
    AppUserAvatar,
    AppUserName,
    UiLink,
  },
  props: {
    answer: { type: Object, required: true },
    question: { type: Object, required: true },
    isChild: { type: Boolean, default: false },
  },
  data() {
    return {
      isDeleted: false,
      isEditing: false,
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
    updated(answer) {
      this.isEditing = false;
      this.$emit("updated", answer);
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
    font-weight: bold;
  }
  &__date-link {
    margin-right: 0.2rem;
  }
  &__date {
    &:hover {
      color: var(--link-hover);
    }
  }
  &__edit-button {
    cursor: pointer;
    opacity: 0.4;
    position: relative;
    top: 0.05rem;
    &:hover {
      opacity: 0.8;
    }
  }
  &__edit-button,
  &__delete-button {
    margin-left: 0.5rem;
  }
  &__delete-button {
    position: relative;
    top: 0.1rem;
  }
}
</style>
