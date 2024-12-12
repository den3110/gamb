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
const LimitBetModal = ({
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
      okText="Cập nhật"
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
          <div>
            <Alert
              message={t(
                "Please use Sportsbook 2 to set a Bet Limit for E-Sports"
              )}
              banner
              className="mb-2"
            />

            <Alert
              message={
                <>
                  {t(
                    "Entering all values of bet limit = 0 means you will not have a bet limit for this account."
                  )}
                  <br />
                  {t(
                    "To prevent Member from placing bets, set Min Bet = 0 and other values = 0.1 (Sportsbook only)."
                  )}
                  <br />
                  {t(
                    "Updating the superior's bet limit can reduce the bet limit of all subordinates, to ensure that the subordinate's bet limit is not greater than that of the superior."
                  )}
                </>
              }
              banner
              className="mb-2"
            />

            <Form>
              <Collapse
                size="small"
                defaultActiveKey={["1"]}
                className="fullmode_collapse"
                items={[
                  {
                    key: "1",
                    label: <span className="text-white">{t("Limit bet")}</span>,
                    children: (
                      <Row gutter={[16, 8]}>
                        <Col span={4}></Col>
                        <Col span={5} className="text-center">
                          {t("Smallest bet")}
                        </Col>
                        <Col span={5} className="text-center">
                          {t("Biggest bet")}
                        </Col>
                        <Col span={5} className="text-center">
                          {t("Maximum bet for 1 game")}
                        </Col>
                        <Col span={5} className="text-center">
                          {t("Maximum Payout Per Game")}
                        </Col>

                        <Col span={4}>{t("Football")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Football Saba")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Football Parlay")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Basketball")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Saba Basketball")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("American Football")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>Tennis</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Baseball")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Play golf")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Motor racing")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>{t("Other Sports")}</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>

                        <Col span={4}>Mix Sports Parlay</Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
                        </Col>
                        <Col span={5} className="text-center">
                          --
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

export default withTranslation()(memo(LimitBetModal));
