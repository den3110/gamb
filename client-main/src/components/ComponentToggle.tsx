import { memo } from "react";

interface iProps {
  isToggle: boolean;
  ViewToggle: React.ReactNode;
  ViewDefault: React.ReactNode;
}

const ComponentToggle = ({ isToggle, ViewDefault, ViewToggle }: iProps) => {
  if (isToggle) {
    return <>{ViewToggle}</>;
  }

  return <>{ViewDefault}</>;
};

export default memo(ComponentToggle);
