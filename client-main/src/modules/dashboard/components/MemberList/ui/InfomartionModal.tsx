import CustomInputNumber from "@/components/common/CustomInputNumber";
import { modalDefaultProps } from "@/constance/modal";
import { iMemberInfo } from "@/interfaces/member";
import { editMemberInfo } from "@/modules/dashboard/api/user";
import { isStatusCodeSuccess } from "@/utils/api";
import {
  Button,
  Col,
  Divider,
  Form,
  FormItemProps,
  Input,
  Modal,
  ModalProps,
  Row,
} from "antd";
import { memo, useState } from "react";

interface iProps extends ModalProps {
  member: iMemberInfo;
  onSuccess: (member: iMemberInfo) => void;
}

const styleFormItemCommon: FormItemProps = {
  className: "mb-2",
};

const InfomartionModal = ({
  member,
  onSuccess,
  onCancel,
  t,
  ...rest
}: iProps & { t: any }) => {
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  const onFinishForm = async (value: any) => {
    try {
      setIsLoadingFinish(true);
      const ep = await editMemberInfo(member.id, value);

      if (isStatusCodeSuccess(ep.statusCode)) {
        onSuccess(ep.data);
        onCancel(null);
      } else {
      }

      setIsLoadingFinish(false);
    } catch (err) {
      setIsLoadingFinish(false);
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
        initialValues={member}
      >
        <Row gutter={[32, 8]}>
          <Col span={12}>
            <Form.Item name="first_name" label="Tên" {...styleFormItemCommon}>
              <Input className="w-full" placeholder="Nhập giá trị" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="last_name" label="Họ" {...styleFormItemCommon}>
              <Input className="w-full" placeholder="Nhập giá trị" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone" label="Điện thoại" {...styleFormItemCommon}>
              <CustomInputNumber placeholder="Nhập giá trị" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="group" label="Nhóm" {...styleFormItemCommon}>
              <Input placeholder="Nhập giá trị" />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-4 gap-2 flex items-center justify-end">
          <Form.Item noStyle>
            <Button type="primary" htmlType="submit" loading={isLoadingFinish}>
              {t("Update")}
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Button htmlType="reset" onClick={handleReset}>
              Reset
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(InfomartionModal);
