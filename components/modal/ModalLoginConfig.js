import { Button, Col, Input, Modal, Row, Form } from "antd";
import styles from "./index.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { initUser } from "../crm/redux/userFacebook/userSlice";

const currentUrlQlc = process.env.NEXT_PUBLIC_API;

const CloseIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <circle cx="12" cy="12" r="9" stroke="#474747" />
        <path d="M9 15L15 9" stroke="#474747" />
        <path d="M15 15L9 9" stroke="#474747" />
    </svg>
);

const UserIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M16.9696 19.5057C16.7257 17.5302 15.0414 16.001 13 16.001H11C8.95858 16.001 7.27433 17.5302 7.03036 19.5057M16.9696 19.5057C19.3986 17.8939 21 15.1345 21 12.001C21 7.03041 16.9706 3.00098 12 3.00098C7.02944 3.00098 3 7.03041 3 12.001C3 15.1345 4.60137 17.8939 7.03036 19.5057M16.9696 19.5057C15.5456 20.4506 13.8371 21.001 12 21.001C10.1629 21.001 8.45441 20.4506 7.03036 19.5057M15 10.001C15 11.6578 13.6569 13.001 12 13.001C10.3431 13.001 9 11.6578 9 10.001C9 8.34412 10.3431 7.00098 12 7.00098C13.6569 7.00098 15 8.34412 15 10.001Z"
            stroke="#666666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const LockIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M16 10V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10M12 14V17M18 15C18 18.3137 15.3137 21 12 21C8.68629 21 6 18.3137 6 15C6 11.6863 8.68629 9 12 9C15.3137 9 18 11.6863 18 15ZM13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14Z"
            stroke="#666666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const linedot = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="473"
        height="2"
        viewBox="0 0 473 2"
        fill="none"
    >
        <path d="M0 1H473" stroke="#E93434" stroke-dasharray="2 2" />
    </svg>
);
const getCurrentToken = () => {
    let token = "";
    const currentAccessToken = getCookie("token_base365");
    if (currentAccessToken) {
        token = currentAccessToken?.toString();
    }
    // console.log(currentAccessToken)
    // const tokenJson = currentAccessToken && JSON.parse(`${currentAccessToken}`)
    return token;
};

const POST = async (url, body) => {
    const currentToken = getCurrentToken();
    const config = {
        headers: { Authorization: `Bearer ${currentToken}` },
    };

    try {
        const res = await axios.post(`${currentUrlQlc}/${url}`, body, config);
        if (res?.status === 200) {
            return res?.data?.data;
        } else {
            return res;
        }
    } catch (error) {
        console.log(error);

        return error?.response?.data?.error?.message;
    }
};
export default function ModalSignInHome({ open, setOpen, type }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const router = useRouter();
    const onFinish = async (value) => {
        console.log(value);
        console.log(type);

        const res = await POST("api/qlc/employee/login", {
            ...value,
            type: type,
        });
        console.log(res);

        if (res?.result) {
            dispatch(initUser());
            let acc_token = res?.data?.access_token
      let refresh_token = res?.data?.refresh_token
            Cookies.set('token_base365', acc_token,{ expires: 30 })
      Cookies.set('refresh_token', refresh_token, { expires: 30 })
            // Cookies.set("token_base365", res?.data?.access_token);
            Cookies.set("rf_token", res?.data?.refresh_token,{ expires: 30 });
            Cookies.set("role", res?.data?.type,{ expires: 30 });

            router.reload();
        } else {
            window.alert(res || "Có lỗi xảy ra");
        }
    };

    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
            <div>
                <p className={styles.headerTxt}>
                    Nếu bạn có tài khoản rồi thì đăng nhập tại đây
                </p>
                <Form form={form} className={styles.form} onFinish={onFinish}>
                    <Form.Item
                        name={"account"}
                        rules={[
                            {
                                required: true,
                                message: "Trường này là bắt buộc",
                            },
                        ]}
                    >
                        <Input
                            className={styles.input}
                            size="large"
                            prefix={UserIcon}
                            style={{ marginBottom: "10px" }}
                            placeholder="Nhập tài khoản"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Trường này là bắt buộc",
                            },
                        ]}
                    >
                        <Input.Password
                            className={styles.input}
                            size="large"
                            prefix={LockIcon}
                            placeholder="Nhập mật khẩu"
                        />
                    </Form.Item>
                    <Button
                        size="large"
                        className={styles.button}
                        htmlType="submit"
                    >
                        <p style={{ color: "#fff" }}>Đăng nhập</p>
                    </Button>

                    <Row style={{ marginTop: "20px" }}>
                        <Col span={16}>
                            <span>
                                Bạn chưa có tài khoản?{" "}
                                <a
                                    style={{
                                        color: "#4C5BD4",
                                        fontWeight: 500,
                                    }}
                                    href="https://hungha365.com/dang-ky-nhan-vien.html"
                                >
                                    Đăng ký tại đây
                                </a>
                            </span>
                        </Col>

                        <Col span={8}>
                            <a
                                style={{ color: "#FF770B", float: "right" }}
                                href="https://hungha365.com/quen-mat-khau.html?type=2"
                            >
                                Quên mật khẩu?
                            </a>
                        </Col>
                    </Row>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "20px -20px",
                        }}
                    >
                        {linedot}
                    </div>
                    {/* QR */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <p style={{ marginBottom: "10px",fontWeight:"bold" }}>
                            Tải App Chat365 để chấm công tại mục "Tiện ích"
                        </p>
                        <Image
                            alt="/"
                            src={"https://timviec365.vn/images/before_login/qr_chat_365.png"}
                            width={115}
                            height={115}
                            style={{ marginBottom: "10px" }}
                        />
                        <p style={{ color: "#4C5BD4", fontWeight: 500 }}>
                            App Chat365
                        </p>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
