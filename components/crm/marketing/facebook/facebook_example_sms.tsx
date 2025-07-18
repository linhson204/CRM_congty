import React, { useRef, useState } from "react";
import FacebookNav from "./facebook_nav";
import styles from "./facebook.module.css";
import TableDataFacebook from "../../table/table_marketing_facebook_detail";
import FacebookInput from "./facebook_input_form";
import FacebookTemplace from "./facebook_message_templace";

const ExamppleSMSFacebook = () => {
  const [currentPage, setCurrentPage] = useState("mau-tin-nhan-tu-dong");
  const titleNav = [
    {
      parentTitle: "Tin nhắn truyền thống",
      childrent: [
        {
          link: "",
          text: "Mẫu tin nhắn truyền thống 1 1"
        },
        {
          link: "",
          text: "Mẫu tin nhắn truyền thống 1 2"
        },
        {
          link: "",
          text: "Mẫu tin nhắn truyền thống 1 1"
        }
      ]
    },
    {
      parentTitle: "Tin nhắn trả lời tự động",
      childrent: [
        {
          link: "",
          text: "Tin nhắn trả lời tự động 1"
        },
        {
          link: "",
          text: "Tin nhắn trả lời tự động 2"
        },
        {
          link: "",
          text: "Tin nhắn trả lời tự động 3"
        }
      ]
    }
  ];
  return (
    <div>
      <div className={styles.facebook_detail}>
        <FacebookNav listTitleNav={titleNav} />
        <div className={styles.facebook__content}>
          <div className={styles.hidden_tabnet}>
            <FacebookInput page={currentPage} />
          </div>
          {currentPage == "danh-sach-tu-dong" && (
            <TableDataFacebook
              changeNumberPage={function (e: number) {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {currentPage === "xem-truoc-kich-ban" && <FacebookTemplace />}
          {currentPage === "mau-tin-nhan-truyen-thong" && <FacebookTemplace />}

          {currentPage === "mau-tin-nhan-tu-dong" && <FacebookTemplace />}
        </div>
      </div>
    </div>
  );
};

export default ExamppleSMSFacebook;
