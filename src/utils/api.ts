import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default Api;
