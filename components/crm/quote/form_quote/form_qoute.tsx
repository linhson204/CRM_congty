import React, { useContext, useEffect, useState } from "react";
import styles from "./form.module.css";
import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import list_data_form from "./list_data_form";
import { useRouter } from "next/router";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

type Props = {};

const Form_qoute = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { setShouldFetchDetailData } = useContext(QuoteContext)

  const [HeartRed, setHeartRed] = useState(false);
  const { recordId } = useContext(QuoteContext)

  const handleChangeColor = (index: any) => {
    const img = document?.getElementById(index);
    if (img?.className === "bi-suit-heart") {
      img?.classList.remove("bi-suit-heart");
      img?.classList.add("bi-suit-heart-fill");
    } else if (img?.className === "bi-suit-heart-fill") {
      img?.classList.add("bi-suit-heart");
    } else {
      img?.classList.remove("bi-suit-heart");
      img?.classList.add("bi-suit-heart-fill");
    }
  };
  const handleUse = (index: any) => {
    axiosCRMCall
      .post('/quote/update', { id: id, print_template_id: index + 1 })
      .then((res) => {
        setShouldFetchDetailData(true)
      })
      .catch((err) => console.log(err))
    router.push(`/quote/detail/${id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontSize: 25,
          display: "flex",
          justifyContent: "center",
          color: "#000000",
          paddingBottom: 25,
        }}
      >
        <b>Lựa chọn mẫu báo giá bạn yêu thích</b>
      </div>
      <div className={styles.containers}>
        {list_data_form &&
          list_data_form.map((item: any, index: string) => {
            return (
              <div key={index}>
                <div key={index} className={styles.item_image}>
                  <img
                    style={{ width: "100%" }}
                    src={item.img}
                    alt="hungha365.com"
                  />
                  <div className={styles.overlay2}>
                    <Button
                      onClick={() => handleUse(index)}
                      className={styles.text}
                    >
                      <div> Sử dụng mẫu này</div>
                      <div
                        onClick={() => handleChangeColor(index)}
                        className={styles.heartimg}
                      >
                        <i
                          id={index}
                          key={index}
                          className={"bi-suit-heart"}
                        ></i>
                      </div>
                    </Button>
                  </div>
                  <div
                    className="helo"
                    style={{ paddingBottom: 30, width: "100%" }}
                  ></div>
                </div>
                <div className={styles.bot}>
                  <Button
                    // onClick={() =>
                    //   router.push(
                    //     `/quote/form_quote/detail_form_quote/${index + 1}`
                    //   )
                    // }
                    style={{
                      width: "100%",
                      background: "#E2E5FF",
                      fontSize: 15,
                      height: 40,
                      fontWeight: 800,
                    }}
                  >
                    Mẫu {index + 1}
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Form_qoute;
