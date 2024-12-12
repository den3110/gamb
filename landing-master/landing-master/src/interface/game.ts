export interface iGameCategory {
  id: string;
  isDefault: boolean;
  ProductCode: string;
  ProductName: string;
  ProductId: string;
  GameType: string;
  isList: boolean;
  vi: string;
  en: string;
  isNewTab: boolean;
  isPlay: boolean;
  isNew: boolean;
  color: string;
  GameCode: string;
  catId: string;
  isProduct: boolean;
  isCategory: boolean;
  cssKey: string;
  images: string[];
  bgImage: string;
  logoImages: string[];
  imageKeyPaths: string[];
  subCategories?: iGameCategory[];
}
