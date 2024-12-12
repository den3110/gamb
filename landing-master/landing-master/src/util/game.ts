import { iGameCategory } from '@/interface/game';

interface iData {
  id: string;
  isList: boolean;
  isSub: boolean;
  isPlay: boolean;
  gameName: string;
  gameId: string;
  productId: string;
  gameType: string;
  isNewTab: boolean;
}

export const transformGameCategories = (
  gameCategories: iGameCategory[],
): iData[] => {
  const allGame = gameCategories
    .map((i) => {
      const parent = {
        id: i.id,
        isList: false,
        isSub: false,
        isPlay: i.isPlay,
        cateId: i.catId,
        gameName: i.en.toLowerCase().replaceAll(' ', '-'),
        gameId: '',
        productId: i.ProductId,
        gameType: i.GameType,
        isNewTab: i.isNewTab,
      };

      if (!i.isList) {
        return parent;
      }

      const sub =
        i?.subCategories?.map((s) => {
          return {
            id: s.id,
            isList: false,
            isSub: true,
            isPlay: s.isPlay,
            gameName: s.en.toLowerCase().replaceAll(' ', '-'),
            productId: s.ProductId,
            gameId: s.GameCode,
            gameType: s.GameType,
            isNewTab: s.isNewTab,
          };
        }) || [];

      return [
        {
          ...parent,
          isList: true,
        },
        ...sub,
      ];
    })
    .flat(1);

  return allGame;
};
