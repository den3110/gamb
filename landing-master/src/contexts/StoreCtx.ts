import { createContext } from 'react';

import { NotificationInstance } from 'antd/es/notification/interface';

import { iGameCategory } from '@/interface/game';

type ContextProps = {
  gameCategories: iGameCategory[];
};

const StoreCtx = createContext<Partial<ContextProps>>({});

export default StoreCtx;
