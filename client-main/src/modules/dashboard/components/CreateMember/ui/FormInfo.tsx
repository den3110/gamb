import style from "./FormBettingLimits/style.module.less";
import CustomInputNumber from "@/components/common/CustomInputNumber";
import { Col, Form, Input, Row } from "antd";
import { memo } from "react";
import UsernameInput from "./UsernameInput";

interface iProps {
  username: string;
  onChange?: (value: any) => void;
  value?: any;
}

export const fieldMemberInfo = "member_info";

const FormInfo = ({ username, t, onChange }: iProps & { t: any }) => {
  return (
    <>
      <table className={style.table}>
        <colgroup>
          <col span={1} style={{ width: "30%" }} />
          <col span={1} style={{ width: "35%" }} />
          <col span={1} style={{ width: "15%" }} />
          <col span={1} style={{ width: "20%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td className="text-right">{t("Username")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "username"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <UsernameInput name={username} />
              </Form.Item>
            </td>
            <td className="text-right">{t("Password")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "password"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <Input.Password style={{ maxWidth: 170 }} />
              </Form.Item>
            </td>
          </tr>

          <tr>
            <td className="text-right">{t("First name")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "first_name"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <Input style={{ maxWidth: 170 }} />
              </Form.Item>
            </td>

            <td className="text-right">{t("Last name")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "last_name"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <Input style={{ maxWidth: 170 }} />
              </Form.Item>
            </td>
          </tr>

          <tr>
            <td className="text-right">{t("Phone")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "phone"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <CustomInputNumber style={{ maxWidth: 170 }} />
              </Form.Item>
            </td>

            <td className="text-right">{t("Mobile phone")}</td>
            <td>
              <Form.Item noStyle>
                <CustomInputNumber style={{ maxWidth: 170 }} />
              </Form.Item>
            </td>
          </tr>

          <tr>
            <td className="text-right">{t("Agent's maximum credit limit")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "credit_max"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <div className="flex gap-1 items-center">
                  <CustomInputNumber style={{ maxWidth: 170 }} />
                  <span className="flex-shrink-0">{"<= 48,000"}</span>
                </div>
              </Form.Item>
            </td>
            <td className="text-right">Fax</td>
            <td>
              <Form.Item noStyle>
                <Input style={{ maxWidth: 170 }} />
              </Form.Item>
            </td>
          </tr>

          <tr>
            <td className="text-right">{t("Member's maximum credit limit")}</td>
            <td>
              <Form.Item
                noStyle
                name={[fieldMemberInfo, "member_credit_max"]}
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <div className="flex gap-1 items-center">
                  <CustomInputNumber style={{ maxWidth: 170 }} />
                  <span className="flex-shrink-0">{"<= 0"}</span>
                </div>
              </Form.Item>
            </td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default memo(FormInfo);
