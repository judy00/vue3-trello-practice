<script setup>
import { ref, computed } from "vue";
import { useStore } from "/src/stores";
import draggable from "vuedraggable";

const store = useStore();
const cards = computed(() => store.list); // 取出 store 中的 list

const dragOptions = ref({
  animation: 200,
});
</script>

<template>
  <div
    class="bg-[#c5bcbc] h-[100vh] w-full block overflow-x-auto overflow-y-hidden"
  >
    <div id="board-wrapper" class="h-full w-full p-4 block overflow-auto">
      <draggable
        :list="cards"
        v-bind="dragOptions"
        group="card"
        itemKey="id"
        ghost-class="opacity-30"
        class="flex flex-row items-start"
      >
        <!-- element 不可改名，element 表示原 v-for 前面那個詞-->
        <template #item="{ element }">
          <Card v-bind="element" />
        </template>

        <!-- AddNewCard，用 slot-->
        <template #footer>
          <AddNewCard />
        </template>
      </draggable>
    </div>

    <!-- lightbox -->
    <router-view />
  </div>
</template>
