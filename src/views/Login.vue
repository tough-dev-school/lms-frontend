<template>
  <div class="login">
    <form v-if="loginType == 'passwordless'" @submit.prevent="submitPasswordless">
      <label for="#email">Ссылка для входа придет на почту</label>
      <input id="email" v-model="email" type="text" placeholder="Почта" />
      <input type="submit" value="Отправить" />
    </form>
    <p v-if="isSent">Теперь проверьте почту</p>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      email: null,
      isSent: false,
      loginType: "passwordless",
    };
  },
  created() {
    let { next } = this.$route.query;
    next = next ? next : null;

    this.SET_REDIRECT_AFTER_LOGIN(next);
  },
  methods: {
    async submitPasswordless() {
      this.isSent = false;
      const { email } = this;
      await this.REQUEST_PASSWORDLESS_TOKEN({ email });
      this.isSent = true;
    },
    ...mapActions("auth", ["REQUEST_PASSWORDLESS_TOKEN"]),
    ...mapMutations("auth", ["SET_REDIRECT_AFTER_LOGIN"]),
  },
};
</script>
