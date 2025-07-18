import { Input, Modal, Select, Table, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Filter from "./filter";
import { useSelector } from "react-redux";
import { base_url } from "../../service/function";
import { dataSaveTD } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { CloseSquareFilled } from "@ant-design/icons";
const Cookies = require("js-cookie");
type Props = {};

const Recording = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listLine, setlistLine] = useState([]);
  const [data, setData] = useState([]);
  const [rootNV, setRootNV] = useState([]);
  const [listNV, setListNV] = useState([]);
  const [id, setId] = useState();
  const [name, setname] = useState();
  const [option, setOption] = useState();
  const [showKetNoi, setShowKetNoi] = useState(true);
  const dispatch = useDispatch();
  const [position_id, setPosition_id] = useState();


  const show = useSelector((state: any) => state?.auth?.account);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };

  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const handleChange = (value, name) => {
    setIsShowModalEdit(true);
    setname(name);
    setId(value);
  };

  const Colums = [
    {
      width: "10%",
      title: "STT",
      dataIndex: "key",
    },
    {
      width: "10%",
      title: "Line",
      dataIndex: "extension_number",
    },
    {
      width: "10%",
      title: "Người phụ trách",
      dataIndex: "userName",
    },
    {
      width: "12%",
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      width: "12%",
      title: "Chức năng",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <button
          onClick={() => handleChange(record.extension_number, record.userName)}
        >
          Sửa
        </button>
      ),
    },
  ];
  const handleGetLine = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/cutomerCare/listLine_v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      const data = await res.json();
      console.log(data)
      setData(data?.data?.data);
    } catch (error) { }
  };

  const handleGetNhanVienPhuTrach = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: `${Cookies.get("com_id")}` }),
        }
      );
      const data = await res.json();
      setListNV(data?.data?.items);
      setRootNV(data?.data?.items);
    } catch (error) { }
  };
  useEffect(() => {
    if (show) {
      setShowKetNoi(true);
    }
    handleGetLine();
    handleGetNhanVienPhuTrach();
  }, [isShowModalEdit]);
  const handleChangeOption = (value: any) => {
    setOption(value);
  };
  function removeVietnameseTones(str: any) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();

    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|{|}|\||\\/g, " ");
    return str;
  }
  const handleSearch = (value: any) => {
    console.log(rootNV)
    if (isNaN(value)) {
      const tmp = rootNV.filter(item => removeVietnameseTones(item.ep_name).includes(removeVietnameseTones(value)))
      setListNV(tmp)
    }
    else {
      const tmp = rootNV.filter(item => String(item.ep_id).includes(String(value)))
      setListNV(tmp)
    }
  };
  const handleOK = async () => {
    setIsShowModalEdit(false);
    try {
      const res = await fetch(`${base_url}/api/crm/cutomerCare/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ ext_number: id, emp_id: option }),
      });
      const data = await res.json();
      if (data && data.error) {
        notification.error({ message: data?.error?.message });
      }
    } catch (error) { }
  };
  return (
    <div>
      {showKetNoi && (
        <div style={{ paddingTop: 20 }}>
          <Table
            loading={data?.length > 0 ? false : true}
            columns={Colums as any}
            dataSource={data}
            bordered
            scroll={{ x: 1000 }}
            pagination={{
              style: { display: "flex", float: "left" },
              pageSize: 8,
            }}
          />
          <ModalConnect
            isShowModalAdd={isShowModalAdd}
            onClose={onClose}
            handleAddDB={handleAddDB}
          />
          <Modal
            onCancel={() => setIsShowModalEdit(false)}
            onOk={() => handleOK()}
            title={
              <div
                style={{
                  background: "#4C5BD4",
                  width: "114%",
                  margin: "-20px -25px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    paddingTop: 10,
                  }}
                >
                  Thiết lập
                </div>
              </div>
            }
            open={isShowModalEdit}
          >
            <div style={{ paddingTop: 20 }}>
              <div>Số điện thoại</div>
              <div>
                <Input
                  type="text"
                  disabled
                  value={id}
                  style={{ color: "black" }}
                />
              </div>
              <div>Nhân viên phụ trách</div>
              <div>
                <Select
                  style={{ width: "100%" }}
                  defaultValue={` ${name}`}
                  optionFilterProp="children"
                  showSearch
                  onChange={handleChangeOption}
                  onSearch={handleSearch}
                >
                  <option>Nhân viên phụ trách</option>
                  {listNV &&
                    listNV?.map((item: any, index) => {
                      return (
                        <option key={index} value={item.ep_id}>
                          {`${item.ep_id} - ${item.ep_name}`}
                        </option>
                      );
                    })}
                </Select>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
export default Recording;
