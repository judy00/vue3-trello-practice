<script setup>
import { ref } from "vue";
import { useFocus } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useStore } from "/src/stores";

const store = useStore();
const { addTask } = store;

// 處理使⽤者游標焦點
const target = ref();
useFocus(target, { initialValue: true });

// 切換編輯狀態，出現 div 或 textarea
const isTitleEditing = ref(false);

// 新增任務
const props = defineProps({
  cardId: String,
});
const title = ref("");
const addTaskHandler = () => {
  addTask(props.cardId, title.value);
  title.value = "";
  isTitleEditing.value = false;
};
</script>

<template>
  <div class="my-3">
    <div
      v-if="!isTitleEditing"
      @click="isTitleEditing = true"
      class="bg-slate-200 p-2 hover:bg-slate-300 hover:rounded-md cursor-pointer text-slate-500"
    >
      + 點擊以新增任務
    </div>
    <textarea
      ref="target"
      v-else
      v-on-click-outside="
        () => {
          isTitleEditing = false;
        }
      "
      v-model="title"
      @keydown.enter="addTaskHandler"
      placeholder="為這張卡片輸入標題"
      class="block w-full resize-none p-2 h-10"
    ></textarea>
  </div>
</template>
