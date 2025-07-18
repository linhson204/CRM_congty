import { useRouter } from "next/router";
import { React, useState } from "react"
import { useForm } from 'react-hook-form';
import Footer from "../components/footer/Footer";
import Seo from "../components/head";
import Header from "../components/header/Header";
import { validatePhone, CheckLogin, checkIP } from "../utils/function";
import { registerCom } from "../utils/handleApi";
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }

export default function info_register_emp({ query }) {

    CheckLogin()

    // xử lý validate
    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm();
    const [getUrl, setUrl] = useState('');
    const onSubmit = async (data) => {
        console.log('query:', query)
        let text = '';
        if (query && query.urlRedeict) {
            text = '?url=' + query.url + '&urlRedeict' + query.urlRedeict
        }

        if (data.password !== data.res_password) {
            errors.res_password = true;
            return;
        };
        delete data.res_password;
        const response = await registerCom(data, '', text);
        if (response) {
            //Kiểm tra nguồn đăng nhập từ site khác
            if (urlRedeict != '') {
                const urlSite = query.url ? query.url + '?account=' + data.phoneTK + '&password=' + data.password + '&type=' + 1 : '';
                setUrl(urlSite)
            }
        }
    };

    // hide pass
    const [hidePass, setHidePass] = useState(true)
    const [hidePass2, setHidePass2] = useState(true)

    const showPass = () => {
        if (hidePass == true) {
            setHidePass(false)
        } else {
            setHidePass(true)
        }
    }

    const showPass2 = () => {
        if (hidePass2 == true) {
            setHidePass2(false)
        } else {
            setHidePass2(true)
        }
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = getValues();

        const isValid = await handleSubmit(onSubmit)();
        if (data.password !== data.res_password) return;
        if (!isValid) {
            // Xử lý logic khi form không hợp lệ
            const data = getValues();
            if (data.phoneTK != '') {
                registerCom(data, false);
            }
        }
    };
    return (
        <>
            <Seo
                seo='true'
                title='Hệ thống chuyển đổi số hàng đầu Việt Nam, đăng ký để trải nghiệm'
                des='Khám phá một hệ sinh thái chuyển đổi số lớn, tích hợp nhiều tiện ích trong một nền tảng giúp công ty quản trị nguồn nhân lực hiệu quả, tối ưu và tiết kiệm.'
                url='https://quanlychung.timviec365.vn/dang-ky-cong-ty.html'
            />
            <Header></Header>
            <div className="register_ctnv" id="register_cty">
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="container">
                            <div className="ctn_qmk">
                                <form onSubmit={handleFormSubmit} className="register_form">
                                    <div className="one_page_qmk one_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                        <div className="header_qmk">
                                            <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                                Đăng ký tài khoản công ty, chuyển đổi số nhanh, tiện ích lớn
                                            </h1>
                                            <div className="qmk_avt_ic tex_center">
                                                <img src="../img/one_ic_register.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="ctn_form share_distance">
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tài khoản đăng nhập <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phoneTK"
                                                    id="phoneTK"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    {...register("phoneTK", {
                                                        required: 'Vui lòng nhập số điện thoại',
                                                        validate: {
                                                            validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                        }
                                                    })}
                                                />
                                                {errors && errors.phoneTK && <label className="error">{errors.phoneTK.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tên công ty <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    className="form-control"
                                                    placeholder="Nhập tên công ty của bạn"
                                                    {...register("userName", {
                                                        required: 'Tên công ty không được để trống',
                                                    })}
                                                />
                                                {errors && errors.userName && <label className="error">{errors.userName.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    name="emailContact"
                                                    className="form-control"
                                                    placeholder="Nhập số email"
                                                    {...register('emailContact', {
                                                        pattern: {
                                                            value: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)*[a-zA-Z]{2,}$/,
                                                            message:
                                                                'Nhập đúng định dạng email',
                                                        }
                                                    })}
                                                />
                                                {errors && errors.emailContact && <label className="error">{errors.emailContact.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <span className={`see_log ${hidePass ? '' : 'no_see_log'}`} toggle="#password-field-three" onClick={showPass} />
                                                <input
                                                    type={hidePass ? 'password' : 'text'}
                                                    name="password"
                                                    className="form-control"
                                                    id="password-field-three"
                                                    placeholder="Nhập mật khẩu"
                                                    {...register('password', {
                                                        required: 'Vui lòng nhập mật khẩu',
                                                        pattern: {
                                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                            message:
                                                                'Mật khẩu phải gồm 6 ký tự trở lên, bao gồm ít nhất một chữ cái và ít nhất một chữ số, không chứa khoảng trắng.',
                                                        }
                                                    })}
                                                />
                                                {errors && errors.password && <label className="error">{errors.password.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập lại mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <span className={`see_log ${hidePass2 ? '' : 'no_see_log'}`} toggle="#password-field-four" onClick={showPass2} />
                                                <input
                                                    type={hidePass2 ? 'password' : 'text'}
                                                    name="res_password"
                                                    className="form-control"
                                                    id="password-field-four"
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
                                                    Địa chỉ <span className="cr_red">*</span>
                                                </label>
                                                <input type="text" name="address" className="form-control"
                                                    placeholder="Nhập địa chỉ"
                                                    {...register("address", {
                                                        required: 'Địa chỉ không được để trống',
                                                    })}
                                                />
                                                {errors && errors.address && <label className="error">{errors.address.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-butt-one">
                                            <input
                                                type="submit"
                                                className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                                value="Tiếp tục"
                                            />
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
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer></Footer>
            {
                getUrl != '' ? (
                    <>
                        <iframe
                            src={getUrl}
                            width="100%"
                            height="100%"
                            style={{ display: 'none' }}
                        />
                    </>
                ) : ''
            }
        </>
    )
}
