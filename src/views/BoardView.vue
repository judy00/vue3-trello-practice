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
      <!-- <div class="flex flex-row items-start"> -->
      <!-- <Card v-for="card in list" :key="card.id" v-bind="card" /> -->
      <!-- 把 card 資料傳給 Card component, 不使用:card="card", 因子元件會一同修改同 ref, 使用 v-bind 傳進去物件會解構變 id ,title, task-->
      <!-- <AddNewCard /> -->
      <!-- </div> -->

      <draggable
        :list="cards"
        v-bind="dragOptions"
        group="card"
        itemKey="id"
        ghost-class="opacity-30"
        class="flex flex-row items-start"
      >
        <!-- 原本的 Card，沒有 v-for 了, element 不可改名＝v-for前面那個詞-->
        <template #item="{ element }">
          <Card v-bind="element" />
        </template>

        <!-- AddNewCard，像 slot-->
        <template #footer>
          <AddNewCard />
        </template>
      </draggable>
    </div>

    <!-- lightbox -->
    <router-view />
  </div>
</template>
