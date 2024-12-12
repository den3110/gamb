import ComponentToggle from "@/components/ComponentToggle";
import { modalDefaultProps } from "@/constance/modal";
import { iMemberInfo } from "@/interfaces/member";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Modal,
  ModalProps,
  Row,
  Select,
} from "antd";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import CheckCodePage from "../../CheckCodePage";

interface iProps extends ModalProps {
  member: iMemberInfo;
}

const COMMISSION_OPT = [
  { value: 0.0025, label: "0.0025" },
  { value: 0.002, label: "0.002" },
  { value: 0.0015, label: "0.0015" },
  { value: 0.001, label: "0.001" },
  { value: 0, label: "0" },
];

const CommissionModal = ({
  member,
  onCancel,
  t,
  ...rest
}: iProps & { t: any }) => {
  const [isCheckCode, setIsCheckCode] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const onFinishForm = async (value: any) => {};

  const onSuccessCheckCode = () => {
    setIsCheckCode(true);
  };

  const onErrorCheckCode = () => {
    setIsCheckCode(false);
  };

  return (
    <Modal
      okText={t("Update")}
      cancelText="Reset"
      onCancel={onCancel}
      {...rest}
      {...modalDefaultProps}
      width="70%"
      className="max-w-[1200px]"
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
          <Form>
            <Collapse
              size="small"
              defaultActiveKey={["1"]}
              className="fullmode_collapse"
              items={[
                {
                  key: "1",
                  label: <span className="text-white">{t("Commission")}</span>,
                  children: (
                    <Row gutter={[16, 8]}>
                      {[
                        { name: `${t("Group")} A` },
                        { name: `${t("Group")} B` },
                        { name: `${t("Group")} C` },
                        { name: `${t("Group")} D` },
                        { name: `${t("Commission for 1x2")}` },
                        { name: `${t("Group other")}` },
                      ].map((item, key) => (
                        <Col span={6} key={key}>
                          <div className="flex justify-end gap-2 items-center">
                            <span>{item.name}</span>
                            <Select
                              options={COMMISSION_OPT}
                              className="min-w-[5rem]"
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ),
                  showArrow: false,
                  style: { background: "#666666" },
                },
              ]}
            />

            <div className="mt-2 flex items-center justify-start">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoadingFinish}
                >
                  {t("Update")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        }
      />
    </Modal>
  );
};

export default withTranslation()(memo(CommissionModal));
