<template>
  <label :for="name"
    >{{ label }}
    <input :id="name" v-model="model" type="text" />
  </label>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    label: { type: String, required: true },
    name: { type: String, required: true },
  },
  computed: {
    ...mapState("user", ["user"]),
    model: {
      get() {
        return this.user[this.name];
      },
      set(value) {
        const payload = {};
        payload[this.name] = value;
        this.UPDATE_USER(payload);
      },
    },
  },
  methods: mapMutations("user", ["UPDATE_USER"]),
};
</script>
