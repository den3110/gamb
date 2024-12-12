import { Input, InputNumber, InputNumberProps } from "antd";
import { memo, useState } from "react";

interface iProps extends InputNumberProps {}

const CustomInputNumberCommas = ({ ...rest }: iProps) => {
  const [value, setValue] = useState("");

  const onChange = (val: any) => {
    const pattern = /^\d+$/;
    const isNumber = pattern.test(val);

    if (val === "") {
      setValue("");

      return;
    }

    if (!isNumber) {
      return;
    }

    setValue(val);
  };

  return (
    <InputNumber
      value={value}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => value.replace(/(,*)/g, "") as any}
      onChange={onChange}
      {...rest}
    />
  );
};

export default memo(CustomInputNumberCommas);
