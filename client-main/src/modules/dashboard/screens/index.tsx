import { DASHBOARD_MENU_TYPE } from "@/constance/dashboardMenu";
import { USER_TYPE } from "@/constance/user";
import { RootState } from "@/redux/store";
import { Spin } from "antd";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const MemberList = lazy(() => import("../components/MemberList"));
const CreateMember = lazy(() => import("../components/CreateMember"));
const ProblemAccountList = lazy(
  () => import("../components/ProblemAccountList")
);
const NotificationScreen = lazy(
  () => import("../components/NotificationScreen")
);
const CreditBalance = lazy(() => import("../components/CreditBalance"));
const Commission = lazy(() => import("../components/Commission"));
const ListOfInactiveAccounts = lazy(
  () => import("../components/ListOfInactiveAccounts")
);

const Dashboard = () => {
  const { selectedDashboardMenuKeys } = useSelector(
    (state: RootState) => state.dashboard
  );
  const { isShowNotifiCation } = useSelector((state: RootState) => state.app);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const selectedDashboardMenuKey = selectedDashboardMenuKeys?.[0];

  const loading = (
    <div className="w-full h-full flex items-center justify-center">
      <Spin />
    </div>
  );

  if (isShowNotifiCation) {
    return (
      <Suspense fallback={loading}>
        <NotificationScreen />
      </Suspense>
    );
  }

  switch (selectedDashboardMenuKey) {
    case DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.MEMBER_LIST:
      return (
        <Suspense fallback={loading}>
          <MemberList userInfo={userInfo} />
        </Suspense>
      );

    case DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.CREATE_MEMBER:
      return (
        <Suspense fallback={loading}>
          <CreateMember userInfo={userInfo} />
        </Suspense>
      );

    case DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.LIST_OF_PROBLEM_ACCOUNTS:
      return (
        <Suspense fallback={loading}>
          <ProblemAccountList />
        </Suspense>
      );

    case DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.LIMIT_BALANCE:
      return (
        <Suspense fallback={loading}>
          <CreditBalance />
        </Suspense>
      );

    case DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.MEMBERS_COMMISSION:
      return (
        <Suspense fallback={loading}>
          <Commission userInfo={userInfo} />
        </Suspense>
      );

    case DASHBOARD_MENU_TYPE.MEMBER_INFORMATION.LIST_OF_INACTIVE_ACCOUNTS:
      if (userInfo.user_type === USER_TYPE.MEMBER) {
        return <></>;
      }

      return (
        <Suspense fallback={loading}>
          <ListOfInactiveAccounts userInfo={userInfo} />
        </Suspense>
      );

    default:
      return <></>;
  }
};

export default Dashboard;
