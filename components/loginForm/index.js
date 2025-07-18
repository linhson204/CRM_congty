import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { login } from '../../utils/handleApi'
import CheckTypeLogin from '../checkLogin'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function LoginForm({ setNotiError, typeLogin, showTab, query }) {
    const [getUrl, setUrl] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [typeLoginComponent, setTypeLogincomponent] = useState()
    const [result, setResult] = useState()
    const [showPopup, setShowPopup] = useState(false)
    const [getAuth, setAuth] = useState('')
    const router = new useRouter()
    const onSubmit = async (data) => {
        const urlRedeict = query.urlRedeict ? query.urlRedeict : '';
        data.type = typeLogin

        let result = await login(data, 0)

        if (result?.result == true) {
            let acc_token = result.data.access_token
            let refresh_token = result.data.refresh_token
            let role = result.data.type
            Cookies.set('rf_token', refresh_token)
            Cookies.set('token_base365', acc_token)
            Cookies.set('role', role)
            const type = result.data.type
            if (urlRedeict != '') {
                if (result.data.authentic == 1) {
                    window.location.href = urlRedeict ? urlRedeict : '';
                } else {
                    const text = '?urlRedeict=' + urlRedeict;
                    const href = type == 1 ? '/xac-thuc-ma-otp-cong-ty.html' : '/xac-thuc-ma-otp-ca-nhan.html';
                    window.location.assign(href + text)
                }
            } else {

                if (type == typeLogin) {

                    if (type == 1) {
                        setAuth(result.data.authentic)
                        if (result.data.authentic == 0) {
                            router.push('/xac-thuc-ma-otp-cong-ty.html')
                        } else {
                            window.location.href = '/'
                        }
                    } else if (type == 2) {
                        setAuth(result.data.authentic)
                        if (result.data.authentic == 0) {
                            router.push('/xac-thuc-ma-otp-nhan-vien.html')
                        } else {
                            window.location.href = '/'
                        }
                    } else {
                        setAuth(result.data.authentic)
                        if (result.data.authentic == 0) {
                            router.push('/xac-thuc-ma-otp-ca-nhan.html')
                        } else {
                            window.location.href = '/quan-ly-ung-dung-ca-nhan.html'
                        }
                    }
                } else {
                    setTypeLogincomponent(type)
                    setResult(result)
                    setShowPopup(true)
                }
            }
        } else {
            setNotiError(true)
        }

        //Kiểm tra nguồn đăng nhập từ site khác
        if (urlRedeict != '') {
            const urlSite = query.url ? query.url + '?account=' + data.account + '&password=' + data.password + '&type=' + data.type : '';
            setUrl(urlSite)
        }
    }

    let linkLogout = ''
    let linkForgetPW = ''
    if (typeLogin == '2') {
        linkLogout = '/dang-ky-nhan-vien.html'
        linkForgetPW = '/quen-mat-khau.html?type=2'
    } else if (typeLogin == '1') {
        linkLogout = '/dang-ky-cong-ty.html'
        linkForgetPW = '/quen-mat-khau.html?type=1'
    } else {
        linkLogout = '/dang-ky-ca-nhan.html'
        linkForgetPW = '/quen-mat-khau.html?type=0'
    }

    return (
        <>
            <form
                className={`share_distance form_vali form_login_staff form_tk ${showTab === true ? 'hidden' : ''
                    }`}
                onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label className='form_label share_fsize_three share_clr_one cr_weight'>
                        Tài khoản đăng nhập <span className='cr_red'>*</span>
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='dn_mail'
                        name='account'
                        placeholder='Nhập email hoặc số điện thoại'
                        {...register('account', {
                            required: 'Tài khoản đăng nhập không được để trống',
                            pattern: {
                                value:
                                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
                                message: 'Nhập đúng định dạng email hoặc số điện thoại',
                            },
                        })}
                    />
                    {errors.account && (
                        <label className='error'>{errors.account.message}</label>
                    )}
                </div>
                <div className='form-group'>
                    <label className='form_label share_fsize_three share_clr_one cr_weight'>
                        Mật khẩu <span className='cr_red'>*</span>
                    </label>
                    <input
                        type='password'
                        className='form-control'
                        name='password'
                        id='pass_field'
                        placeholder='Nhập mật khẩu'
                        {...register('password', {
                            required: 'Mật khẩu không được để trống',
                        })}
                    />
                    {errors && errors.password && (
                        <label className='error'>{errors.password.message}</label>
                    )}
                </div>
                <div className='qmk_login'>
                    <p className='tex_right'>
                        <a
                            href={linkForgetPW}
                            className='share_clr_four share_fsize_three cr_weight'>
                            Quên mật khẩu?
                        </a>
                    </p>
                </div>
                <div className='form_button'>
                    <input
                        type='submit'
                        className='share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor btn_luu'
                        value='Đăng nhập'
                    />
                </div>
                <p className='tex_center cr_weight share_fsize_three no_login'>
                    Bạn chưa có tài khoản? <Link href={linkLogout}>Đăng ký ngay</Link>
                </p>
            </form>
            {showPopup && (
                <CheckTypeLogin
                    result={result}
                    setShowPopup={setShowPopup}
                    typeLoginComponent={typeLoginComponent}
                    setNotiError={setNotiError}
                />
            )}

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
