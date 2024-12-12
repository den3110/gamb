import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { getUserInfo } from '@/api/user';
import { getAccessToken } from '@/helpers/auth';
import { iMemberInfo } from '@/interface/member';

const useUser = () => {
  const [user, setUser] = useState<iMemberInfo>();
  const [loadingUser, setLoadingUser] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setUser(null as any);
          setLoadingUser(false);

          return;
        }
        const userInfoEp = await getUserInfo();
        const user = userInfoEp?.data || ({} as any);
        setUser(user);
        setLoadingUser(false);
      } catch (err) {
        setLoadingUser(false);
      }
    })();
  }, [pathname]);

  return { loadingUser, user, setUser };
};

export default useUser;
