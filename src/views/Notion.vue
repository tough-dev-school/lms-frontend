<template><NotionRenderer class="notion-renderer" :block-map="blockMap" :map-page-url="mapPageUrl" full-page /></template>
<script>
import { NotionRenderer, getPageBlocks } from "vue-notion";

export default {
  components: {
    NotionRenderer,
  },
  data: () => ({ blockMap: null }),
  async created() {
    this.blockMap = await getPageBlocks(this.$route.params.page);
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
