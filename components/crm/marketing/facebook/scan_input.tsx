import React, { useState } from "react";
import DropDownList from "./dropdown_list";
import styles from "./facebook.module.css";
import {
  Form,
  Input,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Send } from "@/public/img/marketing/facebook";

interface ScanWriteProps {
  data: any;
  handle: (e: any) => void;
}


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};

export const ScanModalSaveTable: React.FC<ScanWriteProps> = ({ data, handle }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  return (
      <Form
        {...formItemLayout}
        className={`${styles.custom_width_form} ${styles.custom_form_camign} ${styles.scan_content_page} form_scan_page`}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86"
        }}
        style={{
          width: "100%",
        }}
        scrollToFirstError
      >
        <div className={`${styles.margin_input}`} style={{
            marginTop: '1rem'
        }}>
          <span className={`${styles.custom_input_form} `} >
            Đặt tên cho danh sách quét
          </span>
        </div>
        <div className={`${styles.custom_plahoder_margin}`} style={{
            marginTop: '1.5rem'
          }}>
          <Input placeholder="Nhập tên cho danh sách quét"/>
        </div>
      </Form>
  );
};
