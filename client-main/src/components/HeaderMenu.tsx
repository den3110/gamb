import {
  ApiOutlined,
  AppstoreFilled,
  KeyOutlined,
  LockFilled,
  LockOutlined,
  PhoneOutlined,
  PropertySafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { memo, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const items = [
  {
    label: "Cài đặt hồ sơ",
    key: "profile setting",
    icon: <UserOutlined />,
  },
  {
    label: "Mật khẩu",
    key: "password",
    icon: <LockFilled />,
  },
  {
    label: "Mã bảo mật",
    key: "security code",
    icon: <PropertySafetyOutlined />,
  },
  {
    label: "OTP",
    key: "otp",
    icon: <LockOutlined />,
  },
  {
    label: "API",
    key: "api",
    icon: <ApiOutlined />,
  },
  {
    label: "Mã bảo vệ",
    key: "protect code",
    icon: <KeyOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: "Liên hệ",
    key: "contact",
    icon: <PhoneOutlined />,
  },
];

const HeaderMenu = () => {
  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: items.map(({ key, label, icon }) => ({ label, icon, key })),
      }}
    >
      <span className="icon icon-squares text-white" style={{ fontSize: 14 }} />
    </Dropdown>
  );
};

export default memo(HeaderMenu);
