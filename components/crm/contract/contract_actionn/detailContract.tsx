import { useEffect, useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";
import { setInterval } from "timers/promises";
import { Alert, Button } from "antd";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import htmlToImage from "html-to-image";
import { useApi } from "@/components/crm/hooks/useApi";
import { base_url } from "../../service/function";
import Cookies from "js-cookie";

export default function DetailContract({ setCheckFile, FormData }: any) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // const [imageData, setImgaUrls] = useState<any>("");
  const imageData = FormData?.result?.img_org_base64;
  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file && file.size <= 20 * 1024 * 1024) {
  //     //   const files = event.target.files;
  //     setCheckFile(true);
  //     setFileUpload((prevFiles: any) => [...prevFiles, file.name]);
  //   } else {
  //     alert("Error !");
  //   }
  // };
  const handleshow = () => {
    setShow(true);
  };

  useEffect(() => {}, []);

  const handleClose = () => {
    setTimeout(() => {
      setShow(false);
    }, 1500);
  };

  function incrementNumbers(inputString) {
    const numbers = inputString.split(",");
    const incrementedNumbers = numbers.map((num) =>
      (parseInt(num) + 1).toString()
    );
    const resultString = incrementedNumbers.join(",");
    return resultString;
  }

  // const DocxToImage = () => {
  //   const containerRef = useRef(null);

  //   // const convertToImage = () => {
  //   //   const container = containerRef.current;

  //   //   // Chuyển đổi nội dung HTML thành hình ảnh
  //   //   htmlToImage.toPng(container)
  //   //     .then(function (dataUrl) {
  //   //       // Tạo Blob từ dữ liệu hình ảnh
  //   //       const blob = dataURLtoBlob(dataUrl);

  //   //     })
  //   //     .catch(function (error) {
  //   //       console.error('Error converting to image:', error);
  //   //     });
  //   // };

  //   const dataURLtoBlob = (dataURL) => {
  //     const arr = dataURL.split(',');
  //     const mime = arr[0].match(/:(.*?);/)[1];
  //     const bstr = atob(arr[1]);
  //     let n = bstr.length;
  //     const u8arr = new Uint8Array(n);

  //     while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //     }

  //     return new Blob([u8arr], { type: mime });
  //   };
  // };

  useEffect(() => {
    if (showAlert) {
      const confirm = window.confirm(
        "Bạn có chắc chắn muốn xóa hợp đồng này ???"
      );
      if (confirm) {
        setShowAlert(false);
      }
    }
  }, [showAlert]);
  useEffect(() => {
    handleshow();
    handleClose();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", gap: 30 }}>
        <div>
          <Button
            onClick={() => router.push(`/contract/edit/${id}`)}
            style={{
              width: 150,
              borderRadius: 10,
              background: "#4C5BD4",
              color: "#fff",
              fontSize: 18,
              height: 40,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <div>
                <img src="/crm/icon-pen.svg" alt="hungha365.com" />
              </div>
              <div>Chỉnh sửa</div>
            </div>
          </Button>
        </div>
        <div onClick={() => setShowAlert(true)}>
          <Button
            style={{
              borderRadius: 10,
              color: "#4C5BD4",
              fontSize: 15,
              fontWeight: 800,
              height: 40,
            }}
          >
            Xóa Hợp đồng
          </Button>
        </div>
      </div>
      <div className={styles.main__body}>
        <>
          {imageData && imageData?.length > 0 ? (
            <div>
              <div>
                <div className={styles.head_contract}>
                  <h4>Thông tin hợp đồng</h4>
                </div>
              </div>
              <div className={styles["frm-2"]}>
                {imageData?.map((url, index: number) => (
                  <img alt="hd" src={`${url}`} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className={styles.head_contract}>
                  <h4>Thông tin hợp đồng</h4>
                </div>
              </div>
              <div className={styles["frm-2"]}>
                <img
                  style={{ objectFit: "contain" }}
                  alt="hd"
                  src="/crm/loading_file.gif"
                />
              </div>
            </div>
          )}
          {FormData?.get_detail_form_contract && (
            <div className={styles.field_config}>
              <div className={styles.footer_contract}>
                <h4>Các trường đã thiết lập</h4>
              </div>
              <div className={`${styles["frm-3"]}`}>
                {FormData?.get_detail_form_contract &&
                  FormData?.get_detail_form_contract?.map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        className={`${styles["fm-bd"]} ${styles["fm_bt"]} ${styles["fm-fd"]} ${styles.opacity}`}
                        id="field_config_1"
                      >
                        <div className={styles["error-name"]}>
                          <label className={styles.field_new}>
                            {item?.new_field}
                          </label>
                        </div>
                        <input
                          type="text"
                          className={`${styles["form-control"]} ${styles.text}`}
                          value={`Từ tìm kiếm: ${
                            item?.old_field
                          }, tại các vị trí: ${incrementNumbers(
                            item?.index_field
                          )}`}
                          readOnly
                          placeholder="Nhập nội dung"
                        />
                      </div>
                    )
                  )}
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}
