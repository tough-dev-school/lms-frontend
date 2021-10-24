<template>
  <textarea ref="textarea" v-model="text" class="app-text-input" />
</template>

<script>
import initSimpleMDE from "@/utils/initSimpleMDE.js";

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
    this.simplemde = initSimpleMDE({
      element: this.$refs.input,
      uniqueId: this.saveDataTo,
      onChange: () => (this.text = this.simplemde.value()),
      onKeyDown: (_, { code, ctrlKey, metaKey }) => {
        if (code === "Enter" && (ctrlKey || metaKey)) {
          this.$emit("submit");
        }
      },
    });
    this.$emit("input", this.simplemde.value()); // emit input to make sure all stuf is updated after initial loading
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    clear() {
      console.log("clear");
      this.simplemde.clearAutosavedValue();
      this.simplemde.value("");
    },
    focus() {
      this.simplemde.codemirror.focus();
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
