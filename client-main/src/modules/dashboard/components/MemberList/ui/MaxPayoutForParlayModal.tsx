import ComponentToggle from "@/components/ComponentToggle";
import { modalDefaultProps } from "@/constance/modal";
import { iMemberInfo } from "@/interfaces/member";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
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

const MaxPayoutForParlay = ({
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
                  label: (
                    <span className="text-white">
                      {t("Max Payout for Parlay")}
                    </span>
                  ),
                  children: (
                    <Row gutter={[16, 8]}>
                      <Col span={4}></Col>
                      <Col span={5} className="text-center">
                        {t("One Match Parlay Bet")}
                      </Col>
                      <Col span={5} className="text-center">
                        Combo 2
                      </Col>
                      <Col span={5} className="text-center">
                        Combo 3-5
                      </Col>
                      <Col span={5} className="text-center">{`Combo 6 & ${t(
                        "Synthetic Bets"
                      )}`}</Col>

                      <Col span={4}>{t("Football Parlay")}</Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 27,000"}</span>
                        </div>
                      </Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 40,000"}</span>
                        </div>
                      </Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 135,000"}</span>
                        </div>
                      </Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 538,000"}</span>
                        </div>
                      </Col>

                      <Col span={4}>Mix Sports Parlay</Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 27,000"}</span>
                        </div>
                      </Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 40,000"}</span>
                        </div>
                      </Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 135,000"}</span>
                        </div>
                      </Col>
                      <Col span={5}>
                        <div className="flex gap-1 items-center">
                          <Input />
                          <span className="flex-shrink-0">{"<= 538,000"}</span>
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
        }
      />
    </Modal>
  );
};

export default withTranslation()(memo(MaxPayoutForParlay));
