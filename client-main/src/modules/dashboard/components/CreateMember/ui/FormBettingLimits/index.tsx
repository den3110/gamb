import { Col, Collapse, Input, Row } from "antd";
import style from "./style.module.less";
import { Fragment, memo } from "react";

interface iProps {
  t: any;
}

const FormBettingLimits = ({ t }: iProps) => {
  const data = [
    {
      name: t("Football"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 5000,
          text: "<=5,000",
        },
        {
          defaultValue: 15000,
          text: "<=15,000",
        },
        {
          defaultValue: 30000,
          text: "<=30,000",
        },
      ],
    },
    {
      name: t("Football Saba"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
        {
          defaultValue: 4000,
          text: "<=4,000",
        },
      ],
    },
    {
      name: t("Football Parlay"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1500,
          text: "<=1,500",
        },
        {
          defaultValue: 3000,
          text: "<=3,000",
        },
      ],
    },
    {
      name: t("Basketball"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1500",
        },
        {
          defaultValue: 2000,
          text: "<=2000",
        },
      ],
    },
    {
      name: t("Saba Basketball"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("American Football"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("Tennis"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("Baseball"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("Play golf"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("Motor racing"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("Other Sports"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
    {
      name: t("Mix sports Parlay"),
      cols: [
        {
          defaultValue: 3,
          text: ">=3",
        },
        {
          defaultValue: 500,
          text: "<=500",
        },
        {
          defaultValue: 1000,
          text: "<=1,000",
        },
        {
          defaultValue: 2000,
          text: "<=2,000",
        },
      ],
    },
  ];

  return (
    <Row gutter={[0, 0]} className={style.row}>
      {/* header */}
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

      {data.map((d, dIndex) => (
        <Fragment key={dIndex}>
          <Col span={4}>{d.name}</Col>
          {d.cols.map((c, cIndex) => (
            <Col span={5} key={cIndex}>
              <div className="flex gap-1 items-center flex-1">
                <Input
                  defaultValue={c.defaultValue}
                  style={{ maxWidth: 100 }}
                />
                <span className="flex-shrink-0">{c.text}</span>
              </div>
            </Col>
          ))}
        </Fragment>
      ))}
    </Row>
  );
};

export default memo(FormBettingLimits);
