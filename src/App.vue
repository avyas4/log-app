<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import ActiveIp from "./components/ActiveIp/ActiveIp.vue";
import MostVisitedUrls from "./components/MostVisitedUrls/MostVisitedUrls.vue";
import UniqueIp from "./components/UniqueIp/UniqueIp.vue";
import { filterUniqueIpCount } from "./services/getUniqueIp";

const responseList = ref<any[]>([]);
const url = "http://localhost:8888/log";

// Declare function on mount
onMounted(() => {
  getLogAPI();
});

async function getLogAPI() {
  // Funcation to make async call to the API http://localhost:8888/log and return data
  try {
    const response = await axios.get(url);
    responseList.value = response.data;
  } catch (err) {
    if (err instanceof Error) {
      // client received an error response (5xx, 4xx)
      console.info("Server Error:", err);
    }
  }
}

// Convert filtered unique count objects into the Array to perform component level iterations and sorting
const unfoldArray = computed(() => {
  const getList: any = filterUniqueIpCount(responseList.value);
  const getListArray = [];
  for (var item in getList) {
    getListArray.push([item, getList[item]]);
  }
  return getListArray;
});

</script>

<template>
  <div class="main-container">
    <UniqueIp :data="unfoldArray"></UniqueIp>
    <ActiveIp :data="unfoldArray"></ActiveIp>
    <MostVisitedUrls :data="responseList"></MostVisitedUrls>
  </div>
</template>

<style>
.main-container {
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  align-content: space-between;
}
</style>
