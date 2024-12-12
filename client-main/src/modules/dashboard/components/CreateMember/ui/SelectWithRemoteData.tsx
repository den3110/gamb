import { searchMember } from "@/modules/dashboard/api/user";
import type { SelectProps } from "antd";
import { Select } from "antd";
import React, { useState } from "react";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    searchMember({ userName: value }).then((res) => {
      if (currentValue === value) {
        const data = res.data.items.map((item) => ({
          value: item.id,
          text: item.username,
        }));

        callback(data);
      }
    });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const SelectWithRemoteData: React.FC<{
  placeholder?: string;
  style?: React.CSSProperties;
  value?: any;
  onChange?: (value: any) => void;
}> = (props) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchValue, setSearchValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    fetch(newValue, setOptions);
  };

  const handleChange = (newValue: string) => {
    setSearchValue(newValue);
    props?.onChange?.(newValue);
  };

  return (
    <Select
      showSearch
      value={searchValue}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(options || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

export default SelectWithRemoteData;
