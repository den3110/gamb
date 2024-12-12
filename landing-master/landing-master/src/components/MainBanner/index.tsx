'use client';

import { Carousel } from 'antd';

import style from './style.module.css';

export default function MainBanner() {
  return (
    <div className="relative">
      <Carousel
        className={style.carousel}
        pauseOnDotsHover
        autoplay
        dots={{ className: style.dots }}
      >
        {[
          '/main-banner/banners_MAIN_140.jpg',
          '/main-banner/banners_MAIN_190.jpg',
          '/main-banner/banners_MAIN_276.jpg',
          '/main-banner/banners_MAIN_341.jpg',
          '/main-banner/banners_MAIN_376.jpg',
          '/main-banner/banners_MAIN_380.jpg',
          '/main-banner/banners_MAIN_381.jpg',
          '/main-banner/banners_MAIN_384.jpg',
          '/main-banner/banners_MAIN_387.jpg',
        ].map((src, key) => (
          <img alt="" src={src} height="400px" width="100%" key={key} />
        ))}
      </Carousel>
    </div>
  );
}
