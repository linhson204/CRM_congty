import { Spin } from "antd";

const LoadingLayout = () => {
  return (
    <Spin
      style={{
        margin: "auto",
        width: "100%",
        display: "block",
        padding: "5px",
        height: "100%",
      }}
    />
  );
};
export default LoadingLayout;
