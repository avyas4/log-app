<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ data: any[] }>();

// Function to filter unique IP addresses
const sortableData = computed(() => {
  const size = 1;
  return props.data.filter(function (item) {
    return item[1] === size;
  });
});

</script>

<template>
  <div class="container">
    <h3>The number of unique IP addresses</h3>
    <ul role="listbox">
      <li v-for="(item, i) in sortableData" :key="i">
        <span v-if="item[1] === 1">
          {{ item[0] }}
        </span>
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
