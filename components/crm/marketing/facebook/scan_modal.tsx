import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import styles from './facebook.module.css'

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  tittleBtn: any,
  isHidden: boolean
}
const ScanModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content,
  title,
  tittleBtn,
  isHidden
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/marketing/sms");
  };

  return (
    <>
      <Modal
        title={""}
        style={{ left: 0, }}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={`mdal_cancel scan_modal ${isHidden ? 'is_hidden' : ''}`}
        okText={tittleBtn[0]}
        cancelText={tittleBtn[1]}
      >
        <div>
          {
            <div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: 'flex',
                  textAlign: 'start',
                  marginBottom: '2rem'
                }}
              >
                <p className={styles.scan_title_modal}>{title}</p>
                <div
                  onClick={() => setIsModalCancel(false)}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    cursor: 'pointer'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M0.38913 0.423723C0.638613 0.175078 0.976798 0.0354158 1.3294 0.0354158C1.682 0.0354158 2.02019 0.175078 2.26967 0.423723L7.98226 6.12423L13.6948 0.423723C13.8575 0.248946 14.0643 0.121178 14.2936 0.0538803C14.5229 -0.0134178 14.7662 -0.0177541 14.9977 0.0413279C15.2293 0.10041 15.4406 0.220723 15.6094 0.389591C15.7782 0.558459 15.8982 0.76963 15.9568 1.00085C16.0161 1.23167 16.012 1.47415 15.9448 1.70282C15.8777 1.93148 15.7501 2.13787 15.5754 2.30029L9.8628 8.00079L15.5754 13.7013C15.7505 13.8636 15.8786 14.07 15.946 14.2988C16.0134 14.5276 16.0178 14.7704 15.9586 15.0014C15.8994 15.2325 15.7788 15.4434 15.6096 15.6118C15.4404 15.7802 15.2287 15.9 14.997 15.9585C14.7657 16.0176 14.5227 16.0135 14.2936 15.9465C14.0644 15.8796 13.8576 15.7522 13.6948 15.5779L7.98226 9.87735L2.26967 15.5779C2.01729 15.8123 1.68366 15.9399 1.33893 15.934C0.99419 15.928 0.665185 15.789 0.421064 15.546C0.177581 15.3024 0.0382165 14.9741 0.0322613 14.6301C0.0263062 14.2861 0.154225 13.9531 0.38913 13.7013L6.10172 8.00079L0.38913 2.30029C0.139958 2.05133 0 1.71386 0 1.362C0 1.01015 0.139958 0.672678 0.38913 0.423723Z"
                      fill="#777777"
                    />
                  </svg>
                </div>
              </div>
              {content}
            </div>
          }
        </div>
      </Modal>
    </>
  );
};

export default ScanModal;
