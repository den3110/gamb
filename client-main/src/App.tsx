import ErrorBoundary from "@/components/ErrorBoundary";
import AppRoute from "./routes";
import { notification } from "antd";
import NotificationCtx from "./contexts/NotificationCtx";
import { useMemo } from "react";
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [api, contextHolder] = notification.useNotification();
  const notifi = useMemo(() => api, []);
  const { mode } = useSelector((state: RootState) => state.app);

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        token: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          colorPrimary: "#0b599c",
          fontSize: 13,
        },
      }}
    >
      <NotificationCtx.Provider value={{ notifi }}>
        <ErrorBoundary>
          {contextHolder}
          <AppRoute />
        </ErrorBoundary>
      </NotificationCtx.Provider>
    </ConfigProvider>
  );
}

export default App;
