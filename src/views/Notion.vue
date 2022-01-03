<template>
  <NotionRenderer class="notion-renderer" :block-map="blockMap" :map-page-url="mapPageUrl" :page-link-options="pageLinkOptions" full-page />
</template>
<script>
import { NotionRenderer, getPageBlocks } from "vue-notion";

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
      this.blockMap = await getPageBlocks(to.params.page);
    },
  },
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
