import { useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space
} from "antd";
const { Option } = Select;
import styles from "./facebook.module.css";
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
export const FormTest = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
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
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website
  }));
  return (
    <>
        <Form
        {...formItemLayout}
        className={styles.custom_width_form}
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
        <Form.Item
            style={{
            width: '100%',
            marginTop: '1.25rem'
            }}
            className="custom_pos"
            name="email"
            label="Tiêu đề"
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
            <Input placeholder="Tiêu đề" showCount className={styles.custom_input_form} maxLength={100} />
        </Form.Item>
        <p className={styles.label}>Upload</p>
        <Space.Compact style={{ width: "100%", height: "2.625rem" }}>
            <label htmlFor="choose-file" className={styles.for_label}>
            <span className={styles.not_file}>Upload</span>
            </label>
            <Input
            id="choose-file"
            defaultValue=""
            placeholder="Upload"
            type="file"
            style={{
                background: "#FFF",
                height: "2.625rem",
                display: "none"
            }}
            />

            <Button  className={styles.btn_file} type="primary">
            File
            </Button>
        </Space.Compact>
        <Form.Item
            name="Nội dung chính"
            label="Nội dung chính"
            rules={[
            {
                required: true,
                message: "Please input Intro"
            }
            ]}
        >
            <Input.TextArea style={{
                height: '6.125rem'
            }} placeholder="Nhập nội dung chính" showCount maxLength={100} />
        </Form.Item>
        </Form>
        <p className={styles.note_one}>Lưu ý 1: Sử dụng từ khóa [TEN_KHACH_HANG] để gắn tên khách hàng</p>
        <p className={styles.note_two}>Lưu ý 2: Sử dụng từ khóa [A1] để thêm icon từ bộ icon tương ứng vào nội dung để tránh spam</p>
    </>
  );
};
