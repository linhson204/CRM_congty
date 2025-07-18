import React, { useRef } from "react";
import styles from "./styles.module.scss";
import { Carousel } from "antd";
import Icon from "./icon";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
const BangGiaTongDai: any = () => {
    const carouselRef = useRef(null);

    // Tạo hàm xử lý sự kiện để chuyển đến slide tiếp theo
    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };
    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };
    return (
        <div className={styles.main}>
            <div>
                <h1 className={styles.title}>
                    {" "}
                    Bảng Giá Tổng Đài Đa Kênh Thông Minh
                </h1>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                    margin: "36px auto",
                }}
            >
                <div className={styles.cardsContainer}>
                    <div className={styles.card}>
                        <div className={styles.card_title}>
                            <h3>Gói Call Center</h3>
                        </div>
                        <div className={styles.price}>
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                {" "}
                                <div className={styles.dvt}>đ</div>
                                <span>100.000</span>
                            </div>
                            <div>
                                <p>User / tháng</p>
                            </div>
                        </div>
                        <div className={styles.des}>
                            <div className={styles.des_p}>
                                Thanh toán gói:<span> 6 tháng</span>
                            </div>
                            <div className={styles.des_p}>
                                Dung lượng lưu trữ:<span> 2Gb/User</span>
                            </div>
                            <div className={styles.des_p}>
                                Gọi đa thiết bị (IP/Soft/App)
                            </div>
                            <div className={styles.des_p}>
                                Phiếu Ghi (Ticket)
                            </div>
                            <div className={styles.des_p}>
                                Quản lý khách hàng / Nhân viên
                            </div>
                            <div className={styles.des_p}>
                                Marketing – Chiến dịch
                            </div>
                            <div className={styles.des_p}>
                                Tích hợp mọi nền tảng khác
                            </div>
                        </div>
                        <Link href="#OMNI-CHANEL-AI">
                            <div className={styles.detail}>
                                Xem chi tiết tính năng
                            </div>
                        </Link>
                        <div
                            className={styles.btn}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                window.location.href =
                                    "https://hungha365.com/dang-ky-cong-ty.html";
                            }}
                        >
                            <span>Dùng Thử Miễn Phí</span>
                            <Icon />
                        </div>
                    </div>
                    <div className={styles.card1}>
                        <div className={styles.card_title1}>
                            <h3>Gói OMNI CHANNEL</h3>
                        </div>
                        <div className={styles.right}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="119"
                                height="117"
                                viewBox="0 0 119 117"
                                fill="none"
                            >
                                <path
                                    d="M110 113.207L117.001 113.207L110 98.9999L110 113.207Z"
                                    fill="#1A002F"
                                />
                                <path
                                    d="M1.00003 9.49994L1.00003 3.30163L11 9.50012L1.00003 9.49994Z"
                                    fill="#1A002F"
                                />
                                <path
                                    d="M117.001 113.207L117.001 69.5545C117.001 68.1787 116.434 66.8636 115.434 65.919L50.5634 4.66618C49.6353 3.78983 48.4071 3.30163 47.1307 3.30163L0.999984 3.30162L117.001 113.207Z"
                                    fill="url(#paint0_linear_3500_4729)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_3500_4729"
                                        x1="58.0249"
                                        y1="1.65081"
                                        x2="61.301"
                                        y2="114.819"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#FF4301" />
                                        <stop offset="1" stop-color="#FF6D11" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <text className={styles.text}>PHỔ BIẾN NHẤT</text>
                        </div>
                        <div className={styles.price1}>
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                {" "}
                                <div className={styles.dvt}>đ</div>
                                <span>110.000</span>
                            </div>
                            <div>
                                <p>User / tháng</p>
                            </div>
                        </div>
                        <div className={styles.des}>
                            <div className={styles.des_p}>
                                Thanh toán gói:<span> 6 tháng</span>
                            </div>
                            <div className={styles.des_p}>
                                Dung lượng lưu trữ:<span> 2Gb/User</span>
                            </div>
                            <div className={styles.des_p}>
                                Gọi đa thiết bị (IP/Soft/App)
                            </div>
                            <div className={styles.des_p}>
                                Phiếu Ghi (Ticket)
                            </div>
                            <div className={styles.des_p}>
                                Quản lý khách hàng / Nhân viên
                            </div>
                            <div className={styles.des_p}>
                                Marketing – Chiến dịch
                            </div>
                            <div className={styles.des_p}>
                                Tích hợp mọi nền tảng khác
                            </div>
                            <div className={styles.des_p}>
                                Đa Kênh (Facebook, Zalo OA)
                            </div>
                            <div className={styles.des_p}>
                                Livetalk (Audio / Video Call)
                            </div>
                        </div>
                        <Link href="#OMNI-CHANEL-AI">
                            <div className={styles.detail}>
                                Xem chi tiết tính năng
                            </div>
                        </Link>
                        <div
                            className={styles.btn1}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                window.location.href =
                                    "https://hungha365.com/dang-ky-cong-ty.html";
                            }}
                        >
                            <span>Dùng Thử Miễn Phí</span>
                            <Icon />
                        </div>
                    </div>
                    <div className={styles.card2}>
                        <div className={styles.card_title2}>
                            <h3>Gói CALL CENTER AI</h3>
                        </div>
                        <div className={styles.price}>
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                {" "}
                                <div className={styles.dvt}>đ</div>
                                <span>140.000</span>
                            </div>
                            <div>
                                <p>User / tháng</p>
                            </div>
                        </div>
                        <div className={styles.des}>
                            <div className={styles.des_p}>
                                Thanh toán gói:<span> 6 tháng</span>
                            </div>
                            <div className={styles.des_p}>
                                Dung lượng lưu trữ:<span> 4Gb/User</span>
                            </div>
                            <div className={styles.des_p}>
                                Gọi đa thiết bị (IP/Soft/App)
                            </div>
                            <div className={styles.des_p}>
                                Phiếu Ghi (Ticket)
                            </div>
                            <div className={styles.des_p}>
                                Quản lý khách hàng / Nhân viên
                            </div>
                            <div className={styles.des_p}>
                                Marketing – Chiến dịch
                            </div>
                            <div className={styles.des_p}>
                                Tích hợp mọi nền tảng khác
                            </div>
                            <div className={styles.line}>
                                <span>Đa Kênh (Facebook, Zalo OA)</span>
                            </div>
                            <div className={styles.line}>
                                <span>Livetalk (Audio / Video Call)</span>
                            </div>
                            <div className={styles.des_p}>
                                <span>Voice AI</span>
                            </div>
                        </div>
                        <Link href="#OMNI-CHANEL-AI">
                            <div className={styles.detail}>
                                Xem chi tiết tính năng
                            </div>
                        </Link>
                        <div
                            className={styles.btn2}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                window.location.href =
                                    "https://hungha365.com/dang-ky-cong-ty.html";
                            }}
                        >
                            <span>Dùng Thử Miễn Phí</span>
                            <Icon />
                        </div>
                    </div>
                    <div className={styles.card3}>
                        <div className={styles.card_title3}>
                            <h3>Gói OMNI CHANNEL AI</h3>
                        </div>
                        <div className={styles.price}>
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                {" "}
                                <div className={styles.dvt}>đ</div>
                                <span>170.000</span>
                            </div>
                            <div>
                                <p>User / tháng</p>
                            </div>
                        </div>
                        <div className={styles.des}>
                            <div className={styles.des_p}>
                                Thanh toán gói:<span> 6 tháng</span>
                            </div>
                            <div className={styles.des_p}>
                                Dung lượng lưu trữ:<span> 4Gb/User</span>
                            </div>
                            <div className={styles.des_p}>
                                Gọi đa thiết bị (IP/Soft/App)
                            </div>
                            <div className={styles.des_p}>
                                Phiếu Ghi (Ticket)
                            </div>
                            <div className={styles.des_p}>
                                Quản lý khách hàng / Nhân viên
                            </div>
                            <div className={styles.des_p}>
                                Marketing – Chiến dịch
                            </div>
                            <div className={styles.des_p}>
                                Tích hợp mọi nền tảng khác
                            </div>
                            <div className={styles.des_p}>
                                Đa Kênh (Facebook, Zalo OA)
                            </div>
                            <div className={styles.des_p}>
                                Livetalk (Audio / Video Call)
                            </div>
                            <div className={styles.des_p}>
                                <span>Voice AI</span>
                            </div>
                        </div>
                        <Link href="#OMNI-CHANEL-AI">
                            <div className={styles.detail}>
                                Xem chi tiết tính năng
                            </div>
                        </Link>
                        <div
                            className={styles.btn3}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                window.location.href =
                                    "https://hungha365.com/dang-ky-cong-ty.html";
                            }}
                        >
                            <span>Dùng Thử Miễn Phí</span>
                            <Icon />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.Carousel}>
                <div className={styles.leftButton} onClick={handlePrev}>
                    <LeftOutlined rev={"xxx"} />
                </div>

                <Carousel ref={carouselRef} autoplay dots={false}>
                    <div className={styles.cardWrapper}>
                        <div className={styles.card}>
                            <div className={styles.card_title}>
                                <h3>Gói Call Center</h3>
                            </div>
                            <div className={styles.price}>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {" "}
                                    <div className={styles.dvt}>đ</div>
                                    <span>100.000</span>
                                </div>
                                <div>
                                    <p>User / tháng</p>
                                </div>
                            </div>
                            <div className={styles.des}>
                                <div className={styles.des_p}>
                                    Thanh toán gói:<span> 6 tháng</span>
                                </div>
                                <div className={styles.des_p}>
                                    Dung lượng lưu trữ:<span> 2Gb/User</span>
                                </div>
                                <div className={styles.des_p}>
                                    Gọi đa thiết bị (IP/Soft/App)
                                </div>
                                <div className={styles.des_p}>
                                    Phiếu Ghi (Ticket)
                                </div>
                                <div className={styles.des_p}>
                                    Quản lý khách hàng / Nhân viên
                                </div>
                                <div className={styles.des_p}>
                                    Marketing – Chiến dịch
                                </div>
                                <div className={styles.des_p}>
                                    Tích hợp mọi nền tảng khác
                                </div>
                            </div>
                            <Link href="#OMNI-CHANEL-AI">
                                <div className={styles.detail}>
                                    Xem chi tiết tính năng
                                </div>
                            </Link>
                            <div
                                className={styles.btn}
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    window.location.href =
                                        "https://hungha365.com/dang-ky-cong-ty.html";
                                }}
                            >
                                <span>Dùng Thử Miễn Phí</span>
                                <Icon />
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardWrapper}>
                        <div className={styles.card1}>
                            <div className={styles.card_title1}>
                                <h3>Gói OMNI CHANNEL</h3>
                            </div>
                            <div className={styles.right}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="119"
                                    height="117"
                                    viewBox="0 0 119 117"
                                    fill="none"
                                >
                                    <path
                                        d="M110 113.207L117.001 113.207L110 98.9999L110 113.207Z"
                                        fill="#1A002F"
                                    />
                                    <path
                                        d="M1.00003 9.49994L1.00003 3.30163L11 9.50012L1.00003 9.49994Z"
                                        fill="#1A002F"
                                    />
                                    <path
                                        d="M117.001 113.207L117.001 69.5545C117.001 68.1787 116.434 66.8636 115.434 65.919L50.5634 4.66618C49.6353 3.78983 48.4071 3.30163 47.1307 3.30163L0.999984 3.30162L117.001 113.207Z"
                                        fill="url(#paint0_linear_3500_4729)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_3500_4729"
                                            x1="58.0249"
                                            y1="1.65081"
                                            x2="61.301"
                                            y2="114.819"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stop-color="#FF4301" />
                                            <stop
                                                offset="1"
                                                stop-color="#FF6D11"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <text className={styles.text}>
                                    PHỔ BIẾN NHẤT
                                </text>
                            </div>
                            <div className={styles.price1}>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {" "}
                                    <div className={styles.dvt}>đ</div>
                                    <span>110.000</span>
                                </div>
                                <div>
                                    <p>User / tháng</p>
                                </div>
                            </div>
                            <div className={styles.des}>
                                <div className={styles.des_p}>
                                    Thanh toán gói:<span> 6 tháng</span>
                                </div>
                                <div className={styles.des_p}>
                                    Dung lượng lưu trữ:<span> 2Gb/User</span>
                                </div>
                                <div className={styles.des_p}>
                                    Gọi đa thiết bị (IP/Soft/App)
                                </div>
                                <div className={styles.des_p}>
                                    Phiếu Ghi (Ticket)
                                </div>
                                <div className={styles.des_p}>
                                    Quản lý khách hàng / Nhân viên
                                </div>
                                <div className={styles.des_p}>
                                    Marketing – Chiến dịch
                                </div>
                                <div className={styles.des_p}>
                                    Tích hợp mọi nền tảng khác
                                </div>
                                <div className={styles.des_p}>
                                    Đa Kênh (Facebook, Zalo OA)
                                </div>
                                <div className={styles.des_p}>
                                    Livetalk (Audio / Video Call)
                                </div>
                            </div>
                            <Link href="#OMNI-CHANEL-AI">
                                <div className={styles.detail}>
                                    Xem chi tiết tính năng
                                </div>
                            </Link>
                            <div
                                className={styles.btn1}
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    window.location.href =
                                        "https://hungha365.com/dang-ky-cong-ty.html";
                                }}
                            >
                                <span>Dùng Thử Miễn Phí</span>
                                <Icon />
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardWrapper}>
                        <div className={styles.card2}>
                            <div className={styles.card_title2}>
                                <h3>Gói CALL CENTER AI</h3>
                            </div>
                            <div className={styles.price}>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {" "}
                                    <div className={styles.dvt}>đ</div>
                                    <span>140.000</span>
                                </div>
                                <div>
                                    <p>User / tháng</p>
                                </div>
                            </div>
                            <div className={styles.des}>
                                <div className={styles.des_p}>
                                    Thanh toán gói:<span> 6 tháng</span>
                                </div>
                                <div className={styles.des_p}>
                                    Dung lượng lưu trữ:<span> 4Gb/User</span>
                                </div>
                                <div className={styles.des_p}>
                                    Gọi đa thiết bị (IP/Soft/App)
                                </div>
                                <div className={styles.des_p}>
                                    Phiếu Ghi (Ticket)
                                </div>
                                <div className={styles.des_p}>
                                    Quản lý khách hàng / Nhân viên
                                </div>
                                <div className={styles.des_p}>
                                    Marketing – Chiến dịch
                                </div>
                                <div className={styles.des_p}>
                                    Tích hợp mọi nền tảng khác
                                </div>
                                <div className={styles.line}>
                                    <span>Đa Kênh (Facebook, Zalo OA)</span>
                                </div>
                                <div className={styles.line}>
                                    <span>Livetalk (Audio / Video Call)</span>
                                </div>
                                <div className={styles.des_p}>
                                    <span>Voice AI</span>
                                </div>
                            </div>
                            <Link href="#OMNI-CHANEL-AI">
                                <div className={styles.detail}>
                                    Xem chi tiết tính năng
                                </div>
                            </Link>
                            <div
                                className={styles.btn2}
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    window.location.href =
                                        "https://hungha365.com/dang-ky-cong-ty.html";
                                }}
                            >
                                <span>Dùng Thử Miễn Phí</span>
                                <Icon />
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardWrapper}>
                        <div className={styles.card3}>
                            <div className={styles.card_title3}>
                                <h3>Gói OMNI CHANNEL AI</h3>
                            </div>
                            <div className={styles.price}>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {" "}
                                    <div className={styles.dvt}>đ</div>
                                    <span>170.000</span>
                                </div>
                                <div>
                                    <p>User / tháng</p>
                                </div>
                            </div>
                            <div className={styles.des}>
                                <div className={styles.des_p}>
                                    Thanh toán gói:<span> 6 tháng</span>
                                </div>
                                <div className={styles.des_p}>
                                    Dung lượng lưu trữ:<span> 4Gb/User</span>
                                </div>
                                <div className={styles.des_p}>
                                    Gọi đa thiết bị (IP/Soft/App)
                                </div>
                                <div className={styles.des_p}>
                                    Phiếu Ghi (Ticket)
                                </div>
                                <div className={styles.des_p}>
                                    Quản lý khách hàng / Nhân viên
                                </div>
                                <div className={styles.des_p}>
                                    Marketing – Chiến dịch
                                </div>
                                <div className={styles.des_p}>
                                    Tích hợp mọi nền tảng khác
                                </div>
                                <div className={styles.des_p}>
                                    Đa Kênh (Facebook, Zalo OA)
                                </div>
                                <div className={styles.des_p}>
                                    Livetalk (Audio / Video Call)
                                </div>
                                <div className={styles.des_p}>
                                    <span>Voice AI</span>
                                </div>
                            </div>
                            <Link href="#OMNI-CHANEL-AI">
                                <div className={styles.detail}>
                                    Xem chi tiết tính năng
                                </div>
                            </Link>
                            <div
                                className={styles.btn3}
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    window.location.href =
                                        "https://hungha365.com/dang-ky-cong-ty.html";
                                }}
                            >
                                <span>Dùng Thử Miễn Phí </span>
                                <Icon />
                            </div>
                        </div>
                    </div>
                </Carousel>
                <div className={styles.rightButton} onClick={handleNext}>
                    {" "}
                    <RightOutlined rev={"xxx"} />
                </div>
            </div>
        </div>
    );
};
export default BangGiaTongDai;
