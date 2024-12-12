import { isLogin, logout } from "@/helpers/auth";
import useGetCurrentPath from "@/hooks/userGetCurrentPath";
import { setIsShowNotifiCation } from "@/redux/appSlice";
import {
  setIsCollapsedDashboardMenu,
  setSelectedDashboardMenuKeys,
  setSelectedDashboardOpenMenuKeys,
} from "@/redux/dashboardSlice";
import { RootState } from "@/redux/store";
import { fetchUserInfo } from "@/redux/userSlice";
import { routePath } from "@/routes/path";
import { getMenuItemForDashboardMenu } from "@/utils/dashboard-menu";
import { Carousel, Layout, Menu, Spin } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DarkMode from "../DarkMode";
import HeaderMenu from "../HeaderMenu";
import LanguageSelect from "../LanguageSelect";
import Notification from "../Notification";
import Timer from "../Timer";
import HeaderMessage from "./HeaderMessage";
import styles from "./styles.module.less";

const { Header, Sider, Content } = Layout;

interface iProps {
  children?: React.ReactNode;
  t?: any;
}

const LayoutComponent = ({ children, t }: iProps) => {
  const [loading, setLoading] = useState(true);
  const [siderKey, setSiderKey] = useState<"menu" | "account_info">("menu");

  const { pathPattern } = useGetCurrentPath();
  const dispatch = useDispatch();
  const {
    selectedDashboardMenuKeys,
    selectedDashboardOpenMenuKeys,
    isCollapsedDashboardMenu,
  } = useSelector((state: RootState) => state.dashboard);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isLogin()) {
      return;
    }

    setTimeout(() => setLoading(false), 300);
  }, [isLogin()]);

  useEffect(() => {
    if (userInfo?.id || !isLogin()) {
      return;
    }

    dispatch(fetchUserInfo());
  }, [userInfo, isLogin()]);

  const isHasNoLayout = useMemo(
    () =>
      [routePath.Login, routePath.NotFound]?.includes(pathPattern as any) ||
      !Object.values(routePath).includes(pathPattern as any),
    [pathPattern]
  );

  if (isHasNoLayout || !isLogin()) {
    return <>{children}</>;
  }

  const handleClickDashboardMenu = ({ key }) => {
    dispatch(setIsShowNotifiCation(false));
    dispatch(setSelectedDashboardMenuKeys([key]));
  };

  const handleSelectedOpenMenu = (keys: string[]) => {
    dispatch(setSelectedDashboardOpenMenuKeys([keys?.[keys?.length - 1]]));
  };

  const toggleCollapsed = () => {
    dispatch(setIsCollapsedDashboardMenu(!isCollapsedDashboardMenu));
  };

  return (
    <>
      {loading && (
        <div className="fixed h-[100vh] w-[100vw] z-50 flex items-center justify-center bg-white">
          <Spin size="large" />
        </div>
      )}
      <Layout className="h-full">
        <Sider
          className={styles.sider}
          width="300px"
          collapsed={isCollapsedDashboardMenu}
          style={{ boxShadow: "1px 0 3px rgba(0,0,0,.3)" }}
        >
          <div
            className="flex h-[88px] bg-[#314453]"
            style={{
              alignItems: isCollapsedDashboardMenu ? "flex-start" : "center",
            }}
          >
            <div className="pl-[24px] pr-[16px] flex gap-2 py-2">
              <div
                className="rounded-full bg-sky-600"
                style={{
                  width: isCollapsedDashboardMenu ? 32 : 50,
                  height: isCollapsedDashboardMenu ? 32 : 50,
                }}
              />
              {!isCollapsedDashboardMenu && (
                <div className="flex flex-col gap-1">
                  <span className="text-white text-xs">
                    {userInfo?.last_name}
                  </span>
                  <span className="text-white text-xs">
                    {userInfo?.username}
                  </span>
                  <span className="text-white text-xs">
                    OTP:{" "}
                    {userInfo?.is_active ? "đã kích hoạt" : "chưa kích hoạt"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div
            className={`bg-white flex-1 overflow-y-auto ${styles.tabs_container}`}
          >
            {!isCollapsedDashboardMenu && (
              <div className="px-[24px] mt-1 mb-1">
                <div className="font-bold text-center p-[4px] bg-[var(--secondary-color)] rounded-[5px] flex items-center">
                  <div
                    className={classNames({
                      "cursor-pointer w-[50%] h-[28px] leading-[28px] uppercase rounded-[5px]":
                        true,
                      "bg-white text-[var(--secondary-color)]":
                        siderKey === "menu",

                      "bg-[var(--secondary-color)] text-white":
                        siderKey !== "menu",
                    })}
                    onClick={() => setSiderKey("menu")}
                  >
                    {t("Main menu")}
                  </div>
                  <div
                    className={classNames({
                      "cursor-pointer font-bold text-center w-[50%] h-[28px] leading-[28px] uppercase rounded-[5px]":
                        true,
                      "bg-white text-[var(--secondary-color)]":
                        siderKey === "account_info",

                      "bg-[var(--secondary-color)] text-white":
                        siderKey !== "account_info",
                    })}
                    onClick={() => setSiderKey("account_info")}
                  >
                    {t("Account Info")}
                  </div>
                </div>
              </div>
            )}

            {siderKey === "menu" && (
              <>
                <Menu
                  className={styles.menu}
                  openKeys={selectedDashboardOpenMenuKeys}
                  selectedKeys={selectedDashboardMenuKeys}
                  mode="inline"
                  theme="light"
                  items={getMenuItemForDashboardMenu(userInfo?.user_type)}
                  onOpenChange={handleSelectedOpenMenu}
                  onClick={handleClickDashboardMenu}
                />

                <div className="mt-2 px-4 h-[100px]">
                  <Carousel className={styles.carousel} autoplay>
                    <img
                      src="/img/carousel/280x70_msa_vi-VN.jpg"
                      width="280px"
                      height="70px"
                      style={{ width: 280, height: 70, objectFit: "contain" }}
                    />

                    <img
                      src="/img/carousel/280x70_msa_vi-VN_1.jpeg"
                      width="280px"
                      height="70px"
                      style={{ width: 280, height: 70, objectFit: "contain" }}
                    />

                    <img
                      src="/img/carousel/280x70_ssma_vi-VN_2.jpeg"
                      width="280px"
                      height="70px"
                      style={{ width: 280, height: 70, objectFit: "contain" }}
                    />
                  </Carousel>
                </div>
              </>
            )}
          </div>
        </Sider>
        <Layout>
          <Header
            className="flex items-center justify-between h-[48px] px-[12px]"
            style={{
              background: "url(/img/header-background.png) no-repeat",
              backgroundColor: "#314453",
            }}
          >
            <span
              className="icon icon-hamburger"
              style={{ color: "#fff" }}
              onClick={toggleCollapsed}
            />

            <div className="flex items-center gap-4">
              <DarkMode />

              <span className="icon-feedback" />

              <Timer />

              <LanguageSelect />

              <Notification />

              <HeaderMenu />

              <span
                style={{ color: "#fff" }}
                className="icon icon-logout"
                onClick={logout}
              />
            </div>
          </Header>
          <Content className="flex flex-col">
            <HeaderMessage />

            <div className="px-[12px] pb-2 flex-1 overflow-y-auto">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>{" "}
    </>
  );
};

export default withTranslation()(LayoutComponent);
