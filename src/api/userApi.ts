import http from "@/api/http";
import type { User } from "@/types/user";

export type UserInput = Omit<User, "id">;

export async function fetchUser(id: string): Promise<User> {
  const res = await http.get<User>(`/api/v1/users/${id}`);
  return res.data;
}

// 新規作成
export async function createUser(payload: UserInput): Promise<User> {
  const res = await http.post<User>("/api/v1/users", payload);
  return res.data;
}

// 更新
export async function updateUser(id: string, payload: User): Promise<User> {
  const res = await http.put<User>(`/api/v1/users/${id}`, payload);
  return res.data;
}
