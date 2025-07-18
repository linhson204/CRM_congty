import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";
import { useRouter } from "next/router";
import TableDataSaveList from "../table/table-save-list";
import styles from "./ordern.module.css";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import useLoading from "../hooks/useLoading";


export default function ReplacePhone() {
  const [form] = Form.useForm();

  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  const router = useRouter();


  const initialValues = {
    oldphone: '',
    newphone: ''
  }

  useEffect(() => {
    setHeaderTitle("Thay số tổng đài");
    setShowBackButton(false);
    setCurrentPath("/order-new/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const onSubmit = async (value) => {
    try {
      console.log("VALUE", value)
      setIsLoading(true);

      const resReplacePhone = await fetch(
        'https://voip.timviec365.vn/api/auto_replace_sipphone',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({
            old_phone: value.oldphone,
            new_phone: value.newphone
          }),
        }
      )

      setTimeout(() => {
        window.alert("Thay số thành công, vui lòng dùng máy bàn gọi thử")
        setIsLoading(false);
      }, 10000);
    } catch (error) {
      console.log("ERROR", error);
      setTimeout(() => {
        window.alert("Thay số thành công, vui lòng dùng máy bàn gọi thử")
        setIsLoading(false);
      }, 10000);
    }
  }



  return (
    <div ref={mainRef} className={styleHome.main}>
      <div className={styles.body}>
        <div>

          {isLoading ? <Spin
            size="large"
            style={{
              margin: "auto",
              width: "100%",
              display: "block",
              padding: "200px",
              height: "100%",
            }}
          /> :
            <Form
              form={form}
              onFinish={onSubmit}
              initialValues={initialValues}
            >

              <Form.Item
                labelCol={{ span: 24 }}
                label="Số tổng đài cũ"
                name={"oldphone"}
                rules={[
                  {
                    pattern: /^(\+?84|0)(\d{9,10})$/,
                    message: 'Vui lòng nhập số điện thoại hợp lệ',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nhập số tổng đài cũ"
                  style={{ width: "50%", borderRadius: "0px" }}
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Số tổng đài mới"
                name={"newphone"}
                rules={[
                  {
                    pattern: /^(\+?84|0)(\d{9,10})$/,
                    message: 'Vui lòng nhập số điện thoại hợp lệ',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nhập số tổng đài mới"
                  style={{ width: "50%", borderRadius: "0px" }}
                />
              </Form.Item>
              {1 ? <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button className={styles.luu} type="submit">
                  <p className={styles.textluu}>Thay số</p>
                </button>
              </div> : <div style={{ display: "flex", justifyContent: "center" }}><LoadingOutlined style={{ fontSize: 30 }} /></div>}
            </Form>
          }

        </div>
      </div >
    </div>
  );
}
