import { USER_TYPE } from "@/constance/user";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const getUserTypeOfChild = (userType: USER_TYPE) => {
  switch (userType) {
    case USER_TYPE.ADMIN:
      return USER_TYPE.SUPER;

    case USER_TYPE.SUPER:
      return USER_TYPE.MASTER;

    case USER_TYPE.MASTER:
      return USER_TYPE.AGENT;

    case USER_TYPE.AGENT:
      return USER_TYPE.MEMBER;

    default:
      break;
  }
};
