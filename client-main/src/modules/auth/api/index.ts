import { API_NAME, API_ROUTES } from "@/constance/api";
import { iPayload } from "@/interfaces/api";
import { api } from "@/services/api";

export const loginAPI = async (data: any) => {
  return api
    .post<
      iPayload<{
        access_token: string;
      }>
    >(API_ROUTES[API_NAME.LOGIN], data, {
      headers: {
        Authorization: "",
      },
    })
    .then((res) => res.data);
};
