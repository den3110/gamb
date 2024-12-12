import { Input, Select } from "antd";
import { memo, useState } from "react";

const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersOpt: String[] = Array.apply(
  null,
  new Array(characters.length)
).map((_: any, index: number) => String(characters.at(index).toUpperCase()));

interface iProps {
  name: string;
  onChange?: (value: string) => void;
  value?: string;
}

const UsernameInput = ({ name, onChange }: iProps) => {
  const [char1, setChar1] = useState(charactersOpt.at(0));
  const [char2, setChar2] = useState(charactersOpt.at(0));
  const [char3, setChar3] = useState(charactersOpt.at(0));

  const onChangeChar1 = (val: any) => {
    setChar1(val);

    onChange?.(`${name}${val}${char2 || ""}${char3 || ""}`);
  };

  const onChangeChar2 = (val: any) => {
    setChar2(val);

    onChange?.(`${name}${char1 || ""}${val}${char3 || ""}`);
  };

  const onChangeChar3 = (val: any) => {
    setChar3(val);

    onChange?.(`${name}${char1 || ""}${char2 || ""}${val}`);
  };

  return (
    <div className="flex">
      <Input value={name} disabled />
      <Select
        value={char1}
        options={charactersOpt.map((char) => ({
          value: char,
          label: char,
        }))}
        onChange={onChangeChar1}
      />
      <Select
        value={char2}
        options={charactersOpt.map((char) => ({
          value: char,
          label: char,
        }))}
        onChange={onChangeChar2}
      />
      <Select
        value={char3}
        options={charactersOpt.map((char) => ({
          value: char,
          label: char,
        }))}
        onChange={onChangeChar3}
      />
    </div>
  );
};

export default memo(UsernameInput);
