import { DayOfWeek } from "@/constance/api";
import { USER_TYPE } from "@/constance/user";

export enum MEMBER_INFO_KEY {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  IS_ACTIVE = "is_active",
  USERNAME = "username",
  PASSWORD = "username",
  TOKEN = "token",
  GROUP = "group",
  USER_TYPE = "user_type",
  SECURE_CODE = "secure_code",
  IS_ONLINE = "is_online",
  IS_SUPPENDED = "is_suppended",
  IS_CLOSE = "is_close",
  CREDIT_LINE = "credit_line",
  AMOUNT = "amount",
  DISCOUNT_ASIAN = "discount_asian",
  DISCOUNT_1X2 = "discount_1x2",
  DISCOUNT_CS = "discount_cs",
  DISCOUNT_NUMBER = "discount_number",
  DISCOUNT_HR_FIX_ODDS = "discount_hr_fix_odds",
  COMMISSION_GROUP_A = "commission_group_a",
  COMMISSION_GROUP_B = "commission_group_b",
  COMMISSION_GROUP_C = "commission_group_c",
  COMMISSION_GROUP_D = "commission_group_d",
  COMMISSION_GROUP_1X2 = "commission_group_1x2",
  COMMISSION_GROUP_ORTHER = "commission_group_orther",
  TRANSFER_CONFIG = "transfer_config",
}

export interface iMemberInfo {
  id: string;
  [MEMBER_INFO_KEY.FIRST_NAME]: string;
  [MEMBER_INFO_KEY.LAST_NAME]: string;
  [MEMBER_INFO_KEY.IS_ACTIVE]: boolean;
  [MEMBER_INFO_KEY.USERNAME]: string;
  [MEMBER_INFO_KEY.PASSWORD]: string;
  [MEMBER_INFO_KEY.TOKEN]: string;
  [MEMBER_INFO_KEY.GROUP]: string;
  [MEMBER_INFO_KEY.USER_TYPE]: USER_TYPE;
  [MEMBER_INFO_KEY.SECURE_CODE]: string;
  [MEMBER_INFO_KEY.IS_ONLINE]: boolean;
  [MEMBER_INFO_KEY.IS_SUPPENDED]: boolean;
  [MEMBER_INFO_KEY.CREDIT_LINE]: string;
  [MEMBER_INFO_KEY.AMOUNT]: string;
  [MEMBER_INFO_KEY.DISCOUNT_ASIAN]: string;
  [MEMBER_INFO_KEY.DISCOUNT_1X2]: string;
  [MEMBER_INFO_KEY.DISCOUNT_CS]: string;
  [MEMBER_INFO_KEY.DISCOUNT_NUMBER]: string;
  [MEMBER_INFO_KEY.COMMISSION_GROUP_A]: string;
  [MEMBER_INFO_KEY.COMMISSION_GROUP_B]: string;
  [MEMBER_INFO_KEY.COMMISSION_GROUP_C]: string;
  [MEMBER_INFO_KEY.COMMISSION_GROUP_D]: string;
  [MEMBER_INFO_KEY.COMMISSION_GROUP_1X2]: string;
  [MEMBER_INFO_KEY.COMMISSION_GROUP_ORTHER]: string;
  [MEMBER_INFO_KEY.TRANSFER_CONFIG]: DayOfWeek;
  [MEMBER_INFO_KEY.IS_CLOSE]: boolean;
  children?: iMemberInfo[];
}
