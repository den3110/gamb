import { Button, DatePicker, Form, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";

const { Option } = Select;

const ProblemAccountListTable = ({ t }) => {
  const [datasource, setDatasource] = useState([] as any);
  const [loadingSource, setLoadingSource] = useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      width: 60,
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
      title: t("Nickname"),
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
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Date Notice"),
      dataIndex: "date_notice",
      width: "15%",
      key: "date_notice",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Member Account Has Problems"),
      width: "25%",
      dataIndex: "member_account_has_problems",
      key: "member_account_has_problems",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
    {
      title: t("Browsing Status"),
      dataIndex: "browsing_status",
      key: "browsing_status",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
  ] as ColumnsType;

  return (
    <>
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
        <Form.Item label={`${t("Date Notice")} ${t("From")}`}>
          <DatePicker />
        </Form.Item>

        <Form.Item label={t("To")}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="status" label={t("Status")}>
          <Select style={{ width: 150 }}>
            <Option value="all">{t("All")}</Option>
            <Option value="approved">{t("Approved")}</Option>
            <Option value="not_approved_yet">{t("Not approved yet")}</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Input placeholder={t("Username")} />
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
        size="small"
        bordered
        columns={columns}
        dataSource={datasource}
        rowKey="no"
      />
    </>
  );
};

export default withTranslation()(memo(ProblemAccountListTable));
