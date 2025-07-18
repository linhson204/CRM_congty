import React from "react";
import { Modal } from "antd";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ProductReturnChecktModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/product_return/list");
  };

  return (
    <>
      <Modal
        title={"Duyệt đề nghị trả hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn duyệt đề nghị trả hàng Số đề nghị?</div>
      </Modal>
    </>
  );
};

export default ProductReturnChecktModal;
