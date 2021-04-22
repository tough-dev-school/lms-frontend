<template>
  <form class="login" :class="{ 'login--error': isError }" @submit.prevent="submit">
    <label for="login">Логин</label>
    <input id="login" v-model="username" type="text" placeholder="zer0c00l" />
    <label for="password">Пароль</label>
    <input id="password" v-model="password" type="password" />
    <input type="submit" value="Залогиниться" :disabled="!username && !password" />
    <button class="button button-clear" @click.prevent="$emit('ShowPasswordlessForm')">Войти по почте</button>
  </form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
      isError: false,
    };
  },
  watch: {
    username() {
      this.isError = false;
    },
    password() {
      this.isError = false;
    },
  },
  methods: {
    ...mapActions("auth", ["LOGIN_WITH_CREDENTIALS"]),
    async submit() {
      const { username, password } = this;

      this.isError = false;

      try {
        await this.LOGIN_WITH_CREDENTIALS({ username, password });
      } catch (error) {
        this.isError = true;
        throw error; // let sentry log it
      }
      this.isSending = false;
    },
  },
};
</script>
<style scoped>
.login--error {
  input[type="text"],
  input[type="password"] {
    border-color: red;
  }
}
</style>
