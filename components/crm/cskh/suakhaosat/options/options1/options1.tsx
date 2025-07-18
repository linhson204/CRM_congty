import { Button, Checkbox, Input } from "antd";
import React, { useState } from "react";
import styles from "../../../csks.module.css";
import Link from "next/link";

type Props = {};

const Options1 = (props: any) => {
  const { handleThemmoi, handleDleteOP1 } = props;
  const [checkboxes, setCheckboxes] = useState([0]); // Ban đầu có 1 checkbox

  const addCheckbox = () => {
    const newCheckboxes = [...checkboxes, checkboxes.length];
    setCheckboxes(newCheckboxes);
  };
  
  return (
    <fieldset className={styles.left_option1}>
      <div>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            placeholder={"Nhập câu hỏi"}
            className={styles.inputtitle2_option1}
          />
          <div className={styles.right_OP1}>
            <select style={{ height: "100%", border: "none" }}>
              <option value="TN">Trăc nghiệm</option>
              <option value="TL">Câu trả lời</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <div>
          {checkboxes.map((checkboxIndex, index) => (
            <div key={`${index}`} style={{ display: "block" }}>
              <div style={{ color: "red" }}>
                <Checkbox key={checkboxIndex}>
                  Tùy chọn {checkboxIndex + 1}
                </Checkbox>
              </div>
              <div style={{ padding: "10px 20px" }}>
                <Checkbox key={checkboxIndex}>
                  Chọn đáp án {checkboxIndex + 1}
                </Checkbox>
              </div>
            </div>
          ))}
          <div style={{ paddingTop: 20 }}>
            <Link href={""} style={{ cursor: "pointer" }} onClick={addCheckbox}>
              Thêm tùy chọn
            </Link>
          </div>
          <div className={styles.footer_op1}>
            <div>
              <img
                onClick={() => handleDleteOP1()}
                style={{ paddingLeft: 20 }}
                src="/crm/delete.svg"
                alt=""
              />
            </div>
            <div>
              <Checkbox>Bắt buộc</Checkbox>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};
export default Options1;
