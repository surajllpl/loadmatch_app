import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL_ADMIN;

const axiosInstancePanel = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default axiosInstancePanel;
