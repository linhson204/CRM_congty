import React from "react";
import style from "@/components/crm/customer/customer.module.css";
import { Select } from "antd";

type Props = {};

const Info_cus = ({ dataAdd, setDataAdd }: any) => {
  return (
    <div className={style.container_info_input_add}>
      <div className={style.legendIP}>
        <div className={style.title}>
          Số điện thoại <b>*</b>
        </div>
        <div>
          <input
            className={style.form_control}
            placeholder="Nhập số điện thoại"
            value={dataAdd?.phone_number}
            onChange={(e) =>
              setDataAdd({ ...dataAdd, phone_number: e.target.value })
            }
          />
        </div>
      </div>

      <div className={style.legendIP}>
        <div className={style.title}>
          Email <b>*</b>
        </div>
        <div>
          <input
            className={style.form_control}
            placeholder="Nhập Email"
            value={dataAdd?.email}
            onChange={(e) => setDataAdd({ ...dataAdd, email: e.target.value })}
          ></input>
        </div>
      </div>

      <div className={style.legendIP}>
        <div className={style.title}>
          Tên khách hàng <b>*</b>
        </div>
        <div>
          <input
            className={style.form_control}
            placeholder="Nhập tên khách hàng"
            value={dataAdd?.name}
            onChange={(e) => setDataAdd({ ...dataAdd, name: e.target.value })}
          ></input>
        </div>
      </div>

      <div className={style.legendIP}>
        <div className={style.title}>
          Tên nguồn khách hàng <b>*</b>
        </div>
        <Select
          placeholder="Chọn nguồn khách hàng"
          value={dataAdd?.resoure}
          onChange={(value) => setDataAdd({ ...dataAdd, resoure: value })}
        >
          <option value={1}>{" Facebook"}</option>Zalo
          <option value={2}>{" Website"}</option>
          <option value={3}>{" Zalo"}</option>
          <option value={4}>{" Dữ liệu bên thứ 3"}</option>
          <option value={5}>{" Khách hàng giới thiệu"}</option>
          <option value={6}>{" Giới thiệu"}</option>
          <option value={7}>{" Chăm sóc khách hàng"}</option>
          <option value={8}>{" Email"}</option>
        </Select>
      </div>
    </div>
  );
};

export default Info_cus;
