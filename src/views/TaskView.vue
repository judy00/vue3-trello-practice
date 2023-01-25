<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "/src/stores";
import { useRoute } from "vue-router";

const store = useStore();
const currentEditTask = computed(() => store.currentEditTask);

// 讓使用者從指定的網址進入自動開啟燈箱
const { openEditTask } = store;
const $route = useRoute();
const { params } = $route;
const cardId = computed(() => params.cardId);
const taskId = computed(() => params.taskId);

onMounted(() => {
  if (cardId.value && taskId.value) {
    openEditTask(cardId.value, taskId.value);
  }
});
</script>

<template>
  <EditBox v-if="currentEditTask?.id" />
</template>
