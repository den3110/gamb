import { createContext } from 'react';

import { NotificationInstance } from 'antd/es/notification/interface';

type ContextProps = {
  notifi: NotificationInstance;
};

const NotificationCtx = createContext<Partial<ContextProps>>({});

export default NotificationCtx;
