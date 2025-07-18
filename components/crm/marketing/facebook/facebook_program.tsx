import React, { useState } from "react";
import FacebookNav from "./facebook_nav";
import FacebookInput from "./facebook_input_form";
import styles from "./facebook.module.css";
import TableDataFacebook from "../../table/table_marketing_facebook_detail";
import FacebookTemplace from "./facebook_message_templace";
import FacebookProgramAddFriendBefore from "./facebook_program_add_friend_before";
import FacebookInputProgram from "./facebook_input_form_program";

const ProgramFacebook = () => {
  const [currentPage, setCurrentPage] = useState("tao-mau-kich-ban-ket-ban");

  const titleNav = [
    {
      parentTitle: "Kịch bản kết bạn theo danh sách quét",
      childrent: [
        {
          link: "",
          text: "Mẫu kịch bản kết bạn theo danh sách quét 1"
        },
        {
          link: "",
          text: "Mẫu kịch bản kết bạn theo danh sách quét 2"
        },
        {
          link: "",
          text: "Mẫu kịch bản kết bạn theo danh sách quét 1"
        }
      ]
    },
    {
        parentTitle: "Kịch bản kết bạn theo danh sách quét",
        childrent: [
          {
            link: "",
            text: "Mẫu kịch bản kết bạn theo danh sách quét 1"
          },
          {
            link: "",
            text: "Mẫu kịch bản kết bạn theo danh sách quét 2"
          },
          {
            link: "",
            text: "Mẫu kịch bản kết bạn theo danh sách quét 3"
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
            <FacebookInputProgram page={currentPage} />
          </div>
          {currentPage == "danh-sach-ket-ban" && (
            <TableDataFacebook
              changeNumberPage={function (e: number) {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {currentPage === "xem-truoc-kich-ban-ket-ban" && <FacebookProgramAddFriendBefore/>}
          {currentPage === "tao-mau-kich-ban-ket-ban" && <FacebookProgramAddFriendBefore/>}
        </div>
      </div>
    </div>
  );
};

export default ProgramFacebook;
