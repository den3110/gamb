import { setLang } from "@/redux/appSlice";
import { RootState } from "@/redux/store";
import { CaretDownFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import { memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const LANGUAGE = [
  {
    label: "English",
    key: "GB",
    lang: "en",
    icon: <span className="flag flag-en" data-language-code="en-US" />,
  },
  {
    label: "繁體中文",
    key: "tw",
    lang: "en",
    icon: <span className="flag flag-tw" data-language-code="zh-TW" />,
  },
  {
    label: "简体中文",
    key: "cn",
    lang: "en",
    icon: <span className="flag flag-cn" data-language-code="zh-CN" />,
  },
  {
    label: "日本語",
    key: "jp",
    lang: "en",
    icon: <span className="flag flag-jp" data-language-code="ja-JP" />,
  },
  {
    label: "ภาษาไทย",
    key: "th",
    lang: "en",
    icon: <span className="flag flag-th" data-language-code="th-TH" />,
  },
  {
    label: "한국어",
    key: "kr",
    lang: "en",
    icon: <span className="flag flag-kr" data-language-code="ko-KR" />,
  },
  {
    label: "Tiếng Việt",
    key: "VN",
    lang: "vi",
    icon: <span className="flag flag-vn" data-language-code="vi-VN" />,
  },
];

const LanguageSelect = () => {
  const { lang } = useSelector((state: RootState) => state.app);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      i18n.changeLanguage(lang.lng);
    }, 1);
  }, []);

  const currentLang = useMemo(
    () => LANGUAGE.find((item) => item.key === lang.countryCode),
    [lang]
  );
  return (
    <Dropdown
      overlayStyle={{ width: 150 }}
      placement="bottomRight"
      trigger={["click"]}
      menu={{
        items: LANGUAGE.map(({ key, label, icon }) => ({ label, icon, key })),
        onClick: (e) => {
          const item = LANGUAGE.find((item) => item.key === e.key);
          i18n.changeLanguage(item.lang);
          dispatch(setLang({ countryCode: item.key, lng: item.lang }));
        },
      }}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        {LANGUAGE.find((e) => e.key === currentLang.key).icon}
        <span className="text-white text-[14px]">{currentLang?.label}</span>

        <CaretDownFilled style={{ fontSize: 10, color: "#fff" }} />
      </div>
    </Dropdown>
  );
};

export default memo(LanguageSelect);
