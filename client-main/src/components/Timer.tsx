import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";

const format = "HH:mm:ss A MMM DD, YYYY Z";

const Timer = () => {
  const [date, setDate] = useState(dayjs().format(format));

  useEffect(() => {
    setInterval(() => {
      setDate(dayjs().format(format));
    }, 1000);
  }, []);

  return (
    <div className="flex gap-2">
      <ClockCircleOutlined style={{ color: "#fff", fontSize: 16 }} />
      <span className="text-white leading-4">{date}</span>
    </div>
  );
};

export default memo(Timer);
