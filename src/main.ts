import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import App from "./App.vue";

// アプリ初期化（Pinia + Router）
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
