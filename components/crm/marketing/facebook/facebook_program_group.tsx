import React, { useState } from "react";
import FacebookNav from "./facebook_nav";
import FacebookInput from "./facebook_input_form";
import styles from "./facebook.module.css";
import TableDataFacebook from "../../table/table_marketing_facebook_detail";
import FacebookTemplace from "./facebook_message_templace";
import FacebookProgramAddFriendBefore from "./facebook_program_add_friend_before";
import FacebookInputProgram from "./facebook_input_form_program";
import FacebookInputProgramGroup from "./facebook_input_program_group";

const FacebookProgramGroup = () => {
  const [currentPage, setCurrentPage] = useState("xem-truoc-kich-ban-nhom");

  const titleNav = [
    {
      parentTitle: "Kịch bản tự động tham gia nhóm",
      childrent: [
        {
          link: "",
          text: "Kịch bản tự động tham gia nhóm 1"
        },
        {
          link: "",
          text: "Kịch bản tự động tham gia nhóm 2"
        },
        {
          link: "",
          text: "Kịch bản tự động tham gia nhóm 1"
        }
      ]
    },
    {
        parentTitle: "Kịch bản tự động tham gia nhóm",
        childrent: [
          {
            link: "",
            text: "Kịch bản tự động tham gia nhóm 1"
          },
          {
            link: "",
            text: "Kịch bản tự động tham gia nhóm 2"
          },
          {
            link: "",
            text: "Kịch bản tự động tham gia nhóm 3"
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
            <FacebookInputProgramGroup page={currentPage} />
          </div>
          {currentPage == "danh-sach-kich-ban-nhom" && (
            <TableDataFacebook
              changeNumberPage={function (e: number) {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {currentPage === "xem-truoc-kich-ban-nhom" && <FacebookProgramAddFriendBefore/>}
          {currentPage === "tao-mau-kich-ban-nhom" && <FacebookProgramAddFriendBefore/>}
        </div>
      </div>
    </div>
  );
};

export default FacebookProgramGroup;
