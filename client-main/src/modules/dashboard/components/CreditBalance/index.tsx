import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import styles from "./styles.module.less";

const { Option } = Select;

interface iProps {
  t?: any;
}

const CreditBalance = ({ t }: iProps) => {
  const [datasource, setDatasource] = useState([] as any);
  const [loadingSource, setLoadingSource] = useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: t("Count"),
      dataIndex: "count",
      key: "count",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Username"),
      dataIndex: "username",
      key: "username",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("First name"),
      dataIndex: "first_name",
      key: "first_name",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Last name"),
      dataIndex: "last_name",
      key: "last_name",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Credit limit"),
      dataIndex: "credit_limit",
      key: "credit_limit",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Surplus"),
      dataIndex: "surplus",
      key: "surplus",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Account balance until the end of yesterday"),
      width: 210,
      dataIndex: "account_balance_until_the_end_of_yesterday",
      key: "account_balance_until_the_end_of_yesterday",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Availability limit"),
      dataIndex: "availability_limit",
      key: "Availability_limit",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Unprocessed money"),
      dataIndex: "unprocessed_money",
      key: "unprocessed_money",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Money Not Remitted From the Game"),
      dataIndex: "money_not_remitted_from_the_game",
      key: "money_not_remitted_from_the_game",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
  ] as ColumnsType;

  return (
    <>
      <div className="flex items-center gap-3 h-[40px]">
        <div className="flex items-center gap-2 py-2">
          <span className="uppercase text-red-900 font-medium">
            {t("Credit/Balance")}
          </span>

          <InfoCircleOutlined className={styles.info_circle_icon} />
        </div>
      </div>

      <Divider style={{ marginTop: 0, marginBottom: 12 }} />

      <Form
        form={form}
        layout="inline"
        initialValues={{
          commission: "all",
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
        <Form.Item name="status" label={t("Status")}>
          <Select style={{ width: 150 }}>
            <Option value="all">{t("All")}</Option>
            <Option value="open">{t("Open")}</Option>
            <Option value="suspended">{t("Suspended")}</Option>
            <Option value="closed">{t("Closed:")}</Option>
            <Option value="ineffective">{t("Disabled")}</Option>
            <Option value="looked">{t("Locked")}</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="rounded-[0px]">
            {t("Confirm")}
          </Button>
        </Form.Item>
      </Form>

      <Table
        className="table w-full mt-10"
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

export default withTranslation()(memo(CreditBalance));
