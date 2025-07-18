import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddZalo from "@/components/crm/marketing/zalo/footer_add_zalo";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Cookies from "js-cookie";
import Head from "next/head";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Zalo / Thêm mới zalo");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const handleClickImg = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const [listTemplate, setListTemplate] = useState([])
  const [phone, setPhone] = useState('')
  const [listPhone, setListPhone] = useState([])
  const [template, setTemplate] = useState()
  const [quota, setQuota] = useState()

  const handleGetListTemplate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/marketingZalo/getListTemplate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json()
      console.log(data)
      // setlistPB(data?.data?.data);
    } catch (error) { }
  };

  const handleGetQuota = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/marketingZalo/getQuota`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json()
      console.log(data)
      // setQuota(data?.data?.data);
    } catch (error) { }
  };


  useEffect(() => {
    handleGetListTemplate()
    handleGetQuota()
  }, []);

  const handleSubmit = () => {

  }

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: '60%',
    },
    {
      title: ' ',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
    }
  ]
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thêm mới Zalo</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.formInfoStep}>
          <div className={styles.main__title}>Thêm mới zalo</div>
          <div className={styles.form_add_potential}>
            <div className={styles.main__body}>
              <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Đã gửi: 40/150 tin nhắn</div>
              <label htmlFor="">Số điện thoại người nhận</label>
              <Input
                type="tel"
                placeholder="Số điện thoại người nhận"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ maxWidth: '50%', margin: '4px 0 12px 0' }}
                allowClear={true}
              />
              <Table
                columns={columns}
                dataSource={listPhone}
                bordered
                style={{ maxWidth: '50%', margin: '4px 0 12px 0' }}
              // pagination={{
              //   style: { paddingBottom: 30, float: "left" },
              //   current: pageCurrent,
              //   pageSize: 10,
              //   onChange(page, pageSize) {
              //     if (page != pageCurrent) {
              //       setPageCurrent(page);
              //     }
              //   },
              // }}
              />
              <label htmlFor="">Mẫu template zalo</label>
              <Select
                onChange={(value) => setTemplate(value)}
                style={{ maxWidth: '50%', margin: '4px 0 12px 0' }}
                value={template}
                placeholder="Chọn temaplate zalo"
              >
                {listTemplate &&
                  listTemplate.length > 0 &&
                  listTemplate?.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item?.organizeDetailName}>
                        {item?.organizeDetailName}
                      </option>
                    );
                  })}
              </Select>
              <div className={styles.main__body__type}>Thông tin hệ thống</div>
              <div className={styles.row_input}>
                <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
                  <p style={{ display: "flex" }}>
                    <input
                      type="radio"
                      value="0"
                      style={{ marginRight: "8px" }}
                      name="info_system"
                      checked
                    />
                    Gửi ngay
                  </p>
                  {/* <p style={{ display: "flex" }}>
                    <input
                      type="radio"
                      value="1"
                      style={{ marginRight: "8px" }}
                      name="info_system"
                    />
                    Gửi vào lúc
                  </p> */}
                </div>
              </div>
            </div>
            <FooterAddZalo
              link="/marketing/sms"
              titleCancel="Xác nhận hủy thêm mới sms"
              title="Gửi sms thành công!"
              contentCancel="Bạn có chắc chắn muốn hủy thêm mới sms thông tin bạn nhập sẽ không được lưu lại?"
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilesCustomerList;
