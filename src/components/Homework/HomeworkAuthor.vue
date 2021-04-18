<template>
  <span v-if="name" class="homework-author">{{ name }}</span>
</template>

<script>
export default {
  props: {
    author: { type: Object, required: true },
  },
  computed: {
    name() {
      const { first_name, last_name } = this.author;

      if (!first_name && !last_name) {
        return "";
      }

      if (first_name && last_name) {
        return `${first_name} ${last_name}`;
      }

      return first_name ? first_name : last_name;
    },
  },
};
</script>
