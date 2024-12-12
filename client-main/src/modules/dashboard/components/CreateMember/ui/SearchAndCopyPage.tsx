import CustomInputNumber from "@/components/common/CustomInputNumber";
import CustomInputNumberCommas from "@/components/common/CustomInputNumberCommas";
import { Button, Col, Divider, Form, Input, InputNumber, Row } from "antd";
import { memo, useContext, useState } from "react";
import { classContainer } from "..";
import UsernameInput from "./UsernameInput";
import NotificationCtx from "@/contexts/NotificationCtx";
import { cloneMember, createMember } from "@/modules/dashboard/api/user";
import SelectWithRemoteData from "./SelectWithRemoteData";
import { isStatusCodeSuccess } from "@/utils/api";
import { CheckCircleFilled, CopyOutlined } from "@ant-design/icons";

interface iProps {
  username: string;
  t: any;
}

const SearchAndCopyPage = ({ username, t }: iProps) => {
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [credit, setCredit] = useState("");
  const [usernamesCreated, setUserNamesCreated] = useState([]);
  const [form] = Form.useForm();
  const { notifi } = useContext(NotificationCtx);

  const onFinish = async (value: any) => {
    try {
      setIsLoadingFinish(true);
      const ep = await cloneMember(value);

      if (isStatusCodeSuccess(ep.statusCode)) {
        notifi.success({
          message: t("Account successfully created"),
          placement: "top",
        });
        setIsCreateSuccess(true);
      } else {
        notifi.error({
          message: t("Account creation failed"),
          placement: "top",
        });
      }

      setCredit(value?.credit);
      setUserNamesCreated(ep.data);
      setIsLoadingFinish(false);
    } catch (err) {
      setIsCreateSuccess(false);
      setIsLoadingFinish(false);
      notifi.error({
        message: t("Account creation failed"),
        placement: "top",
      });
    }
  };

  const showFormCreateNewMember = () => {
    setIsCreateSuccess(false);
    setUserNamesCreated([]);
    setCredit("");
  };

  return (
    <div className={classContainer}>
      {isCreateSuccess && (
        <>
          <div className="mb-4">
            <span className="text-red-600">* </span>
            <span>
              {t("Note: Settings will be the same as the Source account")}
            </span>
          </div>

          <div className="flex items-center gap-2 border-green-500 border-solid py-2 px-3 bg-green-50 mb-4">
            <CheckCircleFilled style={{ color: "green", fontSize: 18 }} />
            <span>
              {usernamesCreated?.length}{" "}
              {t("Accounts have been created successfully")}
            </span>
          </div>

          <div className="mb-2">Username:</div>
          <div className="border-gray-300 border-solid py-2 px-3 flex justify-between bg-gray-100 mb-4">
            <span className="flex-1">{usernamesCreated.join(", ")}</span>
            <CopyOutlined className="flex-shrink-0 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="mb-2">{t("Given Credit per Account")}:</div>
          <div className="min-h-[32px] border-gray-300 border-solid py-2 px-3 flex justify-between bg-gray-100 mb-2">
            <span className="flex-1">{credit}</span>
          </div>
          <Button type="primary" onClick={showFormCreateNewMember}>
            {t("Create new")}
          </Button>
        </>
      )}

      {!isCreateSuccess && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            noNumber: 1,
          }}
        >
          <Form.Item
            name="memberSourceId"
            label={<span className="text-lg">{t("Source Account")}</span>}
            className="mb-0"
            rules={[
              { required: true, message: t("No value has been selected") },
            ]}
          >
            <SelectWithRemoteData />
          </Form.Item>

          <Divider className="my-4" />

          <h3 className="text-lg">{t("Account Details")}</h3>
          <p className="text-xs">
            {t(
              "Select an available account name first and the system will suggest names for the remaining accounts."
            )}
          </p>

          <Row gutter={[32, 32]}>
            <Col span={8}>
              <Form.Item name="userName" label={t("User name")}>
                <UsernameInput name={username} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("Password")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("No password has been entered"),
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[32, 32]}>
            <Col span={8}>
              <Form.Item name="noNumber" label={t("No. of Accounts")}>
                <InputNumber
                  min={1}
                  className="w-full"
                  placeholder={t("Enter value")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("Given Credit per Account")}
                name="credit"
                rules={[
                  { required: true, message: t("No value has been entered") },
                ]}
              >
                <CustomInputNumberCommas
                  className="w-full"
                  placeholder={t("Enter value")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button htmlType="submit" type="primary" loading={isLoadingFinish}>
              {t("Create Account")}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default memo(SearchAndCopyPage);
