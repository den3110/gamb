'use client';

import { useContext, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Button, Switch } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { getLinkGame, getLinkSubGame } from '@/api/game';
import { STYLE_MENU_DATA, SUB_BG_IMAGE, SUB_IMAGE } from '@/constances/menu';
import NotificationCtx from '@/contexts/NotificationCtx';
import { logout } from '@/helpers/auth';
import useUser from '@/hooks/useUser';
import { iGameCategory } from '@/interface/game';
import { transformGameCategories } from '@/util/game';

import style from './style.module.css';

import HeaderMessage from '../HeaderMessage';
import Icons from '../Icons';
import LocaleSwitcher from '../LocaleSwitcher';
import FormLogin from './ui/FormLogin';

interface iProps {
  gameCategories: iGameCategory[];
}

export function SiteHeader({ gameCategories }: iProps) {
  const { user, loadingUser } = useUser();
  const router = useRouter();
  const params = useParams();
  const { notifi } = useContext(NotificationCtx);

  const locale = params?.locale;
  const t = useTranslations('header');

  const swiperWrapperRef = useRef<(HTMLDivElement | null)[]>([]);

  if (loadingUser) {
    return <></>;
  }

  const styleHeaderMenuItem = `pb-2 px-[1.5%] text-center text-white hover:text-[#d45549] cursor-pointer font-bold ${style.header_menu_item}`;

  const scrollSwiperWrapper = (key: number, type: 'left' | 'right') => {
    const element = swiperWrapperRef.current[key];
    const isHasScroll =
      (element?.scrollWidth || 0) > (element?.clientWidth || 0);
    if (!element || !isHasScroll) {
      return;
    }

    const offsetWidth = 224;
    const left = element.scrollLeft + offsetWidth * (type === 'right' ? 1 : -1);
    element.scrollTo({
      left,
      behavior: 'smooth',
    });
  };

  const navigateGame = async (id: string) => {
    const allGame = transformGameCategories(gameCategories);

    const currentGame = allGame.find((g) => g?.id === id);

    if (!currentGame?.isPlay) {
      return;
    }

    if (!currentGame?.isNewTab) {
      router.replace(`/${id}`);

      return;
    }

    if (currentGame?.isNewTab) {
      let url = '';
      let err = '';
      if (currentGame.isSub) {
        const ep = await getLinkSubGame({
          ProductID: String(currentGame.productId),
          GameType: String(currentGame.gameType),
          GameId: String(currentGame.gameId),
        });

        url = ep.Url;
        err = ep.ErrorMessage;
      } else {
        const ep = await getLinkGame({
          ProductID: String(currentGame.productId),
          GameType: String(currentGame.gameType),
        });

        url = ep.Url;
        err = ep.ErrorMessage;
      }

      if (err) {
        notifi?.error({
          message: err,
          placement: 'top',
        });
      }

      if (url) {
        window.open(url, currentGame.gameName, 'width=1300,height=740');
      }
    }
  };

  if (user) {
    return (
      <header className="relative bg-[#2D4976] pt-1">
        <div className="flex items-stretch gap-2 px-2">
          <div className="w-[214px] h-[70px] relative flex-shrink-0">
            <Image src="/logo_vn_w.svg" alt="logo" fill className="pb-2" />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center gap-1 mb-2">
              <HeaderMessage />

              <div className="h-[30px] border border-white p-1 flex items-center gap-1 rounded-[4px]">
                <span className="text-white text-xs">Chế độ nền tối</span>
                <Switch size="small" />
              </div>

              <LocaleSwitcher />
              <Button className={style.button_logout} onClick={logout}>
                Đăng xuất
              </Button>
            </div>

            <div className={style.menu_content}>
              {gameCategories?.map((menu, key) => (
                <div
                  className={classNames({
                    [styleHeaderMenuItem]: true,
                    [style.header_menu_item_acive]:
                      menu.id === params['game-name'] ||
                      menu?.subCategories
                        ?.map((s) => s.id)
                        .includes(params['game-name']),
                  })}
                  key={key}
                  onClick={() => navigateGame(menu.id)}
                >
                  <span className={style.header_menu_item_text}>
                    {locale === 'vi-VN'
                      ? menu.vi || menu.ProductName
                      : locale === 'en-US'
                      ? menu.en || menu.ProductName
                      : menu.ProductName}
                    {menu.isNew && (
                      <span className={style.header_menu_item_new}>
                        {t('new')}
                      </span>
                    )}
                  </span>
                  {menu.isList && (
                    <div className={style.header_sub_menu}>
                      <div
                        className={style.left}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollSwiperWrapper(key, 'left');
                        }}
                      >
                        <Icons.LucideChevronLeft className="h-5 w-5" />
                      </div>
                      <div
                        className={style.right}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollSwiperWrapper(key, 'right');
                        }}
                      >
                        <Icons.LucideChevronRight className="h-5 w-5" />
                      </div>

                      <div className={style.header_sub_menu_container}>
                        <div
                          className={style.swiper_wrapper}
                          ref={(el) => (swiperWrapperRef.current[key] = el)}
                        >
                          {menu?.subCategories?.map((sub, subKey) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateGame(sub.id);
                              }}
                              className={style.header_sub_menu_item}
                              style={
                                {
                                  '--bg-header-sub_menu-item-before':
                                    STYLE_MENU_DATA[sub.cssKey]
                                      .subItemBackgroundBefore,
                                  '--bg-header-sub_menu-item-after':
                                    STYLE_MENU_DATA[sub.cssKey]
                                      .subItemBackgroundAfter,
                                } as any
                              }
                              key={subKey}
                            >
                              {sub.isNew && (
                                <div className={style.header_sub_new}>
                                  {t('new')}
                                </div>
                              )}

                              <div className={style.header_sub_menu_bg}>
                                <picture>
                                  <source
                                    type="image/webp"
                                    srcSet={sub.bgImage}
                                  />
                                  <img alt="" src={sub.bgImage} />
                                </picture>
                              </div>

                              <div className={style.header_sub_menu_vision}>
                                {sub?.images?.map((img, imgKey) => (
                                  <picture key={imgKey}>
                                    <source type="image/webp" srcSet={img} />
                                    <img alt="" src={img} />
                                  </picture>
                                ))}
                              </div>

                              {!!sub.logoImages.length && (
                                <div className={style.header_sub_menu_logo}>
                                  {sub.logoImages.map((img, imgKey) => (
                                    <picture key={imgKey}>
                                      <source type="image/webp" srcSet={img} />
                                      <img alt="" src={img} />
                                    </picture>
                                  ))}
                                </div>
                              )}

                              <div
                                className={style.header_sub_menu_play}
                                style={
                                  {
                                    left: 68,
                                    '--bg-sub-menu-play':
                                      STYLE_MENU_DATA[sub.cssKey]
                                        .subMenuPlayBackground,
                                  } as any
                                }
                              >
                                <span>Chơi ngay</span>
                              </div>

                              <div
                                className={style.header_sub_menu_name}
                                style={
                                  {
                                    '--bg-sub-menu-name':
                                      STYLE_MENU_DATA[sub.cssKey]
                                        .subNameBackground,
                                  } as any
                                }
                              >
                                <span>
                                  {locale === 'vi-VN'
                                    ? sub.vi || sub.ProductName
                                    : locale === 'en-US'
                                    ? sub.en || sub.ProductName
                                    : sub.ProductName}
                                </span>
                                <img src="/arrow.svg" alt="" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {menu.isList && <div className={style.header_menu_bg} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={style.header}>
      <div className="mx-auto max-w-[var(--max-width)] mobile:px-2 flex items-stretch justify-between">
        <Link
          href="/"
          className="lg:w-[214px] h-[70px] relative mobile:w-[120px]"
        >
          <Image src="/logo_vn.svg" alt="logo" className="pt-2" fill />
        </Link>
        <FormLogin />
      </div>
      <div className={style.header_menu}>
        <div className="mx-auto max-w-[var(--max-width)] h-9 flex items-stretch">
          {[
            'Thể thao',
            'Thể thao ảo',
            'Thể thao điện tử',
            'Number Game',
            'Trò chơi',
            'RNG Keno',
            'Cổng game SABA',
          ].map((name, key) => (
            <span
              key={key}
              className="px-3 flex items-center text-white text-base flex-1 hover:bg-[#29487d] justify-center cursor-pointer"
              onClick={() => {
                notifi?.warning({
                  message: 'Bạn chưa đăng nhập',
                  placement: 'top',
                });
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
