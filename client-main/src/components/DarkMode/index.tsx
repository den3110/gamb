import DarkModeIcon from "@/icon/DarkModeIcon";
import LightModeIcon from "@/icon/LightModeIcon";
import { setMode } from "@/redux/appSlice";
import { RootState } from "@/redux/store";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.less";

const DarkMode = () => {
  const { mode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const switchToDarkMode = () => {
    dispatch(setMode("dark"));
  };

  const switchToLightMode = () => {
    dispatch(setMode("light"));
  };

  return (
    <>
      {mode === "light" && (
        <DarkModeIcon
          className={styles.darkmode_icon}
          onClick={switchToDarkMode}
        />
      )}

      {mode === "dark" && (
        <LightModeIcon
          className={styles.lightmode_icon}
          onClick={switchToLightMode}
        />
      )}
    </>
  );
};

export default memo(DarkMode);
