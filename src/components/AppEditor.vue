<template>
  <textarea ref="textarea" v-model="text" class="app-text-input" />
</template>

<script>
import SimpleMDE from "simplemde";
import axios from "@/api/backend.js";

export default {
  props: {
    saveDataTo: { type: String, default: null },
    value: {
      required: true,
      validator: (prop) => typeof prop === "string" || prop === null,
    },
  },
  data() {
    return {
      simplemde: null,
    };
  },
  computed: {
    text: {
      get() {
        if (this.value) {
          return this.value;
        }

        return "";
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.simplemde = new SimpleMDE({
      element: this.$refs.textarea,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: this.saveDataTo,
        delay: 500,
      },
      status: false,
      toolbar: [
        "bold",
        "italic",
        "heading-1",
        "heading-2",
        "heading-3",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "fullscreen",
        "preview",
      ],
      previewRender: (markdown, preview) => {
        // сука, как же я ненавижу свою жизнь
        const formData = new FormData();
        formData.append("content", markdown);
        axios.post("/api/v2/markdownx/markdownify/", formData).then((result) => (preview.innerHTML = result.data));
      },
    });
    this.simplemde.codemirror.on("change", () => (this.text = this.simplemde.value()));
    this.simplemde.codemirror.on("keydown", (_, { code, ctrlKey, metaKey }) => {
      if (code === "Enter" && (ctrlKey || metaKey)) {
        this.$emit("submit");
      }
    });
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    clear() {
      this.simplemde.clearAutosavedValue();
      this.simplemde.value("");
    },
    focus() {
      this.$refs.textarea.focus();
    },
  },
};
</script>

<style scoped>
@import "~simplemde/dist/simplemde.min.css";
.app-text-input {
  min-height: 13rem;
}
</style>
