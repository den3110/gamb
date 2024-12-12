import { Input, InputProps } from "antd";
import { memo, useEffect, useState } from "react";

interface iProps extends InputProps {}

const CustomInputNumber = ({ value, ...rest }: iProps) => {
  const [data, setData] = useState("");

  useEffect(() => {
    setData(value as any);
  }, [value]);

  const onChange = (e: any) => {
    const pattern = /^\d+$/;
    const val = e.target.value;
    const isNumber = pattern.test(val);

    if (val === "") {
      setData("");

      return;
    }

    if (!isNumber) {
      return;
    }

    setData(val);
  };

  return <Input value={data} onChange={onChange} {...rest} />;
};

export default memo(CustomInputNumber);
