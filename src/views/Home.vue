<template>
  <div>
    <form v-if="isUserFetched" @submit.prevent="submit">
      <label for="firstName"
        >Имя
        <input id="firstName" v-model="first_name" type="text" />
      </label>
      <label for="lastName"
        >Фамилия
        <input id="lastName" v-model="last_name" type="text" />
      </label>
      <label for="firstNameEn"
        >Имя (на английском)
        <input id="firstNameEn" v-model="first_name_en" type="text" />
      </label>
      <label for="lastNameEn"
        >Фамилия(на английском)
        <input id="lastNameEn" v-model="last_name_en" type="text" />
      </label>
      <input type="submit" value="Обновить" :disabled="isUpdating" />
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      isUserFetched: false,
      isUpdating: false,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    first_name: {
      get() {
        return this.user.first_name;
      },
      set(first_name) {
        this.UPDATE_USER({ first_name });
      },
    },
    last_name: {
      get() {
        return this.user.last_name;
      },
      set(last_name) {
        this.UPDATE_USER({ last_name });
      },
    },
    first_name_en: {
      get() {
        return this.user.first_name_en;
      },
      set(first_name_en) {
        this.UPDATE_USER({ first_name_en });
      },
    },
    last_name_en: {
      get() {
        return this.user.last_name_en;
      },
      set(last_name_en) {
        this.UPDATE_USER({ last_name_en });
      },
    },
  },
  async created() {
    await this.FETCH_USER();
    this.isUserFetched = true;
  },
  methods: {
    ...mapActions("user", ["FETCH_USER", "UPDATE_BACKEND"]),
    ...mapMutations("user", ["UPDATE_USER"]),
    async submit() {
      this.isUpdating = true;
      await this.UPDATE_BACKEND();
      this.isUpdating = false;
    },
  },
};
</script>
