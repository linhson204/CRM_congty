import React from 'react'
import Seo from '../components/head'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { checkVip } from '../utils/handleApi'
import { checkIP, CheckLogin } from '../utils/function'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }

export default function RegisterEp() {
  const router = new useRouter()

  CheckLogin()

  // Xử lý validate form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    checkVip(data.id_company)
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && Cookies.get('token_base365')) {
      const getData = async () => {
        try {
          let response = await infoEp()
          if (response.data.authentic == 1) {
            router.push('/')
          }
        } catch (error) {
          console.log('Error:', error)
        }
      }

      getData()
    }
  }, [])
  return (
    <>
      <Seo
        seo='true'
        title='Tham gia hệ thống chuyển đổi số số 1 Việt Nam, tối giản và tiện ích'
        des='Tham gia hệ sinh thái chuyển đổi số tân tiến số 1 của quanlychung.timviec365.vn, nhân viên sẽ có cơ hội tận hưởng những phần mềm tiện ích nhất. Đăng ký tài khoản ngay'
        url='https://quanlychung.timviec365.vn/dang-ky-nhan-vien.html'
      />
      <Header />
      <div className='register_ctnv' id='register_cty'>
        <div className='content_ql ctn_bgr_body'>
          <div className='content_nv'>
            <div className='ctn_register_nv'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='regnv_form regnv_form_id'
                autoComplete='off'>
                <div className='one_page_qmk'>
                  <div className='container'>
                    <div className='ctn_qmk'>
                      <div className='tow_reg_ql share_reg_log share_brd_radius share_bgr_tow ctn_register_nv'>
                        <div className='header_qmk'>
                          <h1 className='share_clr_four cr_weight_bold tex_center qlc_tieude_moi'>
                            Trải nghiệm điều tuyệt vời tại nền tảng chuyển đổi
                            số lớn nhất hiện nay
                          </h1>
                        </div>
                        <div className='ctn_form share_distance'>
                          <div className='form-group'>
                            <label className='form_label share_fsize_three share_clr_one cr_weight'>
                              Vui lòng nhập ID Công Ty{' '}
                              <span className='cr_red'>*</span>
                            </label>
                            <input
                              type='text'
                              name='id_company'
                              className='form-control'
                              id='name_id'
                              placeholder='Nhập ID công ty của bạn'
                              {...register('id_company', {
                                required: true,
                                pattern: {
                                  value: /^\d+$/,
                                  message: 'This input is number only.',
                                },
                              })}
                            />
                            {errors && errors.id_company && (
                              <label className='error'>
                                Vui lòng nhập ID công ty
                              </label>
                            )}
                          </div>
                          <div className='form-butt-one'>
                            <button
                              type='submit'
                              className='share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one'>
                              Tiếp tục
                            </button>
                            <p className='bo_qua tex_center'>
                              <a
                                href='/lua-chon-dang-ky.html'
                                className='share_fsize_three share_clr_one'>
                                Quay lại
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <link
        rel='stylesheet'
        href='https://timviec365.vn/css/footer_new.css?v=2'
      />
      <Footer />
    </>
  )
}
