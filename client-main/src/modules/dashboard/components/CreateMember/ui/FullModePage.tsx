import NotificationCtx from "@/contexts/NotificationCtx";
import { createMember } from "@/modules/dashboard/api/user";
import { isStatusCodeSuccess } from "@/utils/api";
import { WarningTwoTone } from "@ant-design/icons";
import { Alert, Button, Collapse, Form } from "antd";
import { memo, useContext, useState } from "react";
import { classContainer } from "..";
import FormCommission from "./FormCommission";
import FormCondition, { fieldCondition } from "./FormCondition";
import FormInfo, { fieldMemberInfo } from "./FormInfo";
import { withTranslation } from "react-i18next";
import FormBettingLimits from "./FormBettingLimits";

interface iProps {
  username: string;
}

const FullModePage = ({ username, t }: iProps & { t: any }) => {
  const [formFullMode] = Form.useForm();
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const { notifi } = useContext(NotificationCtx);

  const onFinishFullMode = async (values: any) => {
    try {
      setIsLoadingFinish(true);
      const ep = await createMember({
        ...values,
        [fieldMemberInfo]: {
          ...values?.[fieldMemberInfo],
          secure_code: "111222",
        },
      });

      if (isStatusCodeSuccess(ep.statusCode)) {
        notifi.success({
          message: t("Set up information successfully"),
          placement: "top",
        });
      } else {
        notifi.error({
          message: t("Setting information failed"),
          placement: "top",
        });
      }

      setIsLoadingFinish(false);
    } catch (err) {
      setIsLoadingFinish(false);
      notifi.error({
        message: t("Setting information failed"),
        placement: "top",
      });
    }
  };

  return (
    <div className={`${classContainer} flex flex-col gap-2`}>
      <Alert
        message={t(
          "Please use Sportsbook 2 to set up Bet Limits and PT for E-Sports"
        )}
        banner
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
      />

      <Form
        form={formFullMode}
        onFinish={onFinishFullMode}
        initialValues={{
          [fieldCondition]: {
            is_all: true,
          },
        }}
      >
        <Collapse
          size="small"
          defaultActiveKey={["1", "2", "3", "4"]}
          className="fullmode_collapse"
          items={[
            {
              key: "1",
              label: (
                <span className="text-white">{t("General information")}</span>
              ),
              children: <FormInfo t={t} username={username} />,
              showArrow: false,
            },
            {
              key: "2",
              label: <span className="text-white">{t("Commission")}</span>,
              children: <FormCommission t={t} />,
              showArrow: false,
            },
            {
              key: "3",
              label: (
                <span className="text-white">{t("Transfer conditions")}</span>
              ),
              children: <FormCondition t={t} />,
              showArrow: false,
            },
            {
              key: "4",
              label: <span className="text-white">{t("Betting limits")}</span>,
              children: <FormBettingLimits t={t} />,
              showArrow: false,
            },
          ]}
        />

        <Form.Item className="mt-4">
          <Button
            htmlType="submit"
            type="primary"
            className="w-fit"
            loading={isLoadingFinish}
          >
            {t("Add")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withTranslation()(memo(FullModePage));
