import Link from 'next/link';

import style from './style.module.css';

import Icons from '../Icons';

export interface iLobbProduct {
  isCallToAction?: boolean;
  callToAction?: string;
  imageSrc: string;
  title?: string;
  desc?: string;
  styleContainer?: React.CSSProperties;
}

export default function LobbyProduct({
  callToAction,
  isCallToAction = false,
  imageSrc,
  title,
  desc,
  styleContainer,
}: iLobbProduct) {
  return (
    <div className={style.loby_product} style={styleContainer}>
      <img
        className="absolute inset-0"
        src={imageSrc}
        width="100%"
        height="100%"
      />

      {isCallToAction ? (
        <div
          className="z-0 px-4 py-2 w-full h-[40px] border-white border rounded-[3rem] text-white mb-4 mx-4 flex items-center justify-center"
          style={{ fontSize: '1.125rem' }}
        >
          <Link href="/" className="ml-auto">
            {callToAction}
          </Link>
          <Icons.ChevronRight className="ml-auto h-5 w-5 text-white" />
        </div>
      ) : (
        <div className={style.loby_product_info}>
          <span
            className="text-white block font-bold pl-[0.625rem] ml-[0.625rem] border-l border-white"
            style={{ fontSize: '1.125rem' }}
          >
            {title}
          </span>

          <span
            className="text-[rgba(255,255,255,.87)] block pl-[0.625rem] ml-[0.625rem] border-l border-white"
            style={{ fontSize: '0.875rem' }}
          >
            {desc}
          </span>
        </div>
      )}
    </div>
  );
}
