"use client";
import { useRouter } from "next/router";
import styles from "../potential.module.css";
import { useState } from "react";
import CancelModal from "./cancel_modal";
import dynamic from "next/dynamic";

const ModalCompleteStep = dynamic(() => import("./complete_modal"), {
  ssr: false,
});

export default function FooterStep({
  currentStep,
  setCurrentStep,
  checkFile,
}: any) {
  const router = useRouter();
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  const handleClickComplete = () => {
    setIsModalSuccess(true);
    setTimeout(() => {
      router.push("/potential/list");
    }, 2000);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      {currentStep > 0 ? (
        <button type="button" onClick={handleBackStep}>
          Quay lại
        </button>
      ) : null}
      {currentStep < 3 && (
        <button
          className={`${styles.save} ${styles.submit_step2} ${
            checkFile ? null : "opacity"
          }`}
          type="button"
          onClick={handleNextStep}
          disabled={!checkFile}
        >
          Tiếp theo
        </button>
      )}

      {currentStep === 3 && (
        <button
          className={`${styles.save} ${styles.submit_step2}`}
          type="button"
          onClick={handleClickComplete}
        >
          Hoàn thành
        </button>
      )}

      {isModalCancel ? (
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={
            "Bạn có chắc chắn muốn hủy nhập tiềm năng từ file, mọi thông tin bạn nhập sẽ không được lưu lại?"
          }
          title={"Xác nhận hủy nhập tiềm năng từ file"}
          link = "/potential/list"
        />
      ) : null}

      {isModalSuccess ? (
        <ModalCompleteStep
          modal1Open={isModalSuccess}
          setModal1Open={setIsModalSuccess}
          title="Cập nhật tiềm năng từ tệp Tiềm năng thành công!"
          link={"/potential/list"}
        />
      ) : null}
    </div>
  );
}
