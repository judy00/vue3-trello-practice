<script setup>
const props = defineProps({
  id: String,
  title: String,
  content: String,
});
// 純顯示，所以不用 ref 包裝
</script>

<template>
  <div
    class="block my-2 w-full py-2 px-3 rounded-md bg-white overflow-hidden select-none"
  >
    <div class="block font-bold">{{ props.title }}</div>
    <div class="overflow-hidden text-ellipsis">{{ props.content }}</div>
  </div>
</template>
