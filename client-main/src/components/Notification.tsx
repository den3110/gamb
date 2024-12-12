import { setIsShowNotifiCation } from "@/redux/appSlice";
import { BellFilled, BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();

  return (
    <Badge
      count={5}
      size="default"
      color="#DA1820"
      style={{
        boxShadow: "none",
        borderRadius: 0,
        fontSize: 12,
        top: 4,
      }}
    >
      <span
        onClick={() => dispatch(setIsShowNotifiCation(true))}
        className="icon icon-bell withripple px-[6px] py-[5px] text-white ripple"
      />
    </Badge>
  );
};

export default memo(Notification);
