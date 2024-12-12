import { Button, DatePicker, Table, TableProps, Tabs } from "antd";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import { styled } from "styled-components";
import GeneralAnnoucement from "./ui/GeneralAnnoucement";

const StyledTable = styled((props: TableProps<any>) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: #f8eb95 !important;
    color: #333 !important;
  }

  && tbody > tr:nth-child(even) > td {
    background: #eae9ee;
  }
`;

const NotificationScreen = ({ t }) => {
  const [activeKey, setActivekey] = useState("1");

  const TableAnnoucement = (
    <>
      <div className="flex gap-4">
        <DatePicker.RangePicker />
        <Button type="primary">Xác nhận</Button>
      </div>

      <StyledTable
        bordered
        size="small"
        className="table mt-3 w-full"
        dataSource={[
          {
            no: 1,
            content: {
              time: "7/3/2023 1:52:37 AM",
              text: 'Quý Khách hàng kính mến: Từ ngày 10/7/2023 Chúng tôi sẽ ngừng hoạt động của "Lô Đề" Xin cảm ơn !',
            },
          },
          {
            no: 2,
            content: {
              time: "7/3/2023 1:52:37 AM",
              text: 'Quý Khách hàng kính mến: Từ ngày 10/7/2023 Chúng tôi sẽ ngừng hoạt động của "Lô Đề" Xin cảm ơn !',
            },
          },
          {
            no: 3,
            content: {
              time: "7/3/2023 1:52:37 AM",
              text: 'Quý Khách hàng kính mến: Từ ngày 10/7/2023 Chúng tôi sẽ ngừng hoạt động của "Lô Đề" Xin cảm ơn !',
            },
          },
          {
            no: 4,
            content: {
              time: "7/3/2023 1:52:37 AM",
              text: 'Quý Khách hàng kính mến: Từ ngày 10/7/2023 Chúng tôi sẽ ngừng hoạt động của "Lô Đề" Xin cảm ơn !',
            },
          },
        ]}
        columns={[
          {
            title: "#",
            dataIndex: "no",
            key: "no",
            align: "center",
            width: 70,
          },
          {
            title: "Nội dung",
            key: "content",
            dataIndex: "content",
            align: "center",
            render: (content: any) => (
              <div className="flex flex-col items-start">
                <span className="text-xs text-[#666] font-light italic">
                  {content.time}
                </span>
                <span className="text-ellipsis">{content.text}</span>
              </div>
            ),
          },
        ]}
      />
    </>
  );

  return (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => setActivekey(key)}
      items={[
        {
          key: "1",
          label: t("General annoucement"),
          children: TableAnnoucement,
        },
        {
          key: "2",
          label: t("Special announcement"),
          children: TableAnnoucement,
        },
        {
          key: "3",
          label: t("System notifications"),
          children: TableAnnoucement,
        },
        { key: "4", label: t("Personal Message"), children: TableAnnoucement },
      ]}
    />
  );
};

export default withTranslation()(memo(NotificationScreen));
