'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { Grid } from 'antd';

import style from './style.module.css';

import LobbyProduct, { iLobbProduct } from '.';
import Icons from '../Icons';

export default function LobbyProducts() {
  const screen = Grid.useBreakpoint();

  const LOBBY_PRODUCT: Array<iLobbProduct> = useMemo(
    (): Array<iLobbProduct> => [
      {
        imageSrc: '/lobby-product/Product_Soccer.jpg',
        title: 'Bóng đá',
        desc: 'Đặt cược và đắm mình trong môn thể thao phổ biến nhất thế giới',
      },
      {
        imageSrc: '/lobby-product/SabaClub.jpg',
        title: 'Cổng Game SABA',
        desc: 'Đại Tiệc Game Việt!',
      },
      {
        imageSrc: '/lobby-product/lobby-saba.png',
        title: 'Bóng đá',
        isCallToAction: true,
        callToAction: 'Tỷ số Saba',
      },
      {
        imageSrc: '/lobby-product/Product_Basketball.jpg',
        title: 'Bóng rổ',
        desc: 'Những cú Swish hoàn hảo',
      },
      {
        imageSrc: '/lobby-product/sport_esports.jpg',
        title: 'Thể Thao Điện Tử',
        desc: 'Đặt cược vào các đội yêu thích trong các giải đấu trực tuyến hàng đầu',
      },
      {
        imageSrc: '/lobby-product/Product_VirtualSports.jpg',
        title: 'Thể Thao Ảo',
        desc: 'Tận hưởng các trận đấu trực tuyến mà không phải chờ đợi',
      },
      {
        imageSrc: '/lobby-product/Product_NumberGame.jpg',
        title: 'Number Game',
        desc: 'Đặt cược vào những con số may mắn',
      },
      {
        imageSrc: '/lobby-product/Product_Gaming.jpg',
        title: 'Trò Chơi',
        desc: 'Slot, card và table game cùng rất nhiều lựa chọn',
      },
      {
        imageSrc: '/lobby-product/Product_Keno.jpg',
        title: 'RNG Keno',
        desc: '10+ RNG Keno games',
      },
    ],
    [screen],
  );

  return (
    <div className={style.lobby_products_container}>
      <div
        className={`px-4 py-2 h-[42px] border-white border rounded-[6px] text-white mb-4 mx-4 flex items-center justify-center bg-[#F77A00] ${style.saba_mobile}`}
        style={{ fontSize: '1.125rem' }}
      >
        <Link href="/" className="ml-auto font-bold">
          Tỷ số Saba
        </Link>
        <Icons.ChevronRight className="ml-auto h-5 w-5 text-white" />
      </div>
      <div className={style.lobby_products}>
        {LOBBY_PRODUCT.map((i: iLobbProduct, k) => (
          <LobbyProduct key={k} {...i} />
        ))}
      </div>
    </div>
  );
}
