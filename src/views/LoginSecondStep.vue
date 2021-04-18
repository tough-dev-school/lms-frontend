<script>
import { mapActions, mapMutations } from "vuex";

export default {
  computed: {
    next() {
      const { redirectAfterLogin } = this.$store.state.auth;
      return redirectAfterLogin ? redirectAfterLogin : "/";
    },
  },
  async created() {
    const { token } = this.$route.params;

    await this.EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT({ passwordlessToken: token });

    this.$router.push(this.next);
  },
  destroyed() {
    this.SET_REDIRECT_AFTER_LOGIN(null);
  },
  methods: {
    ...mapActions("auth", ["EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT"]),
    ...mapMutations("auth", "SET_REDIRECT_AFTER_LOGIN"),
  },
  render() {
    return "";
  },
};
</script>
