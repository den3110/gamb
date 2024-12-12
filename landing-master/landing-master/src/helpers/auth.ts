import { Buffer } from 'buffer';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { isEmpty } from 'lodash';

import { ACCESS_TOKEN } from '@/constances/auth';
import { routePath } from '@/routes/path';

export const afterLogin = (token: string) => {
  const token_key = Buffer.from(ACCESS_TOKEN).toString('base64');
  let expires = new Date();
  expires.setTime(new Date().getTime() + 60 * 60 * 1000 * 24 * 14);
  Cookies.set(token_key, token, { expires });
};

export const logout = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
  localStorage.clear();

  window.location.href = routePath.Login;
};

export const getAccessToken = (): any => {
  const token_key = Buffer.from(ACCESS_TOKEN).toString('base64');
  return Cookies.get(token_key);
};

export const isLogin = () => {
  try {
    const access_token = getAccessToken();
    let decoded: any = jwt_decode(access_token);
    if (isEmpty(decoded)) {
      return false;
    }
    return Date.now() <= decoded.exp * 1000;
  } catch (error) {
    return false;
  }
};
