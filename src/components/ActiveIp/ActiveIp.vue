<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ data: any[] }>();

// Function to sort the most active IP by number of usage
const sortableData = computed(() => {
  return props.data
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .reverse();
});
</script>

<template>
  <div class="container">
    <h3>The top 3 most active IP addresses</h3>
    <ul role="listbox">
      <li v-for="(item, i) in sortableData.slice(0, 3)" :key="i">
        {{ item[0] }}
      </li>
    </ul>
  </div>
</template>

<style>
.container {
  border: 1px solid #333;
  margin: 5px;
}
.container h3 {
  background: #333;
  color: #fff;
  padding: 20px;
  margin: 0;
}
ul li {
  list-style-type: decimal;
  text-align: left;
}
</style>
