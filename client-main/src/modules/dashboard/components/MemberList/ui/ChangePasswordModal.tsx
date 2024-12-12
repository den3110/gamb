import { modalDefaultProps } from "@/constance/modal";
import NotificationCtx from "@/contexts/NotificationCtx";
import { iMemberInfo } from "@/interfaces/member";
import { editMemberPassword } from "@/modules/dashboard/api/user";
import { isStatusCodeSuccess } from "@/utils/api";
import { Button, Divider, Form, Input, Modal, ModalProps } from "antd";
import { memo, useContext, useState } from "react";
import { withTranslation } from "react-i18next";

interface iProps extends ModalProps {
  member: iMemberInfo;
}
const field = "password";

const ChangePasswordModal = ({
  member,
  onCancel,
  t,
  ...rest
}: iProps & { t: any }) => {
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const { notifi } = useContext(NotificationCtx);

  const [form] = Form.useForm();

  const onFinishForm = async (value: any) => {
    try {
      setIsLoadingFinish(true);
      const ep = await editMemberPassword(member.id, {
        [field]: value[field],
      });

      if (isStatusCodeSuccess(ep.statusCode)) {
        notifi.success({
          message: t("Successfully updated"),
          placement: "top",
        });
        onCancel(null);
      } else {
        notifi.error({
          message: t("Update failed information"),
          placement: "top",
        });
      }

      setIsLoadingFinish(false);
    } catch (err) {
      setIsLoadingFinish(false);

      notifi.error({
        message: t("Update failed information"),
        placement: "top",
      });
    }
  };

  return (
    <Modal
      okText={t("Update")}
      cancelText="Reset"
      onCancel={onCancel}
      {...rest}
      {...modalDefaultProps}
    >
      <Divider style={{ marginTop: 10 }} />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishForm}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          name={field}
          label={t("New password")}
          rules={[
            {
              required: true,
              message: t("Enter new password"),
            },
            () => ({
              validator(_, value) {
                const hasLowerChar = /(.*[a-z].*)/.test(value);
                const hasUpperChar = /(.*[A-Z].*)/.test(value);
                const hasDigitChar = /(.*\d.*)/.test(value);
                const hasSpecialChar = /(.*\W.*)/.test(value);
                const validLength = value.length >= 8;
                const isValid =
                  [
                    hasLowerChar,
                    hasUpperChar,
                    hasDigitChar,
                    hasSpecialChar,
                  ].filter((i) => i).length >= 3 && validLength;

                if (isValid) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Invalid password"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label={t("Confirm new password")}
          dependencies={[field]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("New password not confirmed"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(field) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirmation code is incorrect")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="mt-4 gap-2 flex items-center justify-start">
          <Form.Item noStyle>
            <Button type="primary" htmlType="submit" loading={isLoadingFinish}>
              {t("Update")}
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Button htmlType="reset">Reset</Button>
          </Form.Item>
        </div>
      </Form>

      <div className="mt-4 flex items-center gap-1">
        <span className="text-red-600">*</span>
        <span>
          {`${t(
            "Password must contain at least 8 characters, no spaces, and must contain at least 3 of the following characters"
          )}:`}
        </span>
      </div>

      <ul>
        <li>{t("Uppercase characters [A-Z]")}</li>
        <li>{t("Lowercase characters [a-z]")}</li>
        <li>{t("Numeric characters [0-9]")}</li>
        <li>{t("Special characters (!,@,#,...)")}</li>
      </ul>

      <p className="mt-2 mb-1">{t("For example")} 59D7!4$h, 493abcDE</p>
      <p className="mb-0">
        <b>Lưu ý</b> :{t("Passwords are case sensitive")}.
      </p>
    </Modal>
  );
};

export default withTranslation()(memo(ChangePasswordModal));
