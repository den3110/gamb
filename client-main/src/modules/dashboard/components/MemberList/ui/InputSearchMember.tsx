import { searchMember } from "@/modules/dashboard/api/user";
import { Dropdown, SelectProps } from "antd";
import { Input } from "antd";
import React, { useEffect, useState } from "react";

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

const InputSearchMember: React.FC<{
  placeholder?: string;
  style?: React.CSSProperties;
  value?: any;
  onChange?: (value: any) => void;
}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    setIsOpen(!!options?.length);
  }, [options]);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setOptions);
    handleChange(newValue);
  };

  const handleChange = (newValue: string) => {
    setSearchValue(newValue);
    props?.onChange?.(newValue);
  };

  return (
    <Dropdown
      open={isOpen}
      menu={{
        items: options.map((opt) => ({
          key: opt.value,
          label: opt.text,
          onClick: () => {
            setIsOpen(false);
            handleChange(opt.text);
          },
        })),
      }}
    >
      <Input
        value={searchValue}
        placeholder={props.placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => {
          if (!!options.length) {
            setIsOpen(true);
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 100);
        }}
        style={props.style}
      />
    </Dropdown>
  );
};

export default InputSearchMember;
