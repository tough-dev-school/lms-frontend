<script>
import { mapActions } from "vuex";

export default {
  async created() {
    const { token } = this.$route.params;

    await this.EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT({ passwordlessToken: token });

    this.$router.push("/");
  },
  methods: mapActions("auth", ["EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT"]),
  render() {
    return "";
  },
};
</script>
