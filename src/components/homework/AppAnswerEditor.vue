<template>
  <form class="answer-editor" @submit.prevent="submit">
    <label for="answer-text">Ваш ответ</label>
    <AppEditor
      id="answer-text"
      ref="editor"
      v-model="text"
      :disabled="disabled"
      :save-data-to="answerIdForSavingUserInput"
      @submit="submit"
    />
    <input type="submit" value="Отправить" class="answer-editor__submit" :disabled="disabled" />
  </form>
</template>

<script>
import AppEditor from "@/components/AppEditor.vue";

import objectOrNullValidator from "@/utils/objectOrNullValidator.js";

export default {
  components: {
    AppEditor,
  },
  props: {
    disabled: { type: Boolean, default: false },
    parent: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
    },
    question: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
    },
  },
  data() {
    return {
      text: null,
    };
  },
  computed: {
    answerIdForSavingUserInput() {
      return `answer-${this.question.slug}-${this.parent?.slug}`;
    },
  },
  methods: {
    async submit() {
      const { text } = this;
      const parent = this.parent ? this.parent.slug : null;

      this.$emit("submit", { text, parent });
    },
    focus() {
      this.$refs.editor.focus();
    },
    clear() {
      this.$refs.editor.clear();
    },
  },
};
</script>

<style scoped>
.answer-editor {
  &__submit {
    margin-top: 1rem;
  }
}
</style>
