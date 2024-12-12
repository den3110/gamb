import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";

type ContextProps = {
  notifi: NotificationInstance;
};

const NotificationCtx = createContext<Partial<ContextProps>>({});

export default NotificationCtx;
