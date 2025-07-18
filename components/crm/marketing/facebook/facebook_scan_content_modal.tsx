import React, { useState } from "react";
import DropDownList from "./dropdown_list";
import styles from "./facebook.module.css";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  RadioChangeEvent,
  Row,
  Select,
  SelectProps,
  Space,
  Radio
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Send } from "@/public/img/marketing/facebook";

interface ScanWriteProps {
  data: any;
  handle: (e: any) => void;
}

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
export const ScanModalIdWrite: React.FC<ScanWriteProps> = ({
  data,
  handle
}) => {
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

  const options: SelectProps["options"] = [];
  for (let i = 10; i < 12; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i
    });
  }

  const [size, setSize] = useState<SizeType>("middle");

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        className={`${styles.custom_width_form} ${styles.custom_form_camign}`}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86"
        }}
        style={{
          width: "100%"
        }}
        scrollToFirstError
      >
        <div className={`${styles.margin_input}`}>
          <span className={`${styles.custom_input_form} `}>
            Danh sách lựa chọn
          </span>
        </div>
        <div className={`${styles.scan_custom_bg_input}`}>
            <DropDownList
            title={"Danh sách lựa chọn"}
            showArray={["Danh sách có sẵn", "Danh sách trong mục đã quét"]}
            onClickChange={undefined}
            />
        </div>
        <Form.Item
          style={{
            width: "100%",
            marginTop: "1.25rem"
          }}
          className="custom_pos"
          name="email"
          label=""
          rules={[
            {
              type: "email",
              message: "The input is not valid empty!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <div className={styles.scan_box_custom}>
            <span className={styles.scan_placehoder}>
              Nhập ID bài viết cần quét UID
            </span>
          </div>
          <Input
            placeholder="Nhập ID bài viết cần quét UID"
            className={`${styles.custom_input_form} ${styles.scan_change_bg}`}
            style={{
              backgroundColor: "#E1E1E1",
              height: "2.625rem"
            }}
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          style={{
            width: "100%",
            marginTop: "1.25rem"
          }}
          className="custom_pos"
          name="email"
          label=""
          rules={[
            {
              type: "email",
              message: "The input is not valid empty!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <div className={styles.scan_box_custom}>
            <span className={styles.scan_placehoder}>
              Ghi chú về khách hàng:
            </span>
            <Radio value={2}>Tất cả</Radio>
          </div>
          <Input
            placeholder="Nhập số lượng tối đa"
            className={`${styles.custom_input_form} ${styles.scan_change_bg}`}
            style={{
              backgroundColor: "#E1E1E1",
              height: "2.625rem"
            }}
            maxLength={100}
          />
        </Form.Item>
      </Form>
      {/* btn */}
    </div>
  );
};
