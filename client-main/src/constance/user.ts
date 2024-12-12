import { MEMBER_INFO_KEY } from "@/interfaces/member";

export enum USER_TYPE {
  ADMIN = "ADMIN",
  SUPER = "SUPER",
  MASTER = "MASTER",
  AGENT = "AGENT",
  MEMBER = "MEMBER",
}

export enum EDIT_MEMBER_LIST_TYPE {
  INFO = "INFO",
  TRANSFER = "TRANSFER",
  BET_LIMIT = "BET_LIMIT",
  COMMISSION = "COMMISSION",
  PARLAY_MAX_PAYOUT = "PARLAY_MAX_PAYOUT",
  SB_MIN_PT = "SB_MIN_PT",
  SPORTSBOOK = "SPORTSBOOK",
  VIRTUAL_SPORTS = "VIRTUAL_SPORTS",
  SABA_CASINO = "SABA_CASINO",
  SPORTSBOOK_2 = "SPORTSBOOK_2",
  RNG_SLOT = "RNG_SLOT",
  LOTTO = "LOTTO",
  LIVE_CASINO = "LIVE_CASINO",
  SABA_GAMES = "SABA_GAMES",
  RNG_LOTTERY = "RNG_LOTTERY",
  VIRTUAL_GAMES = "VIRTUAL_GAMES",
  BITCOIN = "BITCOIN",
  RESET_PASSWORD = "RESET_PASSWORD",
  CHANGE_SECURITY_CODE = "CHANGE_SECURITY_CODE",
  REMOVE_OTP = "REMOVE_OTP",
}

export const EDIT_MEMBER_LIST_OPTIONS_ALL: {
  key: EDIT_MEMBER_LIST_TYPE;
  label: string;
}[] = [
  {
    key: EDIT_MEMBER_LIST_TYPE.INFO,
    label: "Thông tin",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.TRANSFER,
    label: "Chuyển khoản",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.BET_LIMIT,
    label: "Giới hạn cược",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.COMMISSION,
    label: "Hoa hồng",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.PARLAY_MAX_PAYOUT,
    label: "Thanh toán tối đa cho Cược Xiên",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.SB_MIN_PT,
    label: "PT nhỏ nhất cho Sportsbook",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.SPORTSBOOK,
    label: "Sportsbook",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.VIRTUAL_SPORTS,
    label: "Virtual Sports",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.SABA_CASINO,
    label: "Saba Casino",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.SPORTSBOOK_2,
    label: "Sportsbook 2",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.RNG_SLOT,
    label: "RNG Slot",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.LOTTO,
    label: "Lô đề",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.LIVE_CASINO,
    label: "Live Casino",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.SABA_GAMES,
    label: "Cổng Game SABA",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.RNG_LOTTERY,
    label: "RNG Lottery",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.VIRTUAL_GAMES,
    label: "Trò chơi Ảo",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.BITCOIN,
    label: "Bitcoin",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.RESET_PASSWORD,
    label: "Đổi Mật khẩu",
  },
  {
    key: EDIT_MEMBER_LIST_TYPE.CHANGE_SECURITY_CODE,
    label: "Thay đổi Mã bảo mật",
  },
];

export const USER_STATUS = {
  SUSPENDED: MEMBER_INFO_KEY.IS_SUPPENDED,
  CLOSED: MEMBER_INFO_KEY.IS_CLOSE,
  //ALLOW_OUTRIGHT = "ALLOW_OUTRIGHT",
  //DOUBLE_COMM = "DOUBLE_COMM",
};

export const USER_STATUS_OPTIONS = [
  {
    label: "Bị đình chỉ",
    key: USER_STATUS.SUSPENDED,
  },
  {
    label: "Bị đóng",
    key: USER_STATUS.CLOSED,
  },
  //{
  //label: "Cho phép Outright",
  //key: USER_STATUS.ALLOW_OUTRIGHT,
  //},
  //{
  //label: "Nhân đôi hoa hồng",
  //key: USER_STATUS.DOUBLE_COMM,
  //},
];
