import { API_NAME, API_ROUTES } from "@/constance/api";
import { iPaginate, iPayload } from "@/interfaces/api";
import { iMemberInfo } from "@/interfaces/member";
import { api } from "@/services/api";

export const getUserInfo = async () => {
  return api
    .get<iPayload<iMemberInfo>>(API_ROUTES[API_NAME.USER_INFO])
    .then((res) => res.data);
};

export const getMemberListById = async (id: any, params?: Object) => {
  return api
    .get<iPayload<{ items: iMemberInfo[] } & iPaginate>>(
      API_ROUTES[API_NAME.MEMBER] + `/${id}`,
      { params }
    )
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: {
          items: [],
          totalCount: 0,
          pageSize: 0,
          pageNumber: 0,
          totalPages: 0,
        } as any,
        statusCode: 400,
        message: err.message,
      } as iPayload<{ items: iMemberInfo[] } & iPaginate>;
    });
};

export const checkCodeUser = async (data: { code: string }) => {
  return api
    .post<iPayload<boolean>>(API_ROUTES[API_NAME.CHECK_CODE_USER], data)
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: false,
        statusCode: 400,
        message: err.message,
      } as iPayload<boolean>;
    });
};

export const createMember = async (data: any) => {
  return api
    .post<iPayload<iMemberInfo>>(API_ROUTES[API_NAME.MEMBER], data)
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: null,
        statusCode: 400,
        message: err.message,
      } as iPayload<iMemberInfo>;
    });
};

export const cloneMember = async (data: any) => {
  return api
    .post<iPayload<string[]>>(API_ROUTES[API_NAME.CLONE_MEMBER], data)
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: null,
        statusCode: 400,
        message: err.message,
      } as iPayload<string[]>;
    });
};

export const editMemberInfo = async (id: any, data: any) => {
  return api
    .put<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${id}/info`,
      data
    )
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: null,
        statusCode: 400,
        message: err.message,
      } as iPayload<iMemberInfo>;
    });
};

export const editMemberConditionTransfer = async (id: any, data: any) => {
  return api
    .put<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${id}/conditiontransfer`,
      data
    )
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: null,
        statusCode: 400,
        message: err.message,
      } as iPayload<iMemberInfo>;
    });
};

export const editMemberSecurityCode = async (id: any, data: any) => {
  return api
    .put<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${id}/secureCode`,
      data
    )
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: null,
        statusCode: 400,
        message: err.message,
      } as iPayload<iMemberInfo>;
    });
};

export const editMemberPassword = async (id: any, data: any) => {
  return api
    .put<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${id}/password`,
      data
    )
    .then((res) => res.data)
    .catch((err) => {
      return {
        data: null,
        statusCode: 400,
        message: err.message,
      } as iPayload<iMemberInfo>;
    });
};

export const blockMember = async (userId: string) => {
  return api
    .delete<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${userId}/block`
    )
    .then((res) => res.data);
};

export const suppendMember = async (userId: string) => {
  return api
    .delete<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${userId}/suppend`
    )
    .then((res) => res.data);
};

export const revertBlockMember = async (userId: string) => {
  return api
    .put<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${userId}/revertblock`,
      {}
    )
    .then((res) => res.data);
};

export const revertSuppendMember = async (userId: string) => {
  return api
    .put<iPayload<iMemberInfo>>(
      API_ROUTES[API_NAME.MEMBER] + `/${userId}/revertsuppend`,
      {}
    )
    .then((res) => res.data);
};

export const searchMember = async ({
  userName,
  page = 1,
  size = 10,
}: {
  userName: string;
  page?: number;
  size?: number;
}) => {
  return api
    .get<iPayload<{ items: iMemberInfo[] } & iPaginate>>(
      API_ROUTES[API_NAME.SEARCH_MEMBER],
      {
        params: {
          userName,
          page,
          size,
        },
      }
    )
    .then((res) => res.data);
};
