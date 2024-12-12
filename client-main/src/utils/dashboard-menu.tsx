import { DASHBOARD_MENU_TYPE } from "@/constance/dashboardMenu";
import { USER_TYPE } from "@/constance/user";
import { CalendarOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { getUserTypeOfChild } from "./user";
import i18n from "@/lib/i18n";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const getCreateMemberInfo = (userType: USER_TYPE) => {
  let name = i18n.t("New Agent");
  const userTypeOfChild = getUserTypeOfChild(userType);

  switch (userTypeOfChild) {
    case USER_TYPE.SUPER:
      name = i18n.t("New Super");
      break;

    case USER_TYPE.MASTER:
      name = i18n.t("New Master");
      break;

    case USER_TYPE.AGENT:
      name = i18n.t("New Agent");

    case USER_TYPE.MEMBER:
      name = i18n.t("New Member");

    default:
      break;
  }

  return {
    name,
    item: getItem(name, DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.CREATE_MEMBER),
  };
};

export const getMemberListInfo = (userType: USER_TYPE) => {
  let name = i18n.t("Agent List");
  const userTypeOfChild = getUserTypeOfChild(userType);

  switch (userTypeOfChild) {
    case USER_TYPE.SUPER:
      name = i18n.t("Super List");
      break;

    case USER_TYPE.MASTER:
      name = i18n.t("Master List");
      break;

    case USER_TYPE.AGENT:
      name = i18n.t("Agent List");
      break;

    case USER_TYPE.MEMBER:
      name = i18n.t("Member List");
      break;

    default:
      break;
  }

  return {
    name,
    item: getItem(name, DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.MEMBER_LIST),
  };
};

export const getMenuItemForDashboardMenu = (userType: USER_TYPE) => {
  const items: MenuItem[] = [
    getItem(
      i18n.t("Reports"),
      DASHBOARD_MENU_TYPE.REPORTS.type,
      <span className="icon icon-reports" />,
      [
        getItem(
          i18n.t("Agent Outstanding"),
          DASHBOARD_MENU_TYPE.REPORTS.AGENTS_UNPROCESSED_MONEY
        ),
        getItem(
          i18n.t("Agent Win Loss"),
          DASHBOARD_MENU_TYPE.REPORTS.AGENTS_VICTORY_AND_DEFEAT
        ),
        getItem(
          i18n.t("Agent Win Loss Detail"),
          DASHBOARD_MENU_TYPE.REPORTS.AGENTS_WINNING_AND_LOSING_DETAILS
        ),
        getItem(
          i18n.t("Match Win Loss Detail"),
          DASHBOARD_MENU_TYPE.REPORTS.DETAILS_OF_WINS_AND_LOSSES_BY_MATCH
        ),
        getItem(
          i18n.t("Win Loss Analysis"),
          DASHBOARD_MENU_TYPE.REPORTS.ANALYSIS_OF_WIN_LOSS_RATIO
        ),
        getItem(
          i18n.t("Win Loss Analysis Chart"),
          DASHBOARD_MENU_TYPE.REPORTS.CHART_OF_WINNING_AND_LOSING
        ),
        getItem(
          i18n.t("Win Loss By Product"),
          DASHBOARD_MENU_TYPE.REPORTS.WIN_OR_LOSE_ON_PRODUCTS
        ),
        getItem(
          i18n.t("Commission By Bet Type"),
          DASHBOARD_MENU_TYPE.REPORTS.COMMISSIONS_BY_BET_TYPE
        ),
        getItem(i18n.t("Statement"), DASHBOARD_MENU_TYPE.REPORTS.STATEMENTS),
        getItem(i18n.t("Results"), DASHBOARD_MENU_TYPE.REPORTS.RESULT),
        getItem(
          i18n.t("Schedule"),
          DASHBOARD_MENU_TYPE.REPORTS.BONUS_OPENING_SCHEDULE
        ),
        getItem(
          i18n.t("Progressive Games Contribution"),
          DASHBOARD_MENU_TYPE.REPORTS.PROGRESSIVE_GAME_ACCUMULATION
        ),
        getItem(
          i18n.t("Bet Credit Tracking"),
          DASHBOARD_MENU_TYPE.REPORTS.MONITOR_AVAILABILITY_LIMITS
        ),
      ]
    ),

    getItem(
      i18n.t("MEMBER INFORMATION"),
      DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.type,
      <span className="icon icon-memberinfo" />,
      [
        getCreateMemberInfo(userType)?.item,
        getItem(
          i18n.t("Sub Account"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.SECOND_ACCOUNT
        ),
        getMemberListInfo(userType)?.item,
        getItem(
          i18n.t("Problem Account List"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.LIST_OF_PROBLEM_ACCOUNTS
        ),
        getItem(
          i18n.t("Credit/Balance"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.LIMIT_BALANCE
        ),
        getItem(
          i18n.t("Position Taking (%)"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.POSITION_TAKING
        ),
        getItem(
          i18n.t("Member Commission"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.MEMBERS_COMMISSION
        ),
        getItem(
          i18n.t("Indirect Login Account"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.INDIRECT_ACCOUNT_LOGIN
        ),
        getItem(
          i18n.t("Dormant Account List"),
          DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.LIST_OF_INACTIVE_ACCOUNTS
        ),
      ]
    ),

    getItem(
      i18n.t("BET LISTS"),
      DASHBOARD_MENU_TYPE.LIST_OF_BETS.type,
      <span className="icon icon-betlists" />,
      [
        getItem(
          i18n.t("Cancelled Bets"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.BE_AVOID
        ),
        getItem(
          i18n.t("Correct Score"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.ACCURACY_SCORE
        ),
        getItem(
          i18n.t("Parlay"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.SYNTHETIC_BETS
        ),
        getItem(
          i18n.t("Clean Sheet"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.KEEP_THE_NET_CLEAN
        ),
        getItem(
          i18n.t("Double Chance"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.DOUBLE_CHANCE
        ),
        getItem(
          i18n.t("Both/One/Neither Team To Score"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.BOTH_ONE_NO_TEAM_SCORED
        ),
        getItem(
          i18n.t("To Win To Nil"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS.OVERWHELMING_WIN_BETS
        ),
        getItem(
          i18n.t("3-Way Handicap"),
          DASHBOARD_MENU_TYPE.LIST_OF_BETS._3_WAY_HANDICAP
        ),
      ]
    ),

    getItem(
      i18n.t("BETS & FORECAST"),
      DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.type,
      <span className="icon icon-betsandforecast" />,
      [
        getItem(
          i18n.t("Handicap/Over Under/Live"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.HANDICAP_OVER_UNDER_LIVE_BETS
        ),
        getItem(
          i18n.t("Money Line"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.MONEYLINE
        ),
        getItem(
          i18n.t("Odd/Even + 1x2 + DND"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.ODD_EVEN_1X2_DRAW_NO_DRAW
        ),
        getItem(
          i18n.t("FT & HT Total Goal"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.TOTAL_GOALS
        ),
        getItem(
          i18n.t("Outright"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.BET_WIN
        ),
        getItem(
          i18n.t("HT/FT"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.H1_FULL_MATCH
        ),
        getItem(
          i18n.t("FT & HT FG/LG"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.FIRST_LAST_GOALS
        ),
        getItem(
          i18n.t("Home/Draw/Away No Bet"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.HOUSE_TIE_GUEST_NOT_INCLUDED
        ),
        getItem(
          i18n.t("Number Game"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.NUMBER_GAME
        ),
        getItem(i18n.t("1X2"), DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION._1X2),
        getItem(
          i18n.t("Score Map"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.SCORE_MAP
        ),
        getItem(
          i18n.t("Lotto"),
          DASHBOARD_MENU_TYPE.TOTAL_BET_PREDICTION.PLOT_THREADS
        ),
      ]
    ),

    getItem(
      i18n.t("TRANSFER"),
      DASHBOARD_MENU_TYPE.TRANSFER.type,
      <span className="icon icon-transfer" />
    ),

    getItem(
      i18n.t("VIEW LOG"),
      DASHBOARD_MENU_TYPE.DIARY.type,
      <CalendarOutlined />,
      [
        getItem(i18n.t("Setting"), DASHBOARD_MENU_TYPE.DIARY.SETTINGS),
        getItem(i18n.t("Status"), DASHBOARD_MENU_TYPE.DIARY.STATUS),
        getItem(i18n.t("Credit"), DASHBOARD_MENU_TYPE.DIARY.CREDIT),
        getItem(i18n.t("Login"), DASHBOARD_MENU_TYPE.DIARY.LOGIN),
      ]
    ),

    getItem(
      i18n.t("ANNOUNCEMENTS"),
      DASHBOARD_MENU_TYPE.NOTIFY.type,
      <span className="icon icon-viewlog" />,
      [
        getItem(i18n.t("Normal"), DASHBOARD_MENU_TYPE.NOTIFY.COMMON),
        getItem(i18n.t("Special"), DASHBOARD_MENU_TYPE.NOTIFY.SPECIAL),
        getItem(i18n.t("System"), DASHBOARD_MENU_TYPE.NOTIFY.SYSTEM),
        getItem(
          i18n.t("Personal Message"),
          DASHBOARD_MENU_TYPE.NOTIFY.MESSAGE_PERSONAL
        ),
      ]
    ),

    getItem(
      i18n.t("RISK MANAGEMENT"),
      DASHBOARD_MENU_TYPE.RISK_MANAGEMENT.type,
      <span className="icon icon-riskmanagement" />,
      [
        getItem(
          i18n.t("Member Win/Loss Limit"),
          DASHBOARD_MENU_TYPE.RISK_MANAGEMENT.MEMBERS_WIN_LOSS_LIMIT
        ),
        getItem(
          i18n.t("My Thresholds New"),
          DASHBOARD_MENU_TYPE.RISK_MANAGEMENT.NEW_WIN_LOSS_LEVELS
        ),
      ]
    ),

    { type: "divider" },

    getItem(
      i18n.t("SECURITY"),
      DASHBOARD_MENU_TYPE.SECURITY.type,
      <span className="icon icon-sercuritycode" />
    ),
    getItem(
      i18n.t("BACKUP DOMAINS"),
      DASHBOARD_MENU_TYPE.BACKUP_DOMAIN_NAME.type,
      <span className="icon icon-backupdomains" />
    ),
  ];

  return items;
};
