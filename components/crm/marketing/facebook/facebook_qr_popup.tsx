import styles from "./marketing.module.css";
import { useForm } from 'react-hook-form'
import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal, Spin } from "antd";
import Link from "next/link";
import { useDispatch, useSelector} from "react-redux";
import { addUser, changeMess } from "../../redux/userFacebook/userSlice";
import Cookies from "js-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { message } from "antd";


const FacebookPopup = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
} = useForm();
const dispatch = useDispatch();
const [messageApi, contextHolder] = message.useMessage();
const userFacebook = useSelector((state: any) => state.userFacebook.user);
const changeUser = useSelector((state: any) => state.userFacebook.isChange)
const [ isFetching, setIsFetching ] = useState<Boolean>(false);

const token:any = Cookies.get("token_base365")
const dataDecoded:any = token && jwtDecode(token)



const info = () => {
  messageApi.info('Đăng nhập thành công');
};

const onSubmit = async (data: any) => {
  try {
    setIsFetching(true)
  const json = {
    "username": data.email.trim(),
    "password": data.password.trim(),
    idChat : dataDecoded?.data?._id
  }
  const response = await fetch("/crm/api/facebook", {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json()).then((data) => data);
  console.log('response.data login facebook', response.data);
  if(response.data) {
    Cookies.set('id_user_login_facebook', response.id_user_login);
    Cookies.set('name_user_facebook', response.name_login);
    Cookies.set('require_pin', response.require_pin);
    Cookies.set('url_img_login', response.url_img_login);
    setOpen(false)
    setValue('email', ''),
    setValue('password', '');
    let isHaveUserFacebook = false;
    if(userFacebook?.length > 0) {
      await userFacebook.map((user: any) => {
        if(user?.id_user_login == response.data.id_user_login) {
          isHaveUserFacebook = true;
        }
      })
    } 
    if(!isHaveUserFacebook) {
      dispatch(changeMess(!changeUser))
      dispatch(addUser({
        ...response.data,
        password: data.password.trim(),
        isDoing: true,
        note: ''
      }))
    }
   
  } else{
    alert('Đăng nhập thất bại, vui lòng thử lại.')
  }
  setIsFetching(false)
  } catch (error) {
    alert(error)
  }
}
  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
      footer={null}
    >
      <div className={styles.facebookPopupOverlay}>
        <div className={styles.facebookPopupContent}>
          <h2 className={styles.facebookPopupTitle}>ĐĂNG NHẬP FACEBOOK</h2>
          <form
                className={styles.formFacebook}
                onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formInput}>
                    <label className={styles.formInputTitle}>
                        Tài khoản đăng nhập <span className={styles.note}>*</span>
                    </label>
                    <input
                        type='text'
                        className={styles.formInputChange}
                        id='dn_mail'
                        name='email'
                        placeholder='Nhập email hoặc số điện thoại'
                        {...register('email', {
                            required: 'Tài khoản đăng nhập không được để trống',
                            // pattern: {
                            //     value:
                            //     /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/,
                            //     message: 'Nhập đúng định dạng email hoặc số điện thoại',
                            // },
                        })}
                    />
                    {errors.usename && (
                        // <label className='error'>{errors.usename.message}</label>
                        <p>Vui lòng nhập Email</p>
                    )}
                </div>
                <div className={styles.formInput}>
                    <label className={styles.formInputTitle}>
                        Mật khẩu <span className='cr_red'>*</span>
                    </label>
                    <input
                        type='password'
                        className={styles.formInputChange}
                        name='password'
                        id='pass_field'
                        placeholder='Nhập mật khẩu'
                        {...register('password', {
                            required: 'Mật khẩu không được để trống',
                        })}
                    />
                    {errors && errors.password && (
                        <p>Vui lòng nhập mật khẩu</p>
                    )}
                </div>
                <div className={styles.formForgotPass}>
                    <p >
                        <a
                            href={``}
                            >
                            Quên mật khẩu?
                        </a>
                    </p>
                </div>
                <div className={styles.formBtnSubmit}>
                  {
                    !isFetching ? <input
                    type='submit'
                    value='Đăng nhập'
                /> : <Spin/>
                  }
                    
                </div>
                <p className={styles.formSuggets}>
                    Bạn chưa có tài khoản? <Link href={``}>Đăng ký ngay</Link>
                </p>
            </form>
        </div>
      </div>
      <Button type="primary" onClick={info} style={{
        visibility: 'hidden'
      }}>
      </Button>
    </Modal>
  );
};
export default FacebookPopup;