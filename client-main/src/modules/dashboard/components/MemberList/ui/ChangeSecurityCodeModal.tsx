import ComponentToggle from "@/components/ComponentToggle";
import { modalDefaultProps } from "@/constance/modal";
import { iMemberInfo } from "@/interfaces/member";
import { editMemberSecurityCode } from "@/modules/dashboard/api/user";
import { isStatusCodeSuccess } from "@/utils/api";
import { Button, Divider, Form, Input, Modal, ModalProps } from "antd";
import { memo, useState } from "react";
import CheckCodePage from "../../CheckCodePage";

interface iProps extends ModalProps {
  member: iMemberInfo;
}
const field = "secure_code";

const ChangeSecurityCodeModal = ({ member, onCancel, ...rest }: iProps) => {
  const [isCheckCode, setIsCheckCode] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const [form] = Form.useForm();

  const onFinishForm = async (value: any) => {
    try {
      setIsLoadingFinish(true);
      const ep = await editMemberSecurityCode(member.id, {
        [field]: value[field],
      });

      if (isStatusCodeSuccess(ep.statusCode)) {
        onCancel(null);
      }

      setIsLoadingFinish(false);
    } catch (err) {
      setIsLoadingFinish(false);
    }
  };

  const onSuccessCheckCode = () => {
    setIsCheckCode(true);
  };

  const onErrorCheckCode = () => {
    setIsCheckCode(false);
  };

  return (
    <Modal
      okText="Cập nhật"
      cancelText="Reset"
      onCancel={onCancel}
      {...rest}
      {...modalDefaultProps}
    >
      <Divider style={{ marginTop: 10 }} />

      <ComponentToggle
        isToggle={!isCheckCode}
        ViewToggle={
          <CheckCodePage
            username={member?.username}
            onSuccess={onSuccessCheckCode}
            onError={onErrorCheckCode}
          />
        }
        ViewDefault={
          <Form form={form} layout="vertical" onFinish={onFinishForm}>
            <Form.Item
              name={field}
              label="Mã bảo mật mới"
              rules={[
                {
                  required: true,
                  message: "Nhập mã bảo mật",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Xác nhận mã bảo mật mới"
              dependencies={[field]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Chưa xác nhận mã bảo mật!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue(field) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mã xác nhận không chính xác")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="mt-4 gap-2 flex items-center justify-end">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoadingFinish}
                >
                  Cập nhât
                </Button>
              </Form.Item>
            </div>
          </Form>
        }
      />
    </Modal>
  );
};

export default memo(ChangeSecurityCodeModal);
