import { useRouter } from "next/router";
import React, { useState } from "react"
import Footer from "../components/footer/Footer";
import Seo from "../components/head";
import Header from "../components/header/Header";
import LoginForm from "../components/loginForm"
import LoginQr from "../components/loginQr"
import QrGuild from "../components/qrGuild"
import { CheckLogin } from "../utils/function";
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }

export default function LoginPersonal({ query }) {

    CheckLogin()
    // handle interaction
    const [showTab, setShowTab] = useState(true);
    const [active, setActive] = useState('login_qr')
    const [qrGuild, setQrGuild] = useState(false)
    const [notiError, setNotiError] = useState(false)

    const loginByForm = () => {
        setShowTab(false);
        setActive('login_form');
    };

    const loginByQr = () => {
        setShowTab(true);
        setActive('login_qr');
    };

    const qrGuildShow = () => {
        setQrGuild(true);
    }

    const qrGuildHide = () => {
        setQrGuild(false);
    }

    return (
        <>
            <Seo
                seo='true'
                title='Thành công trong tầm với, chuyển đổi số cùng quanlychung.timviec365.vn ngay'
                des='Cơ hội phát triển bản thân cực lớn nằm ngay trong hệ sinh thái chuyển đổi số của timviec365.vn. Truy cập, trải nghiệm để vạch ra kế hoạch chuyển đổi số hiệu quả nhé.'
                url='https://quanlychung.timviec365.vn/dang-nhap-ca-nhan.html'
            />
            <Header></Header>
            <div className="content_ql">
                <div className="ctn_content">
                    <div className="left_bgr_nv">
                        <div className="bgr_img_nv">
                            <picture>
                                <img src="../img/bgr_nua.png" alt="" />
                            </picture>
                        </div>
                    </div>
                    <div className="right_bgr_nv">
                        <div className="tro_lai">
                            <a
                                href="/lua-chon-dang-nhap.html"
                                className="share_fsize_one share_clr_four"
                            >
                                Quay lại
                            </a>
                        </div>
                        <div className="form_dangnhap">
                            <div className="ctn_dangnhap">
                                <div className="cont_dangnhap">
                                    <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                        Đăng nhập nền tảng chuyển đổi số chất lượng, bắt trọn cơ hội
                                        phát triển
                                    </h1>
                                    <p className={`error_lg tex_center share_fsize_three ${(notiError == false) ? 'hidden' : ''}`}>
                                        Thông tin tài khoản hoặc mật khẩu không chính xác
                                    </p>
                                    <div className="box_select_type">
                                        <button className={`select_login lg_qr ${(active == 'login_qr') ? 'active' : ''}`} onClick={loginByQr}>
                                            QUÉT MÃ QR
                                        </button>
                                        <div className="line" />
                                        <button className={`select_login login_tk ${(active == 'login_form') ? 'active' : ''}`} onClick={loginByForm}>
                                            TÀI KHOẢN<span className="text">(email/số điện thoại)</span>
                                        </button>
                                    </div>
                                    {<LoginForm setNotiError={setNotiError} typeLogin='0' showTab={showTab} query={query} />}
                                    {<LoginQr qrGuildShow={qrGuildShow} setNotiError={setNotiError} typeLogin='0' showTab={showTab} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(qrGuild) && <QrGuild qrGuildHide={qrGuildHide} />}
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer></Footer>
        </>)
}