import { memo, useEffect, useRef, useState } from 'react';

import { HomeFilled } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

let timeout: NodeJS.Timeout;

const HeaderMessage = () => {
  const [isHover, setIsHover] = useState(false);
  const [left, setLeft] = useState(0);

  const messageRef = useRef<HTMLSpanElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('header');

  useEffect(() => {
    if (!messageRef.current || !messageRef) {
      return;
    }

    if (isHover) {
      clearInterval(timeout);

      return;
    }
    timeout = setInterval(() => {
      setLeft((prev) => {
        if (Math.abs(prev - 5) > messageRef?.current?.offsetWidth!) {
          return messageRef.current!.offsetWidth! - 5;
        }

        return prev - 5;
      });
    }, 100);
  }, [isHover]);

  return (
    <div className="flex-1 flex items-stretch gap-1 bg-[#4F668C] min-h-[30px] px-1">
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-hidden relative"
      >
        <span
          ref={messageRef}
          className="whitespace-nowrap absolute transition-all text-white top-[50%] translate-y-[-50%]"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ left }}
        >
          {t('Header Message')}
        </span>
      </div>
    </div>
  );
};

export default memo(HeaderMessage);
