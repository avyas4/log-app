<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ data: any[] }>();

// Function to find the most active URL by exact match
const sortableData = computed(() => {
  const arrayOfItems: any = [];
  const duplicates = props.data.filter((item) => {
    if (arrayOfItems.find((i: any) => i.url === item.url)) {
      return true;
    }
    arrayOfItems.push(item);
    return false;
  });

  return duplicates;
});
</script>

<template>
  <div class="container">
    <h3>The top 3 most visited URLs (exact match)</h3>
    <ul role="listbox">
      <li v-for="(item, i) in sortableData" :key="i">
        {{ item.url }}
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
