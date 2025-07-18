import { validateMail, validatePhone } from "@/utils/function";
import style from "../header.module.css";
import warningStyle from '../warning.module.css'

export default function WarningModal({ listWarning, handleRefresh, handleRead, handleReadAll, isShowMore, handleShowMore, isLoading, handleDelete, handleCallNow, isOpen, isSmallWarning, setIsSmallWarning, toggleSmallWarning, handleDeleteAllRead }: any) {
  // const [warnings, setWarnings] = useState(listWarning)
  const readItem = (id: number | string) => {
    if (!!handleRead) {
      handleRead(id)
    }
  }

  return (
    <div className={style.help_open} style={{ display: "flex", flexDirection: "column" }}>
      <p
        className={style.title_help}
        style={{ cursor: "default" }}
      >
        Nhắc nhở
        <span className={warningStyle.rfBtnContainer}>
          <div
            className={`${warningStyle.btn} ${warningStyle.no_border}`}
            onClick={() => {
              if (!!toggleSmallWarning) {
                toggleSmallWarning()
              }
            }}
          >
            <p>
              Thu nhỏ
            </p>
            <span style={{ width: "25px" }}>
              {
                isSmallWarning ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#4c5bd4" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" /></svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#4c5bd4" d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128l-192 0c-70.7 0-128-57.3-128-128s57.3-128 128-128l192 0zM576 256c0-106-86-192-192-192L192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" /></svg>
              }
            </span>
          </div>
          <button className={`${warningStyle.btn}`} onClick={() => {
            if (!!handleRefresh) {
              handleRefresh()
            }
          }}>
            {!!isLoading ? "Đang tải..." : "Làm mới"}
            <div style={{ width: "20px", height: "20px" }}>
              {
                !!isLoading ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39L344 184c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 134.1-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" /></svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" /></svg>
              }
            </div>
          </button>
        </span>
      </p>
      <div className={style.help_box}>
        {/* {warning_header_box.map((item: any, i: any) => (
          <a className={style.item_help} key={i}>
            <div className={style.div_help}>
              <img src={item.img} alt="hungha365.com" />
              <div className={style.content_help}>
                <p className={style.text_help}>
                  <div className={style.text_help_special}>{item.name}</div>
                  {item.content}
                </p>
                <p className={style.time_help}>{item.timestamp}</p>
              </div>
            </div>
          </a>
        ))} */}
        {Array.isArray(listWarning) && listWarning.map((item: any, i: any) => (
          <div className={style.item_help} key={i} style={{ cursor: "default" }}>
            <div className={style.div_help} style={{
              opacity: item?.isRead ? '0.5' : '1'
            }}>
              <img src={item.img} alt="hungha365.com" />
              <div className={warningStyle.content_help}>
                <div className={style.text_help}>
                  <div className={style.text_help_special}>{item.name}</div>
                  <div dangerouslySetInnerHTML={{
                    __html: item.content
                  }}></div>
                </div>
                <p className={style.time_help}>{item.timestamp}</p>
                <div className={warningStyle.groupBtn}>
                  {
                    !!item?.cusPhone && validatePhone(item?.cusPhone) &&
                    <button
                      className={`${warningStyle.btn} ${warningStyle.btn_call}`}
                      onClick={() => {
                        if (!!handleCallNow) {
                          handleCallNow(item?.cusName || "", item?.cusPhone || "", item?.id)
                        }
                      }}
                    >
                      <p>Gọi</p>
                      <img src="/crm/phone-solid-white.svg" alt="call" />
                    </button>
                  }
                  {
                    !!item?.cusPhone && validateMail(item?.cusPhone) &&
                    <button 
                      className={`${warningStyle.btn}`}
                      onClick={() => {
                        readItem(item?.id)
                        window.location.href = `mailto:${item?.cusPhone}`
                      }}
                    >
                      <p>Mail</p>
                      <img src="/crm/envelope-regular.svg" alt="mail" />
                    </button>
                  }
                  {
                    !!item?.cusLink && (typeof item.cusLink === 'string') &&
                    <button
                      className={`${warningStyle.btn} ${warningStyle.btn_link}`}
                      // href={item.cusLink}
                      // target="_blank"
                      onClick={() => {
                        readItem(item?.id)
                        window.open(item?.cusLink.startsWith("http") ? item?.cusLink : encodeURI(`https://timviec365.vn/${item?.cusLink}`), "_blank")
                      }}
                    >
                      <p>Link khách</p>
                      <img src="/crm/link-solid.svg" alt="link" />
                    </button>
                  }
                  {
                    !!item?.cusZalo && validatePhone(item?.cusPhone) &&
                    <button
                      className={`${warningStyle.btn} ${warningStyle.btn_zalo}`}
                      // href={item.cusZalo}
                      // target="_blank"
                      onClick={() => {
                        readItem(item?.id)
                        window.open(item?.cusZalo, "_blank")
                      }}
                    >
                      <p>Zalo</p>
                      <img src="/crm/zalo_white.svg" alt="zalo" />
                    </button>
                  }
                  <button
                    className={`${warningStyle.btn} ${warningStyle.btn_red}`}
                    onClick={() => {
                      if (!!handleDelete) {
                        handleDelete(item?.id)
                      }
                    }}
                  >
                    <p>Xóa</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {
          Array.isArray(listWarning) && listWarning.length == 0 &&
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                opacity: "0.7",
              }}
            >
              <div style={{ width: "50px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#4c5bd4" d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" /></svg>
              </div>
              <p>Không có nhắc nhở</p>
            </div>
          </>
        }
        {
          !!isShowMore &&
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className={warningStyle.btn}
              onClick={() => {
                if (!!handleShowMore) {
                  handleShowMore()
                }
              }}
            >
              {!!isLoading ? "Đang tải..." : "Hiện thêm"}
            </button>
          </div>
        }
      </div>
      {
        Array.isArray(listWarning) && listWarning.length > 0 &&
        <div
          className={`${style.accept_all} ${warningStyle.accept_all}`}
        >
          <button
            className={`${style.accept_button_all} ${warningStyle.accept_all_confirm_all}`}
            onClick={() => {
              if (!!handleReadAll) {
                handleReadAll()
              }
            }}>
            Xác nhận tất cả
          </button>
          <button
            className={`${style.accept_button_all} ${warningStyle.accept_all_delete_all_read}`}
            onClick={() => {
              if (!!handleDeleteAllRead) {
                handleDeleteAllRead()
              }
            }}
          >
            Xóa đã đọc
          </button>
        </div>
      }
    </div>
  );
}
