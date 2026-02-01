import axios, { AxiosError } from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// AxiosErrorを考慮した共通エラーメッセージ化
export function toErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return (
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Request failed"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected error";
}

export default http;
