<template>
  <div class="login" :class="{ 'login--error': isError }">
    <form v-if="loginType == 'passwordless'" @submit.prevent="submitPasswordless">
      <label for="email">Ссылка для входа придет на почту</label>
      <input id="email" v-model="email" type="text" placeholder="Почта" />
      <input type="submit" value="Отправить" />
      <button class="button button-clear" @click.prevent="loginType = 'password'">Войти по паролю</button>
    </form>
    <form v-else @submit.prevent="submitCredentials">
      <label for="login">Логин</label>
      <input id="login" v-model="username" type="text" placeholder="zer0c00l" />
      <label for="password">Пароль</label>
      <input id="password" v-model="password" type="password" />
      <input type="submit" value="Залогиниться" :disabled="!username && !password" />
      <button class="button button-clear" @click.prevent="loginType = 'email'">Войти по почте</button>
    </form>
    <p v-if="isSent">Теперь проверьте почту</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      email: null,
      isSending: false,
      isSent: false,
      isError: false,
      loginType: "passwordless",
      username: null,
      password: null,
    };
  },
  computed: {
    next() {
      const { redirectAfterLogin } = this.$store.state.auth;
      return redirectAfterLogin ? redirectAfterLogin : "/";
    },
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  watch: {
    username() {
      this.isError = false;
    },
    password() {
      this.isError = false;
    },
    loginType() {
      this.isError = false;
    },
    email() {
      this.isError = false;
    },
  },
  created() {
    let { next } = this.$route.query;
    next = next ? next : null;

    this.SET_REDIRECT_AFTER_LOGIN(next);
  },
  methods: {
    async submitPasswordless() {
      this.isSending = true;
      this.isSent = false;

      const { email } = this;
      await this.REQUEST_PASSWORDLESS_TOKEN({ email });

      this.isSent = true;
      this.isSending = false;
    },
    async submitCredentials() {
      const { username, password } = this;

      this.isError = false;
      this.isSending = true;

      try {
        await this.LOGIN_WITH_CREDENTIALS({ username, password });
      } catch (error) {
        this.isError = true;
        throw error; // let sentry log it
      }
      this.isSending = false;

      if (this.isAuthenticated) {
        this.$router.push(this.next);
      } else {
        this.isError = true;
      }
    },
    ...mapActions("auth", ["REQUEST_PASSWORDLESS_TOKEN", "LOGIN_WITH_CREDENTIALS"]),
    ...mapMutations("auth", ["SET_REDIRECT_AFTER_LOGIN"]),
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
