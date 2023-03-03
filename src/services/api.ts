import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const Api = axios.create({
  baseURL: "http://localhost:8080/api",
});
