'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { Spin } from 'antd';

import NotificationCtx from '@/contexts/NotificationCtx';
import { getAccessToken } from '@/helpers/auth';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const params = useParams();
  const [loading, setLoading] = useState(
    !['/', `/${params?.locale}`].includes(pathName),
  );
  const router = useRouter();
  const { notifi } = useContext(NotificationCtx);

  useEffect(() => {
    if (['/', `/${params?.locale}`].includes(pathName)) {
      return;
    }

    const token = getAccessToken();
    if (!token) {
      notifi?.error({
        message: 'Bạn chưa đăng nhập!',
        placement: 'top',
      });
      router.push('/');

      return;
    }

    setLoading(false);
  }, [pathName]);

  if (loading) {
    return (
      <div className="min-h-[100%] flex items-center justify-center bg-white opacity-80">
        <Spin />
      </div>
    );
  }

  return <>{children}</>;
}
