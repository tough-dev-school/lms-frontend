<template>
  <AppAnswerEditor
    ref="editor"
    :parent="parent"
    :question="question"
    :disabled="isLoading"
    :only-send-button="onlySendButton"
    @submit="submit"
    @cancel="handleCancel"
  />
</template>

<script>
import { mapActions } from "vuex";

import AppAnswerEditor from "@/components/homework/AppAnswerEditor.vue";

import objectOrNullValidator from "@/utils/objectOrNullValidator.js";

export default {
  components: {
    AppAnswerEditor,
  },
  props: {
    question: { type: Object, required: true },
    onlySendButton: { type: Boolean, default: false },
    parent: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("question", ["POST_ANSWER", "FETCH_ANSWERS"]),
    async submit({ text, parent }) {
      const question = this.question.slug;

      this.isLoading = true;
      await this.POST_ANSWER({
        answer: { text, parent, question },
      });
      await this.FETCH_ANSWERS({ question });

      this.isLoading = false;
      this.$refs.editor.clear();
      this.$emit("submitted");
    },
    focus() {
      this.$refs.editor.focus();
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
