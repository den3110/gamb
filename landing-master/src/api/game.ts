import { API_NAME, API_ROUTES } from '@/constances/api';
import { iGameCategory } from '@/interface/game';
import { api } from '@/services/api';

export const getLinkGame = async (body: { ProductID: any; GameType: any }) => {
  return api
    .post<{ ErrorCode: number; ErrorMessage: string; Url: string }>(
      API_ROUTES[API_NAME.PLAY_GAME],
      body,
    )
    .then((res) => res.data);
};

export const getLinkSubGame = async (body: {
  ProductID: any;
  GameType: any;
  GameId: any;
}) => {
  return api
    .post<{ ErrorCode: number; ErrorMessage: string; Url: string }>(
      API_ROUTES[API_NAME.PLAY_SUB_GAME],
      body,
    )
    .then((res) => res.data);
};

export const getGameCategories = async () => {
  return api
    .get<iGameCategory[]>(API_ROUTES[API_NAME.GAME_CATEGORY])
    .then((res) => res.data);
};

export const getGameSubCategories = async (cateId: string) => {
  return api
    .get<{
      ProviderGames: iGameCategory[];
      GamesList: any;
      ErrorCode: number;
      ErrorMessage: any;
    }>(API_ROUTES[API_NAME.GAME_CATEGORY] + `/${cateId}`)
    .then((res) => res.data);
};
