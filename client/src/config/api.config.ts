// api/apiConfig.js
import { URL } from "@/constants";
import axios from "axios";

const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
