<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserEditStore } from "@/stores/userEditStore";

const route = useRoute();
// 画面ロジックはStoreに集約
const store = useUserEditStore();
const { loading, saving, message, error, form, saveLabel } = storeToRefs(store);

const userId = () => String(route.params.id ?? "");
const hasId = () => Boolean(route.params.id);

// 初期表示時のデータ取得／新規初期化
onMounted(() => {
  if (hasId()) {
    store.load(userId());
  } else {
    store.initCreate();
  }
});

// ルート変更時に再取得／再初期化
watch(
  () => route.params.id,
  () => {
    if (hasId()) {
      store.load(userId());
    } else {
      store.initCreate();
    }
  }
);
</script>

<template>
  <div>
    <h1>User Edit</h1>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <form
        @submit.prevent="store.save()"
      >
        <div>
          <label for="name">Name</label>
          <input id="name" v-model="form.name" type="text" />
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" />
        </div>
        <button type="submit" :disabled="saving">
          {{ saving ? "Saving..." : saveLabel }}
        </button>
      </form>

      <div v-if="message">{{ message }}</div>
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>
