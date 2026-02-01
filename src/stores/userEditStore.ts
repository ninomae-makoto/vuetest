import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "@/types/user";
import { createUser, fetchUser, updateUser } from "@/api/userApi";
import { toErrorMessage } from "@/api/http";

export const useUserEditStore = defineStore("userEdit", () => {
  // 画面状態（読み込み・保存・メッセージ）
  const loading = ref(false);
  const saving = ref(false);
  const message = ref<string | null>(null);
  const error = ref<string | null>(null);

  // フォームと元データ（比較・復元用）
  const original = ref<User | null>(null);
  const form = ref<User>({
    id: "",
    name: "",
    email: "",
  });

  // 新規作成かどうか
  const isCreate = computed(() => !form.value.id);
  // 画面表示用の保存ボタン文言
  const saveLabel = computed(() => (isCreate.value ? "Create" : "Save"));

  // 既存ユーザーの取得とフォーム反映
  async function load(id: string) {
    loading.value = true;
    error.value = null;
    message.value = null;
    try {
      const user = await fetchUser(id);
      original.value = { ...user };
      form.value = { ...user };
    } catch (e) {
      error.value = toErrorMessage(e);
    } finally {
      loading.value = false;
    }
  }

  // 新規作成フォームの初期化
  function initCreate() {
    original.value = {
      id: "",
      name: "",
      email: "",
    };
    form.value = {
      id: "",
      name: "",
      email: "",
    };
    loading.value = false;
    saving.value = false;
    message.value = null;
    error.value = null;
  }

  // 作成/更新の保存処理
  async function save() {
    saving.value = true;
    error.value = null;
    message.value = null;
    try {
      if (isCreate.value) {
        const created = await createUser({
          name: form.value.name,
          email: form.value.email,
        });
        original.value = { ...created };
        form.value = { ...created };
        message.value = "Created";
      } else {
        const updated = await updateUser(form.value.id, { ...form.value });
        original.value = { ...updated };
        form.value = { ...updated };
        message.value = "Saved";
      }
    } catch (e) {
      error.value = toErrorMessage(e);
    } finally {
      saving.value = false;
    }
  }

  return {
    loading,
    saving,
    message,
    error,
    form,
    isCreate,
    saveLabel,
    load,
    initCreate,
    save,
  };
});
