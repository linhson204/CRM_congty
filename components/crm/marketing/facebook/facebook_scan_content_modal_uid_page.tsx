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
export const ScanModalIdPage: React.FC<ScanWriteProps> = ({ data, handle }) => {
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
        className={`${styles.custom_width_form} ${styles.custom_form_camign} ${styles.scan_content_page} form_scan_page`}
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
        <div className={`${styles.custom_plahoder_margin}`}>
          <DropDownList
            title={"Danh sách lựa chọn"}
            showArray={["Danh sách có sẵn", "Danh sách trong mục đã quét"]}
            onClickChange={undefined}
          />
        </div>
        <div className={``}>
          <span className={`${styles.custom_input_form} `}>
            Lọc theo thời gian (từ gần về xa)
          </span>
        </div>
        <div className={styles.two_input}>
          <Form.Item
            style={{
              width: "46%",
              marginTop: "00.62rem"
            }}
            className={`${styles.scan_change_bg} custom_pos`}
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
            <Input
              placeholder="Ví dụ: [200]"
              className={`${styles.custom_input_form} ${styles.scan_change_bg}`}
              style={{
                backgroundColor: "#E1E1E1",
                height: "2.625rem"
              }}
              maxLength={100}
            />
          </Form.Item>
          <span> đến </span>
          <Form.Item
            style={{
              width: "46%",
              marginTop: "0.62rem"
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
            <Input
              placeholder="Ví dụ: [400]"
              className={`${styles.custom_input_form} ${styles.scan_change_bg}`}
              style={{
                backgroundColor: "#E1E1E1",
                height: "2.625rem"
              }}
              maxLength={100}
            />
          </Form.Item>
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
              Số lượng tối đa UID cần quét
            </span>
            <Radio value={2}>Tất cả</Radio>
          </div>
          <Input
            placeholder="Hộp thư chính"
            className={`${styles.custom_input_form} ${styles.scan_change_bg}`}
            style={{
              backgroundColor: "#E1E1E1",
              height: "2.625rem"
            }}
            maxLength={100}
          />
        </Form.Item>
        <div className={styles.scan_two_dropdown}>
          <div className={`${styles.scan_item}`}>
            <div className={`${styles.margin_input}`}>
              <span className={`${styles.custom_input_form} `}>
                Danh sách lựa chọn
              </span>
            </div>
            <DropDownList
              title={"Danh sách lựa chọn"}
              showArray={["Danh sách có sẵn", "Danh sách trong mục đã quét"]}
              onClickChange={undefined}
            />
          </div>
          <div className={`${styles.scan_item}`}>
            <div className={`${styles.margin_input}`}>
              <span className={`${styles.custom_input_form} `}>
                Danh sách lựa chọn
              </span>
            </div>
            <DropDownList
              title={"Danh sách lựa chọn"}
              showArray={["Danh sách có sẵn", "Danh sách trong mục đã quét"]}
              onClickChange={undefined}
            />
          </div>
        </div>
        <div className={styles.check}>
          <Input type="checkbox" className={styles.check_box} />
          <span>Bỏ qua những UID đã nhận</span>
          <span>tin nhắn mà không trả lời</span>
        </div>
      </Form>
      {/* btn */}
    </div>
  );
};
