import axios from "axios";

export const apiClient = axios.create({
  // TODO: 環境変数から取得するよう改修
  baseURL: "http://localhost:8010/api",
  headers: {
    "Content-Type": "application/json",
  },
});
