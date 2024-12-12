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
} from "antd";
import { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import CheckCodePage from "../../CheckCodePage";

interface iProps extends ModalProps {
  member: iMemberInfo;
}
const SmallestPtForSportbookModal = ({
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
        isToggle={isCheckCode}
        ViewToggle={
          <CheckCodePage
            username={member?.username}
            onSuccess={onSuccessCheckCode}
            onError={onErrorCheckCode}
          />
        }
        ViewDefault={
          <div>
            <Alert
              className="mb-3"
              message={t("Please use Sportsbook 2 to set up PT for E-Sports")}
              banner
            />

            <Form>
              <Collapse
                size="small"
                defaultActiveKey={["1", "2", "3", "4", "5"]}
                className="fullmode_collapse"
                items={[
                  {
                    key: "1",
                    label: (
                      <span className="text-white">
                        {t("General information")}
                      </span>
                    ),
                    children: (
                      <Row gutter={[16, 8]}>
                        <Col span={6}>{t("Account")}</Col>
                        <Col span={6}>{member.username || "--"}</Col>
                        <Col span={6}>{t("Phone")}</Col>
                        <Col span={6}>--</Col>
                        <Col span={6}>{t("First name")}</Col>
                        <Col span={6}>{member.username || "--"}</Col>
                        <Col span={6}>{t("Mobile phone")}</Col>
                        <Col span={6}>--</Col>
                        <Col span={6}>Fax</Col>
                        <Col span={6}>--</Col>
                      </Row>
                    ),
                    showArrow: false,
                    style: { background: "#666666" },
                  },
                  {
                    key: "2",
                    label: (
                      <span className="text-white">
                        {t("Smallest PT of SB")}
                      </span>
                    ),
                    children: (
                      <Collapse
                        size="small"
                        className="fullmode_child_collapse"
                        items={[
                          {
                            key: "1",
                            label: (
                              <span className="text-white">
                                {t("Football")}
                              </span>
                            ),
                            showArrow: false,
                            style: { background: "#666666" },
                          },
                        ]}
                      />
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
          </div>
        }
      />
    </Modal>
  );
};

export default withTranslation()(memo(SmallestPtForSportbookModal));
