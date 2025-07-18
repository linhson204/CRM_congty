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
  RadioChangeEvent,
  Row,
  Select,
  SelectProps,
  Space,
  Radio
} from "antd";
const { Option } = Select;
import styles from "./facebook.module.css";
import { SizeType } from "antd/es/config-provider/SizeContext";
import DropDownList from "./dropdown_list";
import { DownloadOutlined } from '@ant-design/icons';
import { Send } from "@/public/img/marketing/facebook";


export interface FormProps {
  onChangeInfor: (value: any) => void
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
export const FormCampaign:React.FC<FormProps> = ({ onChangeInfor }) => {
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
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 12; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i
    });
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const [size, setSize] = useState<SizeType>("middle");

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  //   radio
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    onChangeInfor(e)
    setValue(e.target.value);
  };
  return (
    <>
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
        <Form.Item
          style={{
            width: "100%",
            marginTop: "1.25rem"
          }}
          className="custom_pos"
          name="email"
          label="Ghi chú về khách hàng"
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
            placeholder="Ghi chú về khách hàng"
            className={styles.custom_input_form}
            style={{
              backgroundColor: "#E1E1E1",
              height: "2.625rem"
            }}
            maxLength={100}
          />
        </Form.Item>
        <div className={`${styles.margin_input}`}>
          <span className={`${styles.custom_input_form}`}>
            Tài khoản thực hiện
          </span>
        </div>
        <Select
          size={size}
          defaultValue="123456789 - Vũ Thị Thùy Dung"
          onChange={handleChange}
          style={{
            width: "100%",
            height: "2.625rem",
            background: "#FFF !important",
            marginBottom: "1.25rem"
          }}
          options={options}
        />
        <div className={`${styles.margin_input}`}>
          <span className={`${styles.custom_input_form}`}>
            Danh sách lựa chọn
          </span>
        </div>
        <DropDownList
          title={"Danh sách lựa chọn"}
          showArray={["Danh sách có sẵn", "Danh sách trong mục đã quét"]}
          onClickChange={undefined}
        />
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Bạn bè</Radio>
            <Radio value={2}>Nhóm</Radio>
          </Radio.Group>
        </div>

        <div
          className={`${styles.margin_input}`}
          style={{
            marginTop: "1.25rem"
          }}
        >
          <span className={`${styles.custom_input_form}`}>
            Danh sách đã chọn
          </span>
        </div>
        <DropDownList
          title={"Bạn bè hiện tại - 999"}
          showArray={["Danh sách có sẵn", "Danh sách trong mục đã quét"]}
          onClickChange={undefined}
        />

        <div
          className={`${styles.margin_input}`}
          style={{
            marginTop: "1.25rem"
          }}
        >
          <span className={`${styles.custom_input_form}`}>Số lượng</span>
        </div>
        <div className={styles.two_input}>
          <Form.Item
            style={{
              width: "46%",
              marginTop: "00.62rem"
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
              placeholder="Ví dụ: [200]"
              className={styles.custom_input_form}
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
              className={styles.custom_input_form}
              style={{
                backgroundColor: "#E1E1E1",
                height: "2.625rem"
              }}
              maxLength={100}
            />
          </Form.Item>
        </div>
        <p className={styles.custom_input_form}>
          Thời gian delay giữa các lần gửi{" "}
          <span className={styles.custom_text_above}>({" >"} 3 phút)</span>
        </p>
        <Form.Item
          style={{
            width: "100%",
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
            placeholder="Nhập thời gian. Ví dụ: 5"
            className={styles.custom_input_form}
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
          label="Tổng thời gian dự kiến"
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
            placeholder="21 phút"
            className={styles.custom_input_form}
            style={{
              backgroundColor: "#E1E1E1",
              height: "2.625rem"
            }}
            maxLength={100}
          />
        </Form.Item>
        <div
          className={`${styles.margin_input}`}
          style={{
            marginTop: "1.25rem"
          }}
        >
          <span className={`${styles.custom_input_form}`}>Thời gian gửi</span>
        </div>
        <DropDownList
          title={"Gửi ngay"}
          showArray={["Gửi ngay", ""]}
          onClickChange={undefined}
        />
      </Form>
      {/* btn */}
      <div className={styles.btn_campign}>
          <Button className={`${styles.btn} ${styles.btn_noactive}`}   shape="round"  size={size}>
          Hủy
          </Button>
          <Button  className={`${styles.btn} ${styles.btn_active}`}  icon={<Send/>} size={size}>
           Gửi
          </Button>
        </div>
    </>
  );
};
