import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL,
});

api.interceptors.request.use(async (config) => {
  const controller = new AbortController();
  //@ts-ignore
  const localStorageSession = JSON.parse(localStorage.getItem("sessionInfo"));
  const cfg = {
    ...config,
    signal: controller.signal,
  };
  if (config.method != "get" && !localStorageSession) {
    controller.abort("Please login to perform this action");
    window.location.replace("/enter");
  }
  return cfg;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
    }
    return Promise.reject(error);
  }
);
