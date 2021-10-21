<template>
  <div class="home">
    <h1 class="home__title">Данные для диплома</h1>
    <form v-if="isUserFetched" @submit.prevent="submit">
      <UserDataField has-autofocus label="Имя" name="first_name" />
      <UserDataField label="Фамилия" name="last_name" />
      <UserDataField label="Имя (на английском)" name="first_name_en" />
      <UserDataField label="Фамилия (на английском)" name="last_name_en" />
      <GendeRadioButton class="home__gender" />
      <UiButton :disabled="isUpdating" class="home__submit-button" size="big" color-type="primary">Обновить</UiButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import UserDataField from "@/components/Home/UserDataField";
import GendeRadioButton from "@/components/Home/GendeRadioButton.vue";
import UiButton from "@/components/ui-kit/UiButton.vue";

export default {
  name: "Home",
  components: {
    UserDataField,
    GendeRadioButton,
    UiButton,
  },
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
<style scoped>
.home__title {
  @mixin inter-title-one;
}
.home__gender {
  margin-bottom: 24px;
}
/* TODO: check if all buttons fullwidth on mobule make one rule */
.home__submit-button {
  width: 100%;
}
@media (--after-mobile) {
  .home__submit-button {
    width: initial;
  }
}
</style>
