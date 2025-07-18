"use client";
import { useRouter } from "next/router";
import styles from "../../potential/potential.module.css";
import { useEffect, useState } from "react";
import CancelModalContract from "./cancel_modal_contract";
import Cookies from "js-cookie";
import { result } from "lodash";
import axios from "axios";
import ModalCompleteContractStepADD from "./complete_contract_add";

export default function ContractBtsGroupFooter({
  formData,
  setValueInput,
  valueInput,
}: any) {
  const router = useRouter();
  const [liveiew, setLiveiew] = useState(false);
  const { id } = router.query;
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pathname, setPathName] = useState("");
  const [imageData, setImageData] = useState<any>(null);

  const postNewContract = async (body) => {
    try {
      const response = await axios.post(
        "http://210.245.108.202:3007/api/crm/contractforcus/add",
        body,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const fetchApiPreview = async (body) => {
    setLiveiew(true);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.timviec365.vn/api/crm/contractAI/replace",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setImageData(data?.data?.result?.img_org_base64);
        setLoading(false);
        setPathName(data?.data?.result?.url);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // const imageData = formData?.result?.img_org_base64;
  const handleClickComplete = () => {};

  const handleSave = async () => {
    const body = new FormData();
    body.append("id_customer", id.toString());
    body.append("path_file", pathname);
    body.append("filename", formData?.filename);

    await postNewContract(body);
    setIsModalSuccess(true);
    // setTimeout(() => {
    //   router.push(`/customer/contract/list/${id}`);
    // }, 2000);
  };

  const handlePreview = async () => {
    const isAnyValueEmpty = valueInput.some((item) => item.val === "");
    if (isAnyValueEmpty) {
      const modifiedArray = valueInput.map((item) => {
        if (item.val === "") {
          item.status = true;
        } else {
          item.status = false;
        }
        return item;
      });
      setValueInput(modifiedArray);
    } else {
      const list_items = valueInput?.map((item) => {
        return {
          name: item?.old || "",
          replace_with: Array(
            item?.index?.split(",")?.length > 1
              ? item?.index?.split(",")?.length
              : 2
          ).fill(item?.val),
          index: item?.index?.split(",").map(Number),
        };
      });
      const body = {
        input_file: formData?.result?.url,
        list_items,
      };
      await fetchApiPreview(body);
    }
  };

  useEffect(() => {
    setLiveiew(false);
  }, [formData]);

  return (
    <>
      <div className={styles.main__footer}>
        <button type="button" onClick={() => setIsModalCancel(true)}>
          Hủy
        </button>

        <button
          onClick={() => handlePreview()}
          className={`${styles.save} ${styles.submit_step2}`}
          type="button"
        >
          Xem trước
        </button>

        <button
          className={`${styles.save} ${styles.submit_step2}`}
          type="button"
          onClick={handleSave}
        >
          Lưu
        </button>

        {isModalCancel ? (
          <CancelModalContract
            isModalCancel={isModalCancel}
            setIsModalCancel={setIsModalCancel}
            content={
              "Bạn có đồng ý hủy? \n  Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
            }
            title={"Xác nhận hủy thêm hợp đồng"}
            link={`/customer/contract/list/${id}`}
          />
        ) : null}
      </div>
      {liveiew && !loading && imageData && imageData?.length > 0 && (
        <div>
          <div className={styles.frm_2}>
            {imageData?.map((url, index: number) => (
              <img alt="hd" src={`${url}`} key={index} />
            ))}
          </div>
        </div>
      )}
      {liveiew && loading && (
        <div>
          <div className={styles.frm_2}>
            <img alt="hd" src="/crm/loading_file.gif" />
          </div>
        </div>
      )}
      <ModalCompleteContractStepADD
        modal1Open={isModalSuccess}
        setModal1Open={setIsModalSuccess}
        title={"Thêm mới hợp đồng thành công"}
        id={id}
      />
    </>
  );
}
