import {  Modal, message,Table } from "antd";
import styles from "./modal.module.css";
import React from "react";
export default function DetailMail({ isOpen,setIsOpen,data,callCRM }) {

    const columns = [
        {
          title: "STT",
          width: 20,
          render: (text, record, index) => index + 1,
        },
        {
            title: "ID nhân viên/Số gọi",
            width: 50,
            dataIndex: 'phoneCall',
            key: 'phoneCall'
          },
        {
          title: "Số điện thoại khách hàng",
          width: 50,
          dataIndex: 'customerPhone',
          key: 'customerPhone'
        },
        {
          title: "Thời gian",
          width: 60,
          dataIndex: 'timeStart',
          key: "timeStart",
          render: (text: any, record: any) => (
            <p>{text}</p>
          )
        },
        {
            title: "Thời lượng",
            width: 60,
            dataIndex: 'duration',
            key: "duration",
          },
      ];

    return (
        <>
            <Modal
                open={isOpen}
                title={"Thống kê số lần gọi khách hàng"}
                centered
                className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                onCancel={() => {
                    setIsOpen(false)
                }}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                  <b>Số điện thoại khách hàng này đã được gọi trong tuần này</b>
                  <Table
                    dataSource={data}
                    columns={columns}
                    bordered
                    scroll={{ y: 500 }}
                  />
                  <p style={{fontWeight:"bold"}}>Bạn có muốn tiếp tục gọi hay không ?</p>
        
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
                    <button className={styles.huyb} type="submit" onClick={()=>{
                        callCRM()
                        setIsOpen(false)
                        
                    }} >
                      <p className={styles.texthuyb}>Tiếp tục</p>
                    </button>
        
                    <button className={styles.huyb} type="submit"  onClick = {()=>setIsOpen(false)}>
                      <p className={styles.texthuyb}>Hủy</p>
                    </button>
                  </div>
                </div>
            </Modal >

        </>
    )
}
