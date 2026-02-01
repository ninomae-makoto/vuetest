import { createRouter, createWebHistory } from "vue-router";
import UserEditView from "@/views/UserEditView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 新規作成画面
    {
      path: "/",
      name: "user-create",
      component: UserEditView,
    },
    // 編集画面
    {
      path: "/users/:id/edit",
      name: "user-edit",
      component: UserEditView,
      props: true,
    },
  ],
});

export default router;
