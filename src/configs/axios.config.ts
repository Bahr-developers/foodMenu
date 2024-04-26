import axios from "axios";

// base url
import { BASE_URL } from "../constants/BASE_URL";

export const customAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
