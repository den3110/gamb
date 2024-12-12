import { getAccessToken } from "@/helpers/auth";
import axios, { AxiosRequestConfig } from "axios";

const baseAxios = axios.create({
  timeout: 600000,
  timeoutErrorMessage: "AXIOS_TIMEOUT_ERROR_MESSAGE",
});

baseAxios.interceptors.request.use(async function (config: any) {
  if (config.headers.Authorization === "") {
    delete config.headers.Authorization;

    return config;
  }

  config.headers.Authorization = `Bearer ${getAccessToken()}` || "";

  return config;
});

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    baseAxios.get<T>(url, config),

  post: <T>(url: string, data: any, config: AxiosRequestConfig<any> = {}) =>
    baseAxios.post<T>(url, data, config),

  put: <T>(url: string, data: any) => baseAxios.put<T>(url, data, {}),

  delete: <T>(url: string) => baseAxios.delete<T>(url, {}),
};
