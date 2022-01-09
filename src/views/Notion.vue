<template>
  <NotionRenderer class="notion-renderer" :block-map="blockMap" :map-page-url="mapPageUrl" :page-link-options="pageLinkOptions" full-page />
</template>
<script>
import { NotionRenderer } from "vue-notion";

import axios from "@/api/backend.js";

async function fetchNotionBlocks(pageId) {
  const response = await axios.get(`/api/v2/notion/${pageId}/`);
  return response.data;
}

export default {
  components: {
    NotionRenderer,
  },
  data: () => ({
    blockMap: null,
    pageLinkOptions: {
      component: "router-link",
      href: "to",
    },
  }),
  watch: {
    async $route(to) {
      this.blockMap = await fetchNotionBlocks(to.params.page);
    },
  },
  async created() {
    this.blockMap = await fetchNotionBlocks(this.$route.params.page);
  },

  methods: {
    mapPageUrl(pageId) {
      return `/notion/${pageId}/`;
    },
  },
};
</script>

<style src="vue-notion/src/styles.css" />

<style scoped>
.notion-renderer {
  margin: auto;
}
</style>
