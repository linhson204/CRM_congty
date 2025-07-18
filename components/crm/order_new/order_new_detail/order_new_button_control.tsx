// import OrderSelectBoxStep from "../order_steps/select_box_step";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import styles from "./order_new_detail.module.css";


export default function AddButtonNewControl({ orderDetail, adminInfo }: any) {

  const [user, setUser] = useState(() => {
    const decodedToken = jwt_decode(Cookies.get("token_base365"))
    if (decodedToken && decodedToken['data']) {
      return decodedToken['data']
    }
    return undefined
  })

  const sendMessageToGroupOrder = async (message, id_order = null) => {
    try {
      let dataGroup;
      // if (id_order != null) {
      //     dataGroup = {
      //         ConversationID: '806102', // id nhóm thanh toán đơn hàng
      //         SenderID: '1192',
      //         MessageType: 'OfferReceive',
      //         Message: message,
      //         Link: 'https://timviec365.vn/admin/modules/orders/detail_of_supporter.php?id='+id_order
      //     };
      // } else {
      //     dataGroup = {
      //         ConversationID: '806102', // id nhóm thanh toán đơn hàng
      //         SenderID: '1192',
      //         MessageType: 'text',
      //         Message: message
      //     };
      // }
      if (id_order != null) {
        dataGroup = {
          ConversationID: '806102', // id nhóm thanh toán đơn hàng
          SenderID: '1192',
          MessageType: 'OfferReceive',
          Message: message,
          Link: 'https://hungha365.com/crm/order-new/detail/' + id_order
        };
      } else {
        dataGroup = {
          ConversationID: '806102', // id nhóm thanh toán đơn hàng
          SenderID: '1192',
          MessageType: 'text',
          Message: message
        };
      }
      const sendGroup = await axios.post('https://api.timviec365.vn:9015/api/message/SendMessage', dataGroup);
      return true;
    } catch (e) {
      console.log('error SendMessageToGroupOrder', e);
      return false;
    }
  }

  const sendMessageToIdChat = async (message, ContactId) => {
    try {
      // let data = {
      //     UserID: ContactId,
      //     SenderID: '1192',
      //     MessageType: 'text',
      //     Message: message
      // };
      let data = {
        UserID: ContactId,
        SenderID: '1192',
        MessageType: 'text',
        Message: message
      };
      const send = await axios.post('http://210.245.108.202:9000/api/message/SendMessageIdChat', data);
      return true;
    } catch (e) {
      console.log('error SendMessageToIdChat', e);
      return false;
    }
  }

  const handleOrderAcpt = async (flag) => {
    const body = {
      id: orderDetail._id,
      flag: flag
    };
    let urlApi = '';

    if (user?.type === 2) {
      urlApi = 'https://api.timviec365.vn/api/crm/order/acceptOrderTimviecServiceByStaff';
    } else {
      urlApi = 'https://api.timviec365.vn/api/crm/order/acceptOrderTimviecServiceByCompany';
    }

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify(body),
      });
      const dataRes = await response.json();

      console.log("RES DUYET DON HANG", dataRes);
      if (dataRes?.data?.result == true) {
        if (flag == "0") {
          alert("Từ chối đơn hàng thành công");
          let message =
            `Thông báo \n Đơn hàng với mã ${orderDetail?.order_id_text} đã bị từ chối bởi chuyên viên chăm sóc ` +

            `Giá trị đơn hàng: ${orderDetail?.inForOrder?.timviec?.money_with_vat?.toLocaleString('vi-VN')} VND`;
          if (user?.type == 1) {
            message =
              `Thông báo \n Đơn hàng với mã ${orderDetail?.order_id_text} đã bị từ chối bởi tổng đài hỗ trợ ` +

              `Giá trị đơn hàng: ${orderDetail?.inForOrder?.timviec?.money_with_vat?.toLocaleString('vi-VN')} VND`;
          }
          await sendMessageToGroupOrder(message, orderDetail._id);

          if (user?.type == 1) {
            let messageKH =
              `Thông báo \n Đơn hàng với mã ${orderDetail.order_id_text} đã bị từ chối bởi chuyên viên chăm sóc ` +
              adminInfo.AdmName +
              ` \n - Tên chuyên viên: ${adminInfo.AdmName} \n - Số điện thoại: ${adminInfo.AdmPhone} \n - Zalo: ${adminInfo.AdmZalo} \n - Email: ${adminInfo.AdmEmail} \n - Hotline: 1900633682 - Nhấn phím 1 \n Hãy chờ để được tổng đài hỗ trợ hoàn thành đơn hàng.`;
            await sendMessageToIdChat(messageKH, orderDetail.id_timviec_khach);
          }

          console.log("MESSAGE TU CHOI", message)

        } else {
          console.log("Duyệt đơn hàng thành công")

          //Gửi tin nhắn tới nhóm
          let message =
            `Thông báo \n Đơn hàng với mã ${orderDetail?.order_id_text} đã được duyệt bởi chuyên viên chăm sóc ` +
            `Giá trị đơn hàng: ${orderDetail?.inForOrder?.timviec?.money_with_vat?.toLocaleString('vi-VN')} VND`;
          if (user?.type == 1) {
            message =
              `Thông báo \n Đơn hàng với mã ${orderDetail?.order_id_text} đã được duyệt bởi tổng đài hỗ trợ, đơn hàng chuyển sang trạng thái đang hoạt động. ` +
              `Thông tin đơn hàng:
              - Tên khách hàng: ${orderDetail?.inForOrder?.timviec?.name_timviec_khach}
              - ID khách hàng: ${orderDetail?.inForOrder?.timviec?.id_timviec_khach}
              - Chuyên viên chăm sóc: ${adminInfo?.AdmName}
              - Mã đơn hàng: ${orderDetail?.order_id_text}
              - Giá trị cuối cùng: ${orderDetail?.inForOrder?.timviec?.money_with_vat?.toLocaleString('vi-VN')} vnđ`;
          }
          await sendMessageToGroupOrder(message, orderDetail._id);

          //Gửi tin nhắn tới khách hàng
          if (user?.type == 1) {
            let messageKH =
              `Thông báo \n Đơn hàng với mã ${orderDetail.order_id_text} đã được duyệt bởi chuyên viên chăm sóc ` +
              adminInfo.AdmName +
              ` \n - Tên chuyên viên: ${adminInfo.AdmName} \n - Số điện thoại: ${adminInfo.AdmPhone} \n - Zalo: ${adminInfo.AdmZalo} \n - Email: ${adminInfo.AdmEmail} \n - Hotline: 1900633682 - Nhấn phím 1 \n Hãy chờ để được tổng đài hỗ trợ hoàn thành đơn hàng.`;
            await sendMessageToIdChat(messageKH, orderDetail.id_timviec_khach);

            console.log("MESSAGE DUYET", message)
          }
        }
        window.location.reload();
      } else {
        alert("Có lỗi xảy ra,vui lòng kiểm tra trạng thái đơn hàng")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
            <div className={styles.leftIP}>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const result = window.confirm("Bạn từ chối duyệt đơn hàng này ?");
                    if (result) {
                      handleOrderAcpt("0");
                    } else {
                    }
                  }}
                  className={`${styles.btn_deny} flex_align_center`}
                >
                  &nbsp;
                  <i className="bi bi-x-circle"></i>
                  Từ chối
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const result = window.confirm("Bạn đồng ý duyệt đơn hàng này ?");
                    if (result) {
                      handleOrderAcpt("1")
                    } else {
                    }
                  }}
                  className={`${styles.btn_browse} flex_align_center`}
                >
                  &nbsp;&nbsp;
                  <i className="bi bi-check2-circle"></i>
                  Duyệt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
