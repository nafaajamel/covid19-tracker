<template>
  <div class="card-container">
    <Card
      v-for="(item, key) in stats"
      v-if="item.title"
      :title="item.title"
      :subTitle="item.value"
      :description="item.description"
      :key="key"
    />
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Cards",
  components: { Card },
  props: { stats: Object },
  mounted() {},
};
</script>
<style scoped>
@media screen and (min-width: 800px) {
  .card-container {
    display: flex;
    justify-content: center;
  }
}
</style>
