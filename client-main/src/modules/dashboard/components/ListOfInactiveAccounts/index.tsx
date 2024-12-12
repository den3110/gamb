import { USER_TYPE } from "@/constance/user";
import { iMemberInfo } from "@/interfaces/member";
import { Button, Divider, Form, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";

const { Option } = Select;

interface iProps {
  userInfo: iMemberInfo;
  t?: any;
}

const getAllLevel = (userInfo: iMemberInfo) => {
  const allLevel = [
    { value: "super", name: "Super" },
    { value: "master", name: "Master" },
    { value: "agent", name: "Agent" },
    { value: "member", name: "Member" },
  ];

  switch (userInfo.user_type) {
    case USER_TYPE.ADMIN:
      return allLevel;

    case USER_TYPE.SUPER:
      return allLevel.slice(0, 3);

    case USER_TYPE.AGENT:
      return allLevel.slice(1, 2);

    default:
      break;
  }
};

const ListOfInactiveAccounts = ({ t, userInfo }: iProps) => {
  const [columns, setColumns] = useState<ColumnsType<iMemberInfo>>([] as any);
  const [datasource, setDatasource] = useState<iMemberInfo[]>([] as any);
  const [loadingSource, setLoadingSource] = useState(false);

  const [form] = Form.useForm();

  return (
    <>
      <div className="flex items-center gap-3 h-[40px]">
        <div className="flex items-center gap-2 py-2">
          <span className="uppercase text-red-900 font-medium">
            {t("List of inactive accounts")}
          </span>
          <span className="icon icon-backupdomains" />
        </div>
      </div>

      <Divider style={{ marginTop: 0, marginBottom: 12 }} />

      <Form
        form={form}
        layout="inline"
        initialValues={{
          level: "all",
          status: "all",
        }}
        className="gap-2"
        style={{ maxWidth: "name" }}
      >
        <Form.Item label={t("Username")}>
          <Input
            style={{ width: 270 }}
            placeholder={t("Username/Nickname or First/Last Name")}
          />
        </Form.Item>

        <Form.Item name="level" label={t("Level")}>
          <Select style={{ width: 150 }}>
            <Option value="all">{t("All")}</Option>
            {getAllLevel(userInfo).map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label={t("Status")}>
          <Select style={{ width: 150 }}>
            <Option value="all">{t("All")}</Option>
            <Option value="disabled">{t("Disabled")}</Option>
            <Option value="closed">{t("Closed")}</Option>
            <Option value="deleted">{t("Deleted")}</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="rounded-[0px]">
            {t("Confirm")}
          </Button>
        </Form.Item>
      </Form>

      <Table
        className="table w-full mt-4"
        loading={loadingSource}
        bordered
        size="small"
        columns={columns}
        dataSource={datasource}
        rowKey="no"
      />
    </>
  );
};

export default withTranslation()(memo(ListOfInactiveAccounts));
