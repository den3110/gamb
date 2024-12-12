import { modalDefaultProps } from "@/constance/modal";
import NotificationCtx from "@/contexts/NotificationCtx";
import { iMemberInfo } from "@/interfaces/member";
import { editMemberConditionTransfer } from "@/modules/dashboard/api/user";
import { isStatusCodeSuccess } from "@/utils/api";
import { Button, Divider, Form, Modal, ModalProps } from "antd";
import { memo, useContext, useState } from "react";
import { ConditionTransfer } from "../../CreateMember/ui/FormCondition";

interface iProps extends ModalProps {
  member: iMemberInfo;
  t: any;
}
const field = "transfer_config";

const ConditionTransferModal = ({ member, onCancel, t, ...rest }: iProps) => {
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const [form] = Form.useForm();

  const onFinishForm = async (value: any) => {
    try {
      setIsLoadingFinish(true);
      const ep = await editMemberConditionTransfer(member.id, value);

      if (isStatusCodeSuccess(ep.statusCode)) {
        onCancel(null);
      }

      setIsLoadingFinish(false);
    } catch (err) {
      setIsLoadingFinish(false);

      //notifi.error({
      //message: "Cập nhật thông tin thất bại",
      //placement: "top",
      //});
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
        initialValues={{ [field]: member.transfer_config }}
      >
        <Form.Item name={field}>
          <ConditionTransfer t={t} />
        </Form.Item>

        <div className="mt-4 gap-2 flex items-center justify-end">
          <Form.Item noStyle>
            <Button type="primary" htmlType="submit" loading={isLoadingFinish}>
              {t("Update")}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(ConditionTransferModal);
