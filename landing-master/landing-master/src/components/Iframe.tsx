'use client';

import { useContext, useEffect, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import { Spin } from 'antd';

import { getLinkGame, getLinkSubGame } from '@/api/game';
import NotificationCtx from '@/contexts/NotificationCtx';
import StoreCtx from '@/contexts/StoreCtx';
import { transformGameCategories } from '@/util/game';

const Iframe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkIframe, setLinkIframe] = useState('');
  const [isNewTab, setIsNewTab] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const params = useParams();

  const { gameCategories } = useContext(StoreCtx);
  const { notifi } = useContext(NotificationCtx);

  useEffect(() => {
    const id = params['game-name'];
    if (!id || !gameCategories?.length) {
      return;
    }

    setIsLoading(true);
    const allGame = transformGameCategories(gameCategories);
    const currentGame = allGame.find((g) => g?.id === id);

    if (!currentGame) {
      setIsLoading(false);

      return;
    }
    setIsNewTab(currentGame?.isNewTab || false);

    if (currentGame.isNewTab) {
      setIsLoading(false);

      return;
    }

    let errMsg = '';
    (async () => {
      let url = '';
      if (currentGame.isSub) {
        const ep = await getLinkSubGame({
          ProductID: String(currentGame.productId),
          GameType: String(currentGame.gameType),
          GameId: String(currentGame.gameId),
        });

        url = ep.Url;
        errMsg = ep.ErrorMessage;
      } else {
        const ep = await getLinkGame({
          ProductID: String(currentGame.productId),
          GameType: String(currentGame.gameType),
        });

        url = ep.Url;
        errMsg = ep.ErrorMessage;
      }

      if (errMsg) {
        notifi?.error({
          message: errMsg,
          placement: 'top',
        });
      }
      setLinkIframe(url || '');
      setIsLoading(false);
    })();
  }, [gameCategories?.length, params['game-name']]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (isNewTab) {
    return (
      <>
        <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
      </>
    );
  }

  return (
    <div className="relative">
      <iframe
        src={linkIframe}
        width="100%"
        style={{ minHeight: 'calc(100vh - 74px)' }}
        ref={iframeRef}
      />
    </div>
  );
};

export default Iframe;
