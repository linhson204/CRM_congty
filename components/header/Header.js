import { React, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Cookies = require('js-cookie')
import styles from './Header.module.css'

import { infoCom, infoEp, infoPersonal } from '../../utils/handleApi'
import { Button } from 'antd'
import ModalRegsiter from '../modal/ModalRegsiter'
import ModalLogin from '../modal/ModalLogin'
import ModalConfirm from '../modal/ModalConfirm'

export default function Header() {
  // get pathname url
  const router = useRouter()
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [openModalLogin, setOpenModalLogin] = useState(false)

  const [popup, setPopup] = useState(false)
  const showPopup = () => {
    if (popup) {
      setPopup(false)
    } else {
      setPopup(true)
    }
  }

  const [showLogout, setShowLogout] = useState(false)

  const show = () => {
    setShowLogout(true)
  }

  const no = () => {
    setShowLogout(false)
  }

  const yes = () => {
    document.cookie =
      'token_base365' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie =
      'rf_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie =
      'role' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/'
  }

  const [showSideBar, setShowSideBar] = useState(false)
  const handleSideBar = () => {
    if (showSideBar === false) {
      setShowSideBar(true)
    } else {
      setShowSideBar(false)
    }
  }
  const type = () => {
    return Cookies.get('role')
  }

  const [data, setData] = useState([])
  const [renderContent, setRenderContent] = useState(false)

  const [getLinkHome, setLinkHome] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined' && Cookies.get('token_base365')) {
      const getData = async () => {
        try {
          if (type() === '2') {
            let response = await infoEp()
            Cookies.set('phone', response.data.phoneTK)
            setData(response.data)

            if (response.data.authentic == 0) {
              setLinkHome('/')
            } else {
              setLinkHome('/')
            }
          } else if (type() === '1') {
            let response = await infoCom()
            Cookies.set('phone', response.data.phoneTK)
            setData(response.data)

            if (response.data.authentic == 0) {
              setLinkHome(router.pathname)
            } else {
              setLinkHome('/')
            }
          } else {
            let response = await infoPersonal()
            Cookies.set('phone', response.data.ep_phone_tk)
            setData(response.data)
            if (response.data.ep_authentic == 0) {
              setLinkHome(router.pathname)
            } else {
              setLinkHome('/quan-ly-ung-dung-ca-nhan.html')
            }
          }
        } catch (error) {
          console.log('Error:', error)
        }
      }

      getData()
      setRenderContent(true)
    }
  }, [])
  return (
    <>
      <div className={styles.header_ql} style={{ background: '#4c5bd4' }}>
        <div className={styles.cnt_header}>
          <div className={styles.bg_wra}>
            <div className={styles.bg_ima_menu} onClick={handleSideBar}>
              <p className={`${styles.menu_popup} ${styles.btx_modal_ind}`}>
                <img src='/img/menu.png' alt='menu' />
              </p>
            </div>
            <div className={styles.bg_ima}>
              <a href='/'>
                <img src='/img/logo_h.svg' alt='logo công ty' />
              </a>
            </div>
            <div className={styles.header_nav}>
              <div className={styles.nav}>
                <ul>
                  <li>
                    <Link
                      href={getLinkHome}
                      className={`cr_weight_bold share_fsize_tow share_clr_tow  ${
                        router.pathname === '/' ? 'active' : ''
                      }`}>
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'/san-pham.html'}
                      className={`cr_weight_bold share_fsize_tow share_clr_tow ${
                        router.pathname === '/san-pham.html' ? 'active' : ''
                      }`}>
                      Hướng dẫn
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href={'/he-sinh-thai.html'}
                      className={`cr_weight_bold share_fsize_tow share_clr_tow ${
                        router.pathname === '/he-sinh-thai.html' ? 'active' : ''
                      }`}>
                      Hệ sinh thái
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      href='https://dev.timviec365.vn/blog'
                      className='cr_weight_bold share_fsize_tow share_clr_tow'>
                      Tin tức
                    </Link>
                  </li>
                </ul>
                {renderContent ? (
                  <>
                    <div className={styles.hd_log}>
                      <div className={styles.bg_log_aff} data='97602'>
                        <div className={styles.bg_log_img} onClick={showPopup}>
                          <img
                            src={
                              data.avatarUser
                                ? data.avatarUser
                                : `../img/add.png`
                            }
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/img/logo_com.png'
                            }}
                          />
                        </div>
                        <div
                          className={styles.bg_logout}
                          style={{
                            display: popup
                              ? renderContent
                                ? 'block'
                                : 'none'
                              : 'none',
                          }}>
                          <div className={styles.chd_content}>
                            <p className={styles.chuyen_doi}>
                              <a href={getLinkHome}>Chuyển đổi số 365</a>
                            </p>
                            <p
                              className={`${styles.dang_xuat} ${styles.btx_logout}`}
                              onClick={show}>
                              <a>Đăng xuất</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* <div className={styles.hd_log}>
                      <div className={styles.bg_log}>
                        <p style={{ color: '#fff' }}>
                          <Link
                            href={'lua-chon-dang-ky.html/'}
                            className='cr_weight_bold share_fsize_tow share_clr_tow'>
                            Đăng ký{' '}
                          </Link>
                          /
                          <Link
                            href={'/lua-chon-dang-nhap.html'}
                            className='cr_weight_bold share_fsize_tow share_clr_tow'>
                            {' '}
                            Đăng nhập
                          </Link>
                        </p>
                      </div>
                    </div> */}
                    <div className={styles.hd_log}>
                      <Button
                        className={'btnU'}
                        style={{
                          backgroundColor: '#FFAF52',
                          marginRight: '10px',
                        }}
                        onClick={() => setOpenModalLogin(true)}>
                        <p style={{ color: '#fff' }}>Đăng nhập</p>
                      </Button>
                      <Button
                        className={'btnU'}
                        onClick={() => setOpenModalRegister(true)}>
                        <p style={{ color: '#4C5BD4' }}>Đăng ký</p>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {router.pathname === '/' && (
            <>
              <div className={styles.butt_header}>
                <div className={styles.ctn_butth}>
                  <div className={styles.bgr_header}>
                    <picture>
                      <img src='../img/bgr_banner.png' alt='' />
                    </picture>
                  </div>
                  <div className={styles.bgr_froh}>
                    <div className={styles.fonh_one}>
                      <h1
                        className={`${styles.share_clr_tow} ${styles.cr_weight_bold}`}>
                        Chuyển đổi số 365
                      </h1>
                      <p className={styles.share_clr_tow}>
                        Giải pháp chuyển đổi số được tin dùng bởi +10.000 doanh
                        nghiệp hàng đầu. Chuyển đổi số 365 mang thành công đột
                        phá đến doanh nghiệp.
                      </p>
                    </div>
                    <div className={styles.show_hide}>
                      <div className={styles.name_title_dl}>
                        Tải App Chuyển đổi số 365 cho PC
                      </div>
                      <div>
                        <div className={styles.button_header}>
                          <a
                            rel='nofollow'
                            style={{ marginRight: 24 }}
                            href='https://app.timviec365.vn/Download/AppElectron/Quanlychung1.0.8.exe'>
                            <img src='../img/window.png' alt='' />
                          </a>
                          <a
                            rel='nofollow'
                            href='https://hungha365.com/upload_file/Quanlychung-1.0.2.dmg'>
                            <img src='../img/mac.png' alt='' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={styles.bg_logout}
        style={{
          display: popup ? (renderContent ? 'none' : 'block') : 'none',
        }}>
        <div className={styles.chd_content}>
          <p className={styles.chuyen_doi}>
            <a href='/'>Chuyển đổi số 365</a>
          </p>
          <p
            className={`${styles.dang_xuat} ${styles.btx_logout}`}
            onClick={show}>
            <a>Đăng xuất</a>
          </p>
        </div>
      </div>
      <div
        className={`${styles.modal_share} ${styles.modal_share_four} ${styles.logout_ht}`}
        style={{ display: showLogout ? 'block' : 'none' }}>
        <div className={styles['modal-content']}>
          <div className={styles.info_modal}>
            <div className={styles['modal-header']}>
              <div className={styles.header_ctn_share}>
                <h4
                  className={`${styles.ctn_share_h} ${styles.share_clr_tow} ${styles.tex_center} ${styles.cr_weight_bold}`}>
                  Đăng xuất
                </h4>
              </div>
            </div>
            <div className={styles['modal-body']}>
              <div className={styles.ctn_body_modal}>
                <div className={styles.madal_form}>
                  <div
                    className={`${styles.edit_share_form} ${styles.share_distance_big} ${styles.logout_ht_form}`}>
                    <div className={styles.titl_dele_nv}>
                      <p
                        className={`${styles.share_fsize_tow} ${styles.share_clr_one} ${styles.tex_center} ${styles.log_tlt}`}>
                        Bạn có muốn đăng xuất ra khỏi hệ thống?
                      </p>
                    </div>
                    <div className={styles.form_butt_ht}>
                      <div className={styles.tow_butt_flex}>
                        <button
                          type='button'
                          className={`${styles.share_fsize_three} ${styles.cr_weight} ${styles.share_cursor} ${styles.share_clr_four} ${styles.share_bgr_tow} ${styles.huy_button}`}
                          onClick={no}>
                          Hủy
                        </button>
                        <button
                          type='button'
                          style={{ color: '#000' }}
                          className={`${styles.share_clr_tow} ${styles.cr_weight} ${styles.share_cursor} ${styles.share_fsize_three}${styles.share_bgr_one} ${styles.dongy_button} ${styles.logout_all} `}
                          onClick={yes}>
                          Đồng ý
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.modal_ind} ${styles.share_res_header}`}
        style={{ display: showSideBar ? 'block' : 'none' }}
        onClick={handleSideBar}>
        <div className={styles['modal-content']}>
          <div className={`${styles.ctn_ind} ${styles.share_bgr_one}`}>
            <div className={styles['modal-body']}>
              {renderContent ? (
                <>
                  <div className={styles.ind_one}>
                    <div
                      className={`${styles.avt_log_ind} ${styles.share_clr_tow} ${styles.share_fsize_tow} ${styles.cr_weight_bold}`}>
                      <img
                        src={
                          data.avatarUser ? data.avatarUser : `../img/add.png`
                        }
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/img/logo_com.png'
                        }}
                      />
                      {data.userName}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className={styles['ind-tow']}>
                <div className={styles.ctn_ulli}>
                  <ul className={styles['navbar-nav']}>
                    <a href={getLinkHome} className={styles['nav-item']}>
                      <li
                        className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                        <span className={styles.item_ic}>
                          <img src='../img/home_ind.png' alt='' />
                        </span>
                        <p style={{ color: '#fff' }}>Trang chủ</p>
                      </li>
                    </a>
                    <a href='/san-pham.html' className={styles['nav-item']}>
                      <li
                        className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                        <span className={styles.item_ic}>
                          <img src='../img/ung-dung.png' alt='' />
                        </span>
                        <p style={{ color: '#fff' }}>Sản phẩm</p>
                      </li>
                    </a>
                    <a href='/he-sinh-thai.html' className={styles['nav-item']}>
                      <li
                        style={{ display: 'flex', alignItems: 'center' }}
                        className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                        <span className={styles.item_ic}>
                          <img src='../img/he_sinhthai.png' alt='' />
                        </span>
                        <p style={{ color: '#fff' }}>Hệ sinh thái</p>
                      </li>
                    </a>
                    <a
                      href='https://dev.timviec365.vn/blog'
                      className={styles['nav-item']}>
                      <li
                        style={{ display: 'flex', alignItems: 'center' }}
                        className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                        <span className={styles.item_ic}>
                          <img src='../img/tin-tuc.png' alt='' />
                        </span>
                        <p style={{ color: '#fff' }}>Tin tức</p>
                      </li>
                    </a>
                    {!renderContent ? (
                      <>
                        <a
                          href='/lua-chon-dang-ky.html'
                          className={styles['nav-item']}>
                          <li
                            className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                            <span className={styles.item_ic}>
                              <img src='../img/logout_i.png' alt='' />
                            </span>
                            <p style={{ color: '#fff' }}>Đăng ký</p>
                          </li>
                        </a>
                        <a
                          href='/lua-chon-dang-nhap.html'
                          className={styles['nav-item']}>
                          <li
                            className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                            <span className={styles.item_ic}>
                              <img src='../img/logout_ind.png' alt='' />
                            </span>
                            <p style={{ color: '#fff' }}>Đăng nhập</p>
                          </li>
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href='/quan-ly-ung-dung-cong-ty.html'
                          className={styles['nav-item']}>
                          <li
                            className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                            <span className={styles.item_ic}>
                              <img src='../img/chuyen_d.png' alt='' />
                            </span>
                            <p style={{ color: '#fff' }}>Chuyển đổi số 365</p>
                          </li>
                        </a>
                        <a className='nav-item btx_logout' onClick={show}>
                          <li
                            className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                            <span className={styles.item_ic}>
                              <img src='../img/logout_ind.png' alt='' />
                            </span>
                            <p style={{ color: '#fff' }}>Đăng xuất</p>
                          </li>
                        </a>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalConfirm && (
        <ModalConfirm
          setOpenModalConfirm={setOpenModalConfirm}
          setOpenModalRegister={setOpenModalRegister}
          setOpenModalLogin={setOpenModalLogin}
        />
      )}
      {openModalRegister && (
        <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
      )}
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
    </>
  )
}
