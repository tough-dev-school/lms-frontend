<template>
  <textarea
    ref="textarea"
    v-model="text"
    class="app-text-input"
    @keydown.ctrl.enter.prevent="submit"
    @keydown.meta.enter.prevent="submit"
  />
</template>

<script>
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
      height: null,
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
        if (this.saveDataTo) {
          this.$store.commit("userInput/SET_FIELD", { key: this.saveDataTo, value });
        }
        this.$emit("input", value);
      },
    },
  },
  created() {
    if (this.saveDataTo) {
      this.text = this.$store.state.userInput.fields[this.saveDataTo] || "";
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    clear() {
      this.text = null;
    },
    focus() {
      this.$refs.textarea.focus();
    },
  },
};
</script>

<style scoped>
.app-text-input {
  min-height: 13rem;
}
</style>
