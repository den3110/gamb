import { HomeFilled } from "@ant-design/icons";
import { memo, useEffect, useRef, useState } from "react";
import i18n from "@/lib/i18n";

let timeout: NodeJS.Timeout;

const HeaderMessage = () => {
  const [isHover, setIsHover] = useState(false);
  const [left, setLeft] = useState(0);

  const messageRef = useRef<HTMLSpanElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messageRef.current) {
      return;
    }

    if (isHover) {
      clearInterval(timeout);

      return;
    }
    timeout = setInterval(() => {
      setLeft((prev) => {
        if (Math.abs(prev - 5) > messageRef.current.offsetWidth) {
          return messageRef.current.offsetWidth - 5;
        }

        return prev - 5;
      });
    }, 100);
  }, [isHover]);

  return (
    <div className="flex items-stretch gap-1 bg-white min-h-[2.5rem] shadow-white p-2">
      <span className="icon icon-home p-[4px]"></span>
      {/*<HomeFilled className="p-1" style={{ fontSize: "1rem" }} />*/}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-hidden relative"
      >
        <span
          ref={messageRef}
          className="whitespace-nowrap absolute transition-all text-red-600 top-[50%] translate-y-[-50%]"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ left }}
        >
          {i18n.t("Header Message")}
        </span>
      </div>
    </div>
  );
};

export default memo(HeaderMessage);
