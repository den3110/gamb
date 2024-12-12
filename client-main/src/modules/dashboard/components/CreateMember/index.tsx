import { iMemberInfo } from "@/interfaces/member";
import { getUserTypeOfChild } from "@/utils/user";
import { Divider, Tabs, TabsProps } from "antd";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import CheckCodePage from "../CheckCodePage";
import FullModePage from "./ui/FullModePage";
import SearchAndCopyPage from "./ui/SearchAndCopyPage";

interface iProps {
  userInfo: iMemberInfo;
}

enum SELECTED_TAB_KEY_TYPE {
  "SEARCH_AND_COPY" = "SEARCH_AND_COPY",
  "FULL_MODE" = "FULL_MODE",
}

const commissionOpts = [
  { value: "0.0025", label: "0.0025" },
  { value: "0.002", label: "0.002" },
  { value: "0.0015", label: "0.0015" },
  { value: "0.001", label: "0.001" },
  { value: "0.0005", label: "0.0005" },
  { value: "0", label: "0" },
];

export const classContainer =
  "rounded-md bg-white mt-3 py-2 px-3 max-w-[1000px] shadow-white";

const CreateMember = ({ userInfo, t }: iProps & { t: any }) => {
  const [isCheckCode, setIsCheckCode] = useState(false);
  const [selectedTabkey, setSelectedTabKey] = useState<SELECTED_TAB_KEY_TYPE>(
    SELECTED_TAB_KEY_TYPE.SEARCH_AND_COPY
  );

  const header = (
    <>
      <div className="flex items-center gap-3 py-2">
        <span className="uppercase text-red-900 font-medium">
          {isCheckCode
            ? `tạo thành viên ${getUserTypeOfChild(userInfo.user_type)}`
            : "xác nhận mã bảo mật"}
        </span>
      </div>

      <Divider style={{ marginTop: 8, marginBottom: 8 }} />
    </>
  );

  if (!isCheckCode) {
    const onSuccessCheckCode = () => {
      setIsCheckCode(true);
    };

    const onErrorCheckCode = () => {
      setIsCheckCode(false);
    };

    return (
      <>
        {header}

        <CheckCodePage
          username={userInfo?.username}
          onSuccess={onSuccessCheckCode}
          onError={onErrorCheckCode}
        />
      </>
    );
  }

  const onChangeTabKey = (key: any) => setSelectedTabKey(key);

  const tabItems: TabsProps["items"] = [
    {
      key: SELECTED_TAB_KEY_TYPE.SEARCH_AND_COPY,
      label: t("Find and copy"),
      children: (
        <SearchAndCopyPage
          username={getUserTypeOfChild(userInfo.user_type)}
          t={t}
        />
      ),
    },
    {
      key: SELECTED_TAB_KEY_TYPE.FULL_MODE,
      label: t("Full setting"),
      children: (
        <FullModePage username={getUserTypeOfChild(userInfo.user_type)} />
      ),
    },
  ];

  return (
    <>
      {header}
      <Tabs
        activeKey={selectedTabkey}
        onChange={onChangeTabKey}
        items={tabItems}
      />
    </>
  );
};

export default withTranslation()(memo(CreateMember));
