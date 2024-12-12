import NotificationCtx from "@/contexts/NotificationCtx";
import i18n from "@/lib/i18n";
import { Avatar, Button, Form, Input } from "antd";
import { memo, useContext, useState } from "react";
import { checkCodeUser } from "../api/user";
import { classContainer } from "./CreateMember";

interface iProps {
  username: string;
  onSuccess: () => void;
  onError: () => void;
}

const CheckCodePage = ({ username, onSuccess, onError }: iProps) => {
  const [loadingCheckCode, setLoadingCheckCode] = useState(false);
  const [form] = Form.useForm();
  const { notifi } = useContext(NotificationCtx);

  const onCheckCode = async (value: any) => {
    try {
      setLoadingCheckCode(true);
      const ep = await checkCodeUser(value);
      if (!!ep.data) {
        //notifi.success({
        //message: "Kiểm tra thành công",
        //placement: "top",
        //});

        onSuccess();
      } else {
        onError();

        //notifi.error({
        //message: "Kiểm tra thất bại",
        //placement: "top",
        //});
      }

      setLoadingCheckCode(false);
    } catch (err) {
      setLoadingCheckCode(false);
      onError();
      //notifi.error({
      //message: "Kiểm tra thất bại",
      //placement: "top",
      //});
    }
  };

  return (
    <div className={`${classContainer} w-fit bg-transparent`}>
      <div className="rounded-full w-20 h-20 bg-gray-500" />

      <p className="text-lg mb-0 mt-2">{`Xin chào ${username}`}</p>
      <p className="text-sm mb-4">
        {i18n.t(
          "Please enter the Security Code before performing the settings.!"
        )}
      </p>

      <Form
        form={form}
        style={{ width: 400 }}
        layout="vertical"
        onFinish={onCheckCode}
      >
        <Form.Item
          name="code"
          className="mb-2"
          label={i18n.t("Security code")}
          rules={[
            {
              required: true,
              message: i18n.t("Security code has not been entered"),
            },
          ]}
        >
          <Input.Password placeholder={i18n.t("Enter value")} />
        </Form.Item>

        <Form.Item>
          <Button loading={loadingCheckCode} type="primary" htmlType="submit">
            {i18n.t("Confirm")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(CheckCodePage);
