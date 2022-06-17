import axios from "axios";

const api = axios.create({
  baseURL: "https://locomov-tcc.herokuapp.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, HEAD, OPTIONS",
  },
});

export default api;
