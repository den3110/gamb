import { API_NAME, API_ROUTES } from '@/constances/api';
import { iPaginate, iPayload } from '@/interface/api';
import { iMemberInfo } from '@/interface/member';
import { api } from '@/services/api';

export const getUserInfo = async () => {
  return api
    .get<iPayload<iMemberInfo>>(API_ROUTES[API_NAME.USER_INFO])
    .then((res) => res.data);
};
