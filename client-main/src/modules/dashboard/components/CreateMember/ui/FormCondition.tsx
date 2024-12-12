import { DayOfWeek } from "@/constance/api";
import { Form, Radio, Segmented, Space } from "antd";
import { memo, useEffect, useMemo, useState } from "react";

export const fieldCondition = "condition";

export const ConditionTransfer = ({
  value,
  onChange,
  t,
}: {
  value?: any;
  onChange?: (val: any) => void;
  t: any;
}) => {
  const SEGMENTED_OPT = useMemo(() => {
    return [
      { name: t("Monday"), value: DayOfWeek.MONDAY },
      { name: t("Tuesday"), value: DayOfWeek.THURSDAY },
      { name: t("Wednesday"), value: DayOfWeek.WEDNESDAY },
      { name: t("Thursday"), value: DayOfWeek.THURSDAY },
      { name: t("Friday"), value: DayOfWeek.FRIDAY },
      { name: t("Staturday"), value: DayOfWeek.SATURDAY },
      { name: t("Sunday"), value: DayOfWeek.SUNDAY },
    ];
  }, [t]);

  const [condition, setCondition] = useState("");
  const [segment, setSegment] = useState(SEGMENTED_OPT?.[0]?.name);

  useEffect(() => {
    if (condition) {
      return;
    }

    setCondition(value === -1 ? "is_all" : "is_week");
  }, [value]);

  const onChangeCondition = (e: any) => {
    const val = e.target.value;
    setCondition(val);

    if (val === "is_all") {
      onChange?.(-1);

      return;
    }

    if (val === "is_week") {
      onChange?.(SEGMENTED_OPT.find((opt) => opt.name === segment)?.value);

      return;
    }
  };

  const onChangeSegmented = (val: string) => {
    setSegment(val);

    onChange?.(SEGMENTED_OPT.find((opt) => opt.name === val)?.value);
  };

  return (
    <>
      <div className="items-center mb-2 text-[#fe0000] px-3 py-2 flex gap-2 border-gray-50 rounded-se bg-yellow-50">
        <span className="icon icon-msgerr" style={{ fontSize: 24 }} />
        <p className="mb-0 text-xs">
          {t(
            "Your supervisor has set up Daily Transfer for you. You are not allowed to adjust the Weekly Transfer Conditions."
          )}
        </p>
      </div>
      <Radio.Group value={condition} onChange={onChangeCondition}>
        <Space direction="vertical">
          <Radio value="is_all">{t("Daily")}</Radio>
          <div>
            <Radio value="is_week">{t("Every week")}</Radio>
            <Segmented
              disabled={condition !== "is_week"}
              value={segment}
              onChange={onChangeSegmented}
              options={SEGMENTED_OPT.map((opt) => opt.name)}
            />
          </div>
        </Space>
      </Radio.Group>
    </>
  );
};

const FormCondition = ({ t }: { t: any }) => {
  return (
    <div style={{ padding: "12px 12px 0px 12px" }}>
      <Form.Item name={[fieldCondition]}>
        <ConditionTransfer t={t} />
      </Form.Item>
    </div>
  );
};

export default memo(FormCondition);
