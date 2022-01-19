<template>
  <div class="certificates">
    <Spinner v-if="!isLoaded" />
    <div v-else class="certificates__list">
      <h1>Мои сертификаты</h1>
      <ol>
        <li v-for="(certificate, key) in certificates" :key="key">
          <a :href="certificate.url" target="_blank">{{ certificate.course.name }} [{{ certificate.language }}]</a>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import Spinner from "@/components/Spinner";

import axios from "@/api/backend.js";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      isLoaded: false,
      certificates: [],
    };
  },

  async created() {
    this.isLoaded = false;
    const response = await axios.get("/api/v2/diplomas/");
    this.certificates = response.data.results;
    this.isLoaded = true;
  },
};
</script>
