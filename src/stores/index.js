import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

// 建立亂數 id
const uid = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const defaultList = [
  {
    id: "61bblwnux0tlb1vp3qk",
    title: "In Progress",
    tasks: [
      {
        id: "79bcdufvlfdlb1voaq5",
        title: "功能 A",
        content: "功能 A 描述",
      },
      {
        id: "4ffywwh2sfelb1vob44",
        title: "功能 B",
        content: "功能 B 描述",
      },
    ],
  },
  {
    id: "1ix2wxwsldblb1vpa4h",
    title: "Completed",
    tasks: [
      {
        id: "zm3frri5a4lb0l8c2e",
        title: "功能 C",
        content: "功能 C 描述",
      },
      {
        id: "b8ijxyk2o9lb1vnzio",
        title: "功能 D",
        content: "功能 D 描述",
      },
    ],
  },
];

export const useStore = defineStore("store", () => {
  const list = ref(
    JSON.parse(localStorage.getItem("trello-lists")) || defaultList
  );

  // watch 監聽 lists，將變動後的值存入 localStorage
  watch(
    list,
    (val) => {
      localStorage.setItem("trello-lists", JSON.stringify(val));
    },
    { deep: true }
  );

  const $router = useRouter();
  const currentEditTask = ref({});
  // 開啟編輯任務燈箱
  const openEditTask = (cardId, taskId) => {
    const card = list.value.find((list) => list.id === cardId);
    const task = card.tasks.find((task) => task.id === taskId);
    // 傳入卡片 id, 及任務資訊
    currentEditTask.value = {
      cardId,
      ...task,
    };
    $router.push(`/task/${cardId}/${taskId}`);
  };

  // 關閉燈箱
  const closeEditTask = () => {
    currentEditTask.value = {};
    $router.push("/");
  };

  // 新增卡片
  const addNewCard = (title = "") => {
    if (!title) return;

    list.value.push({
      id: uid(),
      title,
      tasks: [],
    });
  };

  // 更新卡片標題
  const updateListTitle = (cardId = "", title = "") => {
    const card = list.value.find((list) => list.id === cardId);

    if (title) {
      card.title = title;
    } else {
      list.value = list.value.filter((list) => list.id !== cardId);
    }
  };

  // 新增任務
  const addTask = (cardId = "", title = "") => {
    if (!cardId || !title) return;

    const card = list.value.find((list) => list.id === cardId);
    card.tasks.push({
      id: uid(),
      title,
      content: "",
    });
  };

  // 更新任務內容
  const updateTask = (cardId, taskId, title = "", content = "") => {
    const card = list.value.find((list) => list.id === cardId);
    const task = card.tasks.find((task) => task.id === taskId);
    task.title = title;
    task.content = content;
    closeEditTask();
  };

  // 刪除任務
  const deleteTask = (cardId, taskId) => {
    const card = list.value.find((list) => list.id === cardId);
    card.tasks = card.tasks.filter((task) => task.id !== taskId);
    closeEditTask();
  };

  return {
    list,
    currentEditTask,
    openEditTask,
    closeEditTask,
    addNewCard,
    updateListTitle,
    addTask,
    updateTask,
    deleteTask,
  };
});
