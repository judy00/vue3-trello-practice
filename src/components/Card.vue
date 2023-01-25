<script setup>
import { ref, watch } from "vue";
import { useFocus } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components"; // import 就會是 directive
import { useStore } from "/src/stores";
import draggable from "vuedraggable";

const props = defineProps({
  id: String,
  title: String,
  tasks: Array,
});

// 處理使⽤者游標焦點
// ref 不放東西。textarea 加上 ref="target"，target.value 就會是 textarea
const target = ref();
useFocus(target, { initialValue: true });

const dragOptions = ref({
  animation: 200,
});

const title = ref(props.title);
// 切換編輯狀態。
const isTitleEditing = ref(false);

// 更新卡片標題＼開啟卡片編輯燈箱
const store = useStore();
const { updateListTitle, openEditTask } = store;

watch(isTitleEditing, () => {
  updateListTitle(props.id, title.value);
});
</script>

<template>
  <div
    class="bg-slate-200 block rounded-md p-4 mx-2 border-gray-500 min-w-[300px]"
  >
    <div
      v-if="!isTitleEditing"
      @click="isTitleEditing = true"
      class="block overflow-hidden text-ellipsis w-4/5 text-lg"
    >
      {{ title }}
    </div>
    <textarea
      ref="target"
      v-else
      v-model="title"
      @keydown.enter="isTitleEditing = false"
      v-on-click-outside="
        () => {
          isTitleEditing = false;
        }
      "
      class="resize-none overflow-hidden border-none w-full p-1 h-8 block"
    ></textarea>

    <draggable
      :list="tasks"
      v-bind="dragOptions"
      group="task"
      itemKey="id"
      ghost-class="opacity-30"
    >
      <template #item="{ element }">
        <TaskItem
          @click="openEditTask(props.id, element.id)"
          v-bind="element"
        />
      </template>
    </draggable>

    <AddNewTask :cardId="props.id" />
  </div>
</template>
