<template>
  <form @submit.prevent="submit">
    <label for="email">Ссылка для входа придет на почту</label>
    <input id="email" ref="input" v-model="email" type="text" placeholder="Почта" />
    <input type="submit" value="Отправить" :disabled="isSubmitted || isSending" />
    <button class="button button-clear" @click.prevent="$emit('showCredentialsForm')">Войти по паролю</button>
    <p v-if="isSubmitted">Теперь проверьте почту</p>
  </form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      isSubmitted: false,
      isSending: false,
    };
  },
  watch: {
    email() {
      this.isSubmitted = false;
      this.isSending = false;
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    ...mapActions("auth", ["REQUEST_PASSWORDLESS_TOKEN"]),
    async submit() {
      this.isSending = true;
      const { email } = this;
      try {
        await this.REQUEST_PASSWORDLESS_TOKEN({ email });
      } catch (error) {
        this.isSending = false;
        throw error;
      }
      this.isSubmitted = true;
    },
  },
};
</script>
