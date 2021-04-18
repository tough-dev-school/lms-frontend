<template>
  <span v-if="name" class="user-name">{{ name }}</span>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
  },
  computed: {
    name() {
      const { first_name, last_name } = this.user;

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
