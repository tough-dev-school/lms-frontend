<template>
  <div class="login">
    <form @submit.prevent="submit">
      <label for="#email">Ссылка для входа придет на почту</label>
      <input id="email" v-model="email" type="text" placeholder="Почта" />
      <input type="submit" value="Отправить" />
    </form>
    <p v-if="isSent">Теперь проверьте почту</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      isSent: false,
    };
  },
  methods: {
    async submit() {
      this.isSent = false;
      const { email } = this;
      await this.REQUEST_PASSWORDLESS_TOKEN({ email });
      this.isSent = true;
    },
    ...mapActions("auth", ["REQUEST_PASSWORDLESS_TOKEN"]),
  },
};
</script>
