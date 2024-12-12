import { Button } from "antd";
import { memo, useCallback } from "react";

const ErrorFallback = () => {
  const handleRouteToHome = useCallback(() => {
    window.location.href = "/";
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        style={{
          objectFit: "contain",
          height: "50%",
          width: "50%",
        }}
        src="/img/image-404.jpg"
      />

      <Button type="primary" onClick={handleRouteToHome}>
        Quay lại màn hình chính
      </Button>
    </div>
  );
};

export default memo(ErrorFallback);
