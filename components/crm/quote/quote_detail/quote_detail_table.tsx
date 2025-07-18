import { useState } from "react";
import TableDataOrderDetail from "@/components/crm/table/table-order-detail";
import styles from "./quote_detail.module.css";
import { Input, Tooltip } from "antd";
import TableDataQuoteDetail from "@/components/crm/table/table-quote-detail";
import AddQuoteDetailInfo from "./quote_detail_diary";
import Link from "next/link";

export default function AddTable() {
  return (
    <div style={{ padding: "0 80px" }}>
      <div className={styles.infotop}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img src="/crm/logo_timviec365.svg" alt="hungha365.com" />
          </div>
          <div>
            <div className={styles.monneytop}>
              <div>Số báo giá</div>
              <div>965848</div>
            </div>
            <div className={styles.monneytop}>
              <div>Ngày báo giá</div>
              <div>09/07/2022</div>
            </div>
            <div className={styles.monneytop}>
              <div>Hiệu lực báo giá</div>
              <div>08/10/2023</div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          color: "#474747",
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <h1>BẢNG BÁO GIÁ</h1>
      </div>
      <div className={styles.container_bot_title}>
        <div className={styles.infobot_title}>
          <div className={styles.infobot_title_left}>
            <b>Công ty CPTT Hưng Hà</b>
          </div>
          <div className={styles.infobot_title_right}>
            <span>Khách hàng:</span>
            <div>Công ty TNHH Meta</div>
          </div>
        </div>
        <div className={styles.infobot_title}>
          <div className={styles.infobot_title_left}>
            <b>Số 1, Trần Nguyên Đán, Định Công, Hoàng Mai, HN</b>
          </div>
          <div className={styles.infobot_title_right}>
            <span>Địa chỉ:</span>
            <div>Artemis tower, Lê Trọng Tấn,Khương Mai, Thanh Xuân, HN</div>
          </div>
        </div>

        <div className={styles.infobot_title}>
          <div className={styles.infobot_title_left}>
            <b>+ 84 (8) 24567889</b>
          </div>
          <div className={styles.infobot_title_right}>
            <span>Số điện thoại:</span>
            <div>023446778</div>
          </div>
        </div>

        <div className={styles.infobot_title}>
          <Link href={"#"} className={styles.infobot_title_left}>
            timviec365.vn
          </Link>
          <div className={styles.infobot_title_right}>
            <span>Mã số thuế:</span>
            <div>TX873</div>
          </div>
        </div>

        <div style={{ fontSize: 15 }}>
          <b>Lời giới thiệu </b>
        </div>
      </div>
      <div style={{ fontSize: 15 }}>
        Công ty Cổ phần Thanh toán Hưng Hà xin trân trọng gửi tới quý khách hàng
        bảng báo giá chi tiết về sản phầm hàng hoá trong quý 3 năm 2022 như sau:
      </div>

      <TableDataQuoteDetail
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className={styles.infoTotalMonney}>
        <div>
          <div className={styles.monney}>
            <div>Tổng thành tiền</div>
            <div>1000000 VNĐ</div>
          </div>
          <div className={styles.monney}>
            <div>Chiết khấu đơn hàng</div>
            <div>5%</div>
          </div>
          <div className={styles.monney}>
            <div>Tổng tiền thanh toán</div>
            <div>1000000 VNĐ</div>
          </div>
        </div>
      </div>

      <div className={styles.bot_infoTotalMonney}>
        <div className={styles.monney}>
          <div>
            <b> Số tiền viết bằng chữ</b>
          </div>
          <div>Một triệu đồng</div>
        </div>
      </div>
      <div className={styles.bot_infoTotalMonney}>
        <div className={styles.monney}>
          <div>
            <b> Điều khoản & Quy định</b>
          </div>
        </div>
      </div>
      <div className={styles.bot_infoTotalMonney}>
        <div className={styles.monney}>
          <div>
            Quy định của Công ty CPTT Hưng
            Hà......................................
          </div>
        </div>
      </div>
      <div className={styles.bot_infoTotalMonney}>
        <div className={styles.monney}>
          <div>
            <b> Ghi chú</b>
          </div>
        </div>
      </div>
      <div className={styles.bot_infoTotalMonney}>
        <div className={styles.monney}>
          <div>Báo giá chưa bao gồm thuế VAT</div>
        </div>
      </div>

      <div className={styles.sign}>
        <div className={styles.monney2}>
          <div style={{ textAlign: "center" }}>
            <b> Người lập</b>
            <div style={{ paddingBottom: 50 }}>(Ký, họ tên)</div>
            <h2>Phạm Thanh Mai</h2>
          </div>
        </div>
        <div className={styles.monney2}>
          <div style={{ textAlign: "center" }}>
            <b> Giám đốc</b>
            <div style={{ paddingBottom: 50 }}>(Ký, họ tên, đóng dấu)</div>
            <h2>Trương Văn Trắc</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
