<template>
  <label for="user-gender">
    Пол
    <div id="user-gender" class="user-gender">
      <label class="user-gender__label--first label-inline" for="male">
        <input id="male" v-model="gender" type="radio" value="male" />
        Мужской
      </label>
      <label class="label-inline" for="female">
        <input id="female" v-model="gender" type="radio" value="female" />
        Женский
      </label>
    </div>
  </label>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("user", ["user"]),
    gender: {
      get() {
        return this.user.gender;
      },
      set(gender) {
        this.UPDATE_USER({ gender });
      },
    },
  },
  methods: mapMutations("user", ["UPDATE_USER"]),
};
</script>
<style scoped>
.user-gender {
  &__label {
    &--first {
      margin-left: 0;
      margin-right: 2rem;
    }
  }
}
</style>
