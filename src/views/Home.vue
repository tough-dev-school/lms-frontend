<template>
  <div class="home">
    <p>first name: {{ user.first_name }}</p>
    <p>Last name: {{ user.last_name }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: mapState("auth", ["user"]),
};
</script>
