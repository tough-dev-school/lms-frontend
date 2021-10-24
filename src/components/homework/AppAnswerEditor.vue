<template>
  <form class="answer-editor" @submit.prevent="submit">
    <!-- <label for="answer-text">Ваш ответ</label> -->
    <AppEditor
      id="answer-text"
      ref="editor"
      v-model="text"
      :disabled="disabled"
      :save-data-to="answerIdForSavingUserInput"
      @submit="submit"
    />
    <ul class="answer-editor__button-list">
      <li>
        <UiButton :disabled="buttonSendDisabled" size="small" color-type="primary" class="login-form__button-enter">Отправить</UiButton>
      </li>
      <li v-if="!onlySendButton">
        <UiButton :disabled="disabled" type="button" size="small" color-type="white" class="login-form__button-enter" @click="handleCancel"
          >Отмена</UiButton
        >
      </li>
    </ul>
  </form>
</template>

<script>
import AppEditor from "@/components/AppEditor.vue";
import UiButton from "@/components/ui-kit/UiButton.vue";
import objectOrNullValidator from "@/utils/objectOrNullValidator.js";

export default {
  components: {
    AppEditor,
    UiButton,
  },
  props: {
    disabled: { type: Boolean, default: false },
    onlySendButton: { type: Boolean, default: false },
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
    buttonSendDisabled() {
      return this.disabled || !this.text;
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
    handleCancel() {
      console.log("1");
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
/* .answer-editor {
  &__submit {
    margin-top: 1rem;
  }
} */
/* .answer-editor__editor {
  margin-bottom: 16px;
  background: red;
} */
.answer-editor__button-list {
  display: flex;
  padding-top: 16px;

  & li:not(:last-child) {
    margin-right: 12px;
  }
}
</style>
