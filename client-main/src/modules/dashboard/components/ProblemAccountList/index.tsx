import { Divider, Tabs, TabsProps } from "antd";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import ProblemAccountListTable from "./ui/ProblemAccountListTable";

interface iProps {
  t?: any;
}

const ProblemAccountList = ({ t }: iProps) => {
  const [selectedTabkey, setSelectedTabKey] = useState("agent");

  const onChangeTabKey = (key: any) => setSelectedTabKey(key);

  const tabItems: TabsProps["items"] = [
    {
      key: "agent",
      label: <span className="px-5">Agent</span>,
      children: <ProblemAccountListTable />,
    },
    {
      key: "member",
      label: <span className="px-5">Member</span>,
      children: <ProblemAccountListTable />,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-3 h-[40px]">
        <div className="flex items-center gap-2 py-2">
          <span className="uppercase text-red-900 font-medium">
            {t("PROBLEM ACCOUNT LIST")}
          </span>
        </div>
      </div>

      <Divider style={{ marginTop: 0, marginBottom: 12 }} />

      <Tabs
        activeKey={selectedTabkey}
        onChange={onChangeTabKey}
        items={tabItems}
      />
    </>
  );
};

export default withTranslation()(memo(ProblemAccountList));
