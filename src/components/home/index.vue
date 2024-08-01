<script setup>
import AppCarousel from "../../utils/carousel.vue";
import featured from "./featured.vue";

/// ARTICLE STORE
import { useArticleStore } from "../../stores/articles";
const articleStore = useArticleStore();

articleStore.getArticles(9).finally(() => {
  console.log("aa");
});
</script>

<template>
  <div class="container">
    <AppCarousel />
    <featured />
  </div>
</template>

<style></style>
