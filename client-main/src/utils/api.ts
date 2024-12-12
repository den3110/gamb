import { STATUS_CODE } from "@/constance/api";

export const isStatusCodeSuccess = (code: number) =>
  code >= STATUS_CODE.SUCCESS_MIN && code <= STATUS_CODE.SUCCESS_MAX;
