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
const ConfigBitcoinModal = ({
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
              message={t(
                "Updating the superior's bet limit can reduce the bet limit of all subordinates, to ensure that the subordinate's bet limit is not greater than that of the superior."
              )}
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
                      <span className="text-white">{t("Commission")}</span>
                    ),
                    children: (
                      <Row gutter={[16, 8]}>
                        <Col span={6}>Bitcoin</Col>
                        <Col span={6}>--</Col>
                      </Row>
                    ),
                    showArrow: false,
                    style: { background: "#666666" },
                  },
                  {
                    key: "3",
                    label: <span className="text-white">{t("Bets")}</span>,
                    children: (
                      <Row gutter={[16, 8]}>
                        <Col span={6}></Col>
                        <Col span={6} className="text-center">
                          {t("Smallest bet")}
                        </Col>
                        <Col span={6} className="text-center">
                          {t("Biggest bet")}
                        </Col>
                        <Col span={6} className="text-center">
                          {t("Maximum bet for 1 game")}
                        </Col>

                        <Col span={6}>Bitcoin</Col>
                        <Col span={6} className="text-center">
                          --
                        </Col>
                        <Col span={6} className="text-center">
                          --
                        </Col>
                        <Col span={6} className="text-center">
                          --
                        </Col>
                      </Row>
                    ),
                    showArrow: false,
                    style: { background: "#666666" },
                  },
                  {
                    key: "4",
                    label: <span className="text-white">PT</span>,
                    children: (
                      <Row gutter={[16, 8]}>
                        <Col span={6}></Col>
                        <Col span={6} className="text-center">
                          {t("Master's PT")}
                        </Col>
                        <Col span={2} className="text-center">
                          Auto PT
                        </Col>
                        <Col span={4} className="text-center">
                          {t("Agent's biggest PT")}
                        </Col>
                        <Col span={6} className="text-center">
                          {t("Agent's smallest PT")}
                        </Col>

                        <Col span={6}>Bitcoin</Col>
                        <Col span={6} className="text-center">
                          --
                        </Col>
                        <Col span={2} className="text-center">
                          --
                        </Col>
                        <Col span={4} className="text-center">
                          --
                        </Col>
                        <Col span={6} className="text-center">
                          --
                        </Col>
                      </Row>
                    ),
                    showArrow: false,
                    style: { background: "#666666" },
                  },
                  {
                    key: "5",
                    label: (
                      <span className="text-white">
                        {t("Limit win or lose")}
                      </span>
                    ),
                    children: (
                      <Row gutter={[16, 8]}>
                        <Col span={12}>
                          <Row gutter={[8, 8]}>
                            <Col span={12}>{t("Biggest Winnings")}</Col>
                            <Col span={12}>--</Col>
                            <Col span={12}>{t("Biggest bet loss")}</Col>
                            <Col span={12}>--</Col>
                          </Row>
                        </Col>
                        <Col span={12}>
                          <div className="flex items-center h-full">
                            <Checkbox>
                              {t(
                                "Automatically reset daily transfer limit (12pm GMT+8)"
                              )}
                            </Checkbox>
                          </div>
                        </Col>
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
          </div>
        }
      />
    </Modal>
  );
};

export default withTranslation()(memo(ConfigBitcoinModal));
