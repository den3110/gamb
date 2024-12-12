export enum STATUS_CODE {
  SUCCESS_MIN = 200,
  SUCCESS_MAX = 299,
}

export enum API_NAME {
  LOGIN = "LOGIN",
  USER_INFO = "USER_INFO",
  MEMBER = "MEMBER",
  CLONE_MEMBER = "clone_member",
  SEARCH_MEMBER = "SEARCH_MEMBER",
  CHECK_CODE_USER = "CHECK_CODE_USER",
}

export const API_ROUTES = {
  [API_NAME.LOGIN]: `${import.meta.env.VITE_API_DOMAIN}/auth/login`,
  [API_NAME.USER_INFO]: `${import.meta.env.VITE_API_DOMAIN}/user/me`,
  [API_NAME.MEMBER]: `${import.meta.env.VITE_API_DOMAIN}/user/member`,
  [API_NAME.CLONE_MEMBER]: `${
    import.meta.env.VITE_API_DOMAIN
  }/user/member/clone`,
  [API_NAME.SEARCH_MEMBER]: `${
    import.meta.env.VITE_API_DOMAIN
  }/user/search/member`,
  [API_NAME.CHECK_CODE_USER]: `${
    import.meta.env.VITE_API_DOMAIN
  }/user/checkcode`,
};

export enum DayOfWeek {
  DAILY = -1,
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}
