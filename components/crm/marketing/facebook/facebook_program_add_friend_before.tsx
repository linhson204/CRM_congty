import React, { useRef, useState } from "react";
import {
  Call,
  DropDown,
  DropRight,
  Pen,
  Search
} from "@/public/img/marketing/facebook";
import styles from "./facebook.module.css";
import Image from "next/image";
import FacebookIcons from "./facebook_list_icon";
import FacebookAddBox from "./facebook_add_box_content_user";
import LookBeforFacebook from "./facebook_look_before";
import DropDownList from "./dropdown_list";
import { Select } from "antd";
import SuccessModal from "./success_modal";
import {  Button, Form, Input, message, Space  } from 'antd'
import TestMenu from "./test_menu";

const FacebookProgramAddFriendBefore = () => {
  const [page, setPage] = useState("tao-mau-kich-ban-nhom");
  const [isSuccess, setIsSuccess] = useState(false);

  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  const onFill = () => {
    form.setFieldsValue({
      url: 'https://taobao.com/',
    });
  };

  const chooseFileRef = useRef(null);
  return (
    <section className={styles.templace} id={styles.facebook_program}>
      <p className={styles.suggets}>
        {page === "tao-mau-kich-ban-nhom"
          ? "Kịch bản tự động tham gia nhóm"
          : "Kịch bản tự động tham gia nhóm"}
      </p>
      <div className={styles.templace_title}>
        <p className={styles.templace_title_text}>
          Mẫu kịch bản kết bạn theo danh sách quét 1
        </p>
        {page === "tao-mau-kich-ban-nhom" && (
          <div className={styles.templace_icon}>
            <Pen />
          </div>
        )}
      </div>
      <div className={styles.templace__content}>
        {/* left */}
        <div className={styles.content_left}>
          {page === "xem-truoc-kich-ban-nhom" && (
            <>
              <div>
                <p className={styles.content_title}>Ghi chú về khách hàng</p>
                <input
                  className={styles.content_input}
                  placeholder="Tất cả khách hàng thân quen"
                ></input>
              </div>
              <div>
                <p className={styles.content_title}>Thời gian tạo</p>
                <input
                  className={styles.content_input}
                  placeholder="12:00"
                ></input>
              </div>
              <div>
                <p className={styles.content_title}>Tổng thời gian dự kiến</p>
                <input
                  className={styles.content_input}
                  placeholder="60 phút"
                ></input>
              </div>
            </>
          )}

          {page == "tao-mau-kich-ban-nhom" && (
            <>
              <div>
                <p className={styles.content_title}>Ghi chú về khách hàng</p>
                <input
                  className={styles.content_input}
                  placeholder="Tất cả khách hàng thân quen"
                ></input>
              </div>
              <div>
                <p className={styles.content_title}>
                  Chọn tài khoản để thực hiện
                </p>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    marginBottom: "0.5rem"
                  }}
                  suffixIcon={<DropDown />}
                  placeholder="Chọn tài khoản"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Not Identified"
                    },
                    {
                      value: "2",
                      label: "Closed"
                    },
                    {
                      value: "3",
                      label: "Communicated"
                    },
                    {
                      value: "4",
                      label: "Identified"
                    },
                    {
                      value: "5",
                      label: "Resolved"
                    },
                    {
                      value: "6",
                      label: "Cancelled"
                    }
                  ]}
                />
                <p className={styles.program_note}>
                  Lưu ý: Chọn Gửi tin nhắn để chọn tài khoản thực hiện
                </p>
              </div>
                  <TestMenu/>
          

              <DropDownList title={"Example"} showArray={[1,1,1,1,1,1]} onClickChange={() => {}} />
              <div>
                <p className={styles.content_title}>
                  Thời gian giữa các lần gửi
                </p>
                <input
                  className={styles.content_input}
                  placeholder="10 phút"
                ></input>
              </div>
              <div>
                <p className={styles.content_title}>Tổng thời gian dự kiến</p>
                <input
                  className={styles.content_input}
                  placeholder="60 phút"
                ></input>
              </div>
            </>
          )}
              <div className={styles.box_program_btn}>
                <button
                  onClick={async () => {
                    setIsSuccess(true);
                  }}
                  className={styles.program_btn}
                >
                  Lưu
                </button>
              </div>
              <SuccessModal
            isModalCancel={isSuccess}
            setIsModalCancel={setIsSuccess}
            content={"Thêm mới mẫu kịch bản thành công"}
            title={""} className={""}              />
        </div>
      </div>
    </section>
  );
};

export default FacebookProgramAddFriendBefore;
