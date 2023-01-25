<script setup>
import { ref } from "vue";
import { useFocus } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useStore } from "/src/stores";

const store = useStore();
const { addNewCard } = store;

// 處理使⽤者游標焦點
const target = ref();
useFocus(target, { initialValue: true });

// 切換編輯狀態
const isEditing = ref(false);

// 新增卡片
const title = ref("");
const addCardHandler = () => {
  addNewCard(title.value);
  title.value = "";
  isEditing.value = false;
};
</script>

<template>
  <div
    class="bg-slate-200 block rounded-md p-4 mx-2 border-gray-500 w-[300px] cursor-pointer bg-opacity-70 hover:bg-opacity-90 min-w-[300px]"
  >
    <div
      @click="isEditing = true"
      v-if="!isEditing"
      class="block select-none"
    ></div>

    <div>
      <input
        type="text"
        ref="target"
        class="block w-full p-2 rounded-md"
        v-on-click-outside="() => (isEditing = false)"
        v-model="title"
        @keydown.enter="addCardHandler"
        placeholder="為列表輸入標題"
      />
    </div>
  </div>
</template>
