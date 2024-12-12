'use client';

import { ReactNode, useMemo } from 'react';

import { notification } from 'antd';

import NotificationCtx from '@/contexts/NotificationCtx';

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [api, contextHolder] = notification.useNotification();
  const notifi = useMemo(() => api, []);

  return (
    <NotificationCtx.Provider value={{ notifi }}>
      {contextHolder}
      {children}
    </NotificationCtx.Provider>
  );
}
