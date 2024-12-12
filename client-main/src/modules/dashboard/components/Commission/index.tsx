import { iMemberInfo } from "@/interfaces/member";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Divider, Form, Select, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import { styled } from "styled-components";
import styles from "./styles.module.less";

interface iProps {
  userInfo: iMemberInfo;
  t?: any;
}

const DUMMY_DATASOURCE = Array.apply(null, Array(10)).map((_, key) => ({
  no: key,
  username: "K9YJ200000",
  first_name: "",
  last_name: "",
  group: "A",
  commission_1_m: "0.25",
  commission_1_a: "0.25",
  commission_1_p: "0.15",
  commission_2_m: "0.25",
  commission_2_a: "0.25",
  commission_2_p: "0.15",
  commission_3_m: "0.25",
  commission_3_a: "0.25",
  commission_3_p: "0.15",
  credit_limit: "1,000.00",
}));
const StyledTable = styled((props: TableProps<any>) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: #f8eb95 !important;
    color: #333 !important;
  }
`;

const Commission = ({ userInfo, t }: iProps) => {
  const [datasource, setDatasource] = useState(DUMMY_DATASOURCE as any);
  const [loadingSource, setLoadingSource] = useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      children: [
        {
          title: "#",
          dataIndex: "no",
          key: "no",
          align: "center",
          className: "th_sub",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: t("Username"),
          dataIndex: "username",
          key: "username",
          align: "center",
          width: 170,
          className: "th_sub",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: t("First Name"),
          dataIndex: "first_name",
          key: "first_name",
          align: "center",
          className: "th_sub",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: t("Last name"),
          dataIndex: "last_name",
          key: "last_name",
          align: "center",
          className: "th_sub",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: t("Group"),
          dataIndex: "group",
          key: "group",
          align: "center",
          className: "th_sub",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
      ],
    },
    {
      title: `${t("Commission")} 1(%)`,
      dataIndex: "",
      key: "",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
      children: [
        {
          title: "M",
          dataIndex: "commission_1_m",
          key: "commission_1_m",
          align: "center",
          className: "th_dde5fa",
          onCell: () => ({ className: "th_dde5fa" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: "A",
          dataIndex: "commission_1_a",
          key: "commission_1_a",
          align: "center",
          className: "th_dde5fa",
          onCell: () => ({ className: "th_dde5fa" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: "P",
          dataIndex: "commission_1_p",
          key: "commission_1_p",
          align: "center",
          className: "th_dde5fa",
          onCell: () => ({ className: "th_dde5fa" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
      ],
    },
    {
      title: `${t("Commission")} 2(%)`,
      dataIndex: "",
      key: "",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
      children: [
        {
          title: "M",
          dataIndex: "commission_2_m",
          key: "commission_2_m",
          align: "center",
          className: "th_f0f1c7",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: "A",
          dataIndex: "commission_2_a",
          key: "commission_2_a",
          align: "center",
          className: "th_f0f1c7",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: "P",
          dataIndex: "commission_2_p",
          key: "commission_2_p",
          align: "center",
          className: "th_f0f1c7",
          onCell: () => ({ className: "a666" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
      ],
    },
    {
      title: `${t("Commission")} 3(%)`,
      dataIndex: "",
      key: "",
      align: "center",
      render: (text) => <span className="text-ellipsis">{text}</span>,
      children: [
        {
          title: "M",
          dataIndex: "commission_3_m",
          key: "commission_3_m",
          align: "center",
          className: "th_dde5fa",
          onCell: () => ({ className: "th_dde5fa" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: "A",
          dataIndex: "commission_3_a",
          key: "commission_3_a",
          align: "center",
          className: "th_dde5fa",
          onCell: () => ({ className: "th_dde5fa" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
        {
          title: "P",
          dataIndex: "commission_3_p",
          key: "commission_3_p",
          align: "center",
          className: "th_dde5fa",
          onCell: () => ({ className: "th_dde5fa" }),
          render: (text) => <span className="text-ellipsis">{text}</span>,
        },
      ],
    },
    {
      title: t("Credit limit"),
      dataIndex: "credit_limit",
      key: "credit_limit",
      align: "center",
      onCell: () => ({ className: "th_dde5fa" }),
      render: (text) => <span className="text-ellipsis">{text}</span>,
    },
  ] as ColumnsType;

  return (
    <>
      <div className="flex items-center gap-3 h-[40px]">
        <div className="flex items-center gap-2 py-2">
          <span className="uppercase text-red-900 font-medium">
            {`${t("Commission")} ${t("Of")} ${userInfo.user_type}`}
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
        <Form.Item name="product" label={t("Product")}>
          <Select
            style={{ width: 150 }}
            options={[
              {
                label: "Sportbook",
                value: "sportbook",
              },
              {
                label: t("Lotto"),
                value: "lotto",
              },
              {
                label: "Bitcoin",
                value: "bitcoin",
              },
              {
                label: "Live casino",
                options: [
                  { label: "Allbet", value: "allbet" },
                  { label: "BBIN", value: "bbin" },
                  { label: "SA Gaming", value: "sa_gaming" },
                  { label: "AE Sexy", value: "ae_sexy" },
                  { label: "ION", value: "ion" },
                  { label: "WM", value: "wm" },
                  { label: "BG", value: "bg" },
                  { label: "PP Live Casino", value: "pp_live_casino" },
                  { label: "YeeBet", value: "yeebet" },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="choose" label="Lựa chọn Agent">
          <Select style={{ width: 150 }} options={[]} />
        </Form.Item>
      </Form>

      <div className="flex gap-1 items-center mt-4">
        <span className="text-red-400">*</span>
        <span className="text-xs">
          Sportsbook và Sportsbook 2 dùng chung cài đặt Hoa Hồng.
        </span>
      </div>

      <StyledTable
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

export default withTranslation()(memo(Commission));
