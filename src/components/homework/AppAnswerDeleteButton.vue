<template>
  <a v-if="isDeletable" href="#" class="app-answer-delete-button" @click.prevent="del">Удалить</a>
</template>
<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";

export default {
  props: {
    answer: { type: Object, required: true },
  },
  computed: {
    ...mapState("auth", ["user"]),
    isDeletable() {
      return this.authorMatches && this.createdNotTooLongAgo;
    },
    authorMatches() {
      return this.answer.author.uuid == this.user.uuid;
    },
    createdNotTooLongAgo() {
      const created = dayjs(this.answer.created);
      return created.isAfter(dayjs().subtract(30, "minute"));
    },
  },
  methods: {
    ...mapActions("answer", ["DELETE_ANSWER"]),
    async del() {
      const id = this.answer.slug;
      await this.DELETE_ANSWER({ id });
      this.$emit("deleted");
    },
  },
};
</script>
