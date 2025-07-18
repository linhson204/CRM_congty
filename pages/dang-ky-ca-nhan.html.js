import { React, useState } from "react"
import Seo from "../components/head";
import { useForm } from 'react-hook-form';
import { CheckLogin, validatePhone } from "../utils/function"
import { registerPersonal } from "../utils/handleApi";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function RegisterPersonal() {
    CheckLogin()

    // validate and submit
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        let text = '';
        if (query && query.urlRedeict) {
            text = '?url=' + query.url + '&urlRedeict' + query.urlRedeict
        }
        delete data.res_password;

        const response = await registerPersonal(data, text)
        if (response) {
            //Kiểm tra nguồn đăng nhập từ site khác
            if (urlRedeict != '') {
                const urlSite = query.url ? query.url + '?account=' + data.phoneTK + '&password=' + data.password + '&type=' + 0 : '';
                setUrl(urlSite)
            }
        }
    };

    return (
        <>
            <Seo
                seo='true'
                title='Tích cực chuyển đổi số, quanlychung.timviec365.vn giúp bạn đổi đời, phát triển'
                des='Thời đại công nghệ số đòi hỏi mỗi cá nhân phải tân tiến và tự mình “chuyển đổi số” để thành công. Cùng timviec365.vn chuyển đổi số, tận dụng nhiều phần mềm cần thiết.'
                url='https://quanlychung.timviec365.vn/dang-ky-ca-nhan.html'
            />
            <Header></Header>
            <div className="register_ctnv" id="register_cty">
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="container">
                            <div className="ctn_qmk">
                                <form action="" className="register_form" autoComplete="false" onSubmit={handleSubmit(onSubmit)} >
                                    <div className="one_page_qmk one_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                        <div className="header_qmk">
                                            <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                                Đăng ký tài khoản cá nhân trên nền tảng chuyển đổi số lớn nhất
                                            </h1>
                                        </div>
                                        <div className="ctn_form share_distance">
                                            <div className="form-group" >
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tài khoản đăng nhập<span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phoneTK"
                                                    id="email_nv"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    {...register("phoneTK", {
                                                        required: 'Vui lòng nhập số điện thoại',
                                                        validate: {
                                                            validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                        }
                                                    })}
                                                />
                                                {errors.phoneTK && <label className="error">{errors.phoneTK.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tên người dùng <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    className="form-control"
                                                    placeholder="Nhập tên người dùng"
                                                    {...register("userName", {
                                                        required: 'Họ và tên không được để trống',
                                                    })}
                                                />
                                                {errors.userName && <label className="error">{errors.userName.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Nhập mật khẩu"
                                                    {...register('password', {
                                                        required: 'Vui lòng nhập mật khẩu',
                                                        pattern: {
                                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                            message:
                                                                'Mật khẩu phải gồm 6 ký tự trở lên, bao gồm ít nhất một chữ cái và ít nhất một chữ số, không chứa khoảng trắng.',
                                                        },
                                                    })}
                                                />
                                                {errors && errors.password && <label className="error">{errors.password.message}</label>}

                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập lại mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="res_password"
                                                    className="form-control"
                                                    placeholder="Nhập lại mật khẩu"
                                                    {...register('res_password', {
                                                        required: 'Vui lòng nhập mật khẩu xác nhận',
                                                        validate: (value) => {
                                                            const password = watch('password');
                                                            return value === password || 'Mật khẩu không khớp';
                                                        },
                                                    })}
                                                />
                                                {errors && errors.res_password && <label className="error">{errors.res_password.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={e => { setPhoneNumber(e.currentTarget.value); }}
                                                    {...register('phone', {
                                                        validate: {
                                                            validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                        }
                                                    })}
                                                />
                                                {errors && errors.phone && <label className="error">{errors.phone.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Địa chỉ <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Nhập địa chỉ"
                                                    {...register('address', {
                                                        required: 'Địa chỉ không được để trống'
                                                    })}
                                                />
                                                {errors && errors.address && <label className="error">{errors.address.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-butt-one">
                                            <button
                                                type="submit"
                                                className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                            >
                                                Tiếp tục
                                            </button>
                                            <p className="bo_qua tex_center">
                                                <a
                                                    href="/lua-chon-dang-ky.html"
                                                    className="share_fsize_three share_clr_one"
                                                >
                                                    Quay lại
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer></Footer>
        </>
    )
};