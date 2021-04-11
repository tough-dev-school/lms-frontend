<template>
  <div>
    <form v-if="isUserFetched" @submit.prevent="submit">
      <UserDataField label="Имя" name="first_name" />
      <UserDataField label="Фамилия" name="last_name" />
      <UserDataField label="Имя (на английском)" name="first_name_en" />
      <UserDataField label="Фамилия(на английском)" name="last_name_en" />

      <input type="submit" value="Обновить" :disabled="isUpdating" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import UserDataField from "@/components/Home/UserDataField";

export default {
  name: "Home",
  components: { UserDataField },
  data() {
    return {
      isUserFetched: false,
      isUpdating: false,
    };
  },
  async created() {
    await this.FETCH_USER();
    this.isUserFetched = true;
  },
  methods: {
    ...mapActions("user", ["FETCH_USER", "UPDATE_BACKEND"]),
    async submit() {
      this.isUpdating = true;
      await this.UPDATE_BACKEND();
      this.isUpdating = false;
    },
  },
};
</script>
