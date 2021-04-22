<template>
  <div class="login">
    <p v-if="error" class="login__error">{{ error }}</p>
    <LoginPasswordless v-if="loginType == 'passwordless'" @showCredentialsForm="loginType = 'credentials'" />
    <LoginWithCredentials v-else @showPasswordlessForm="loginType = 'passwordless'" />
  </div>
</template>

<script>
import LoginPasswordless from "@/components/Login/LoginPasswordless.vue";
import LoginWithCredentials from "@/components/Login/LoginWithCredentials.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    LoginPasswordless,
    LoginWithCredentials,
  },
  data() {
    return {
      loginType: "passwordless",
      isSubmitted: false,
    };
  },
  computed: {
    next() {
      const { redirectAfterLogin } = this.$store.state.auth;
      return redirectAfterLogin ? redirectAfterLogin : "/";
    },
    error() {
      const ERRORS = {
        invalidToken: "Кажется, вы перешли по устравшей ссылке. Попробуйте заново",
      };
      const { error } = this.$route.query;
      return error && error in ERRORS ? ERRORS[error] : null;
    },
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  watch: {
    isAuthenticated(isAuthenticated) {
      if (isAuthenticated) {
        this.$router.push(this.next);
      }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push(this.next);
      return;
    }
  },
  mounted() {
    let { next } = this.$route.query;
    next = next ? next : null;

    this.SET_REDIRECT_AFTER_LOGIN(next);
  },
  methods: mapMutations("auth", ["SET_REDIRECT_AFTER_LOGIN"]),
};
</script>

<style scoped>
.login__error {
  color: red;
}
</style>
