import React, { useEffect, useState } from "react";
import style from "@/components/crm/customer/customer.module.css";
import { Checkbox, Input, Select } from "antd";
import Cookies from "js-cookie";
import { base_url } from "../../service/function";
import { useDispatch } from "react-redux";
import {
  doGhimCha,
  doGhimCon,
  doSaveCha,
  doSaveCon,
} from "../../redux/user/userSlice";
import { useSelector } from "react-redux";

type Props = {};

const Bot_textEditor = ({ dataAdd, setDataAdd }: any) => {
  const [listNV, setlistNV] = useState([]);
  const [listGr, setListGr] = useState([]);
  const [listGr_Child, setlistGr_Child] = useState([]);
  const [listSave, setlistSave] = useState([]);
  const [change, setChange] = useState<any>(1);
  const [valueCha, setValueCha] = useState();
  const [valueCon, setValueCon] = useState();
  const dispatch = useDispatch();

  const checkCha = useSelector((state: any) => state?.auth?.ghimCha);
  const valueChaOld = useSelector((state: any) => state?.auth?.valueCha);

  const checkCon = useSelector((state: any) => state?.auth?.ghimCon);
  const valueConOld = useSelector((state: any) => state?.auth?.valueCon);
  const handleGetNV = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setlistNV(data?.data?.items);
    } catch (error) {}
  };
  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setListGr(data?.data);
      let arr = [];
      data?.data?.map((item) => {
        item?.list_gr_child.map((item) => {
          arr.push(item);
        });
        setlistGr_Child(arr);
        setlistSave(arr);
      });
    } catch (error) {}
  };

  const handleselect = (value) => {
    setDataAdd({ ...dataAdd, parent_group: value });
    setValueCha(value);
    dispatch(doSaveCha({ id: value }));
    const sortChild = listSave?.filter((item) => item.group_parent === value);
    setlistGr_Child(sortChild);
  };

  const handleselectCon = (value) => {
    setDataAdd({ ...dataAdd, child_group: value });
    setValueCon(value);
    dispatch(doSaveCon({ id: value }));
  };

  const handleGhimNhom = (e) => {
    dispatch(doGhimCha(e.target.checked));
  };
  const handleGhimNhomCon = (e) => {
    dispatch(doGhimCon(e.target.checked));
  };

  const handleGetGhimCha = () => {
    if (checkCha) {
      setDataAdd({ ...dataAdd, parent_group: valueChaOld });
    }
    if (checkCon) {
      setDataAdd({ ...dataAdd, child_group: valueConOld });
    }
    if (checkCha && checkCon) {
      setDataAdd({
        ...dataAdd,
        parent_group: valueChaOld,
        child_group: valueConOld,
      });
    }
  };
  // const handleGetGhimCon = () => {
  //   if (checkCon) {
  //     setDataAdd({ ...dataAdd, children_group: valueConOld });
  //   }
  // };

  useEffect(() => {
    // handleGetGhimCon();
    handleGetGhimCha();
    handleGetNV();
    handleGetGr();
  }, []);
  return (
    <div className={style.container_bot}>
      <div className={style.top_bot}>
        <div className={style.left}>
          <div
            style={{
              padding: "10  px 5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className={style.titlebot}>Nhóm khách hàng cha</div>
            <div>
              <Checkbox
                checked={checkCha}
                onChange={(e) => handleGhimNhom(e)}
              />
              <b>&nbsp;</b>
              Ghim nhóm
            </div>
          </div>
          <Select
            value={dataAdd?.parent_group}
            onSelect={handleselect}
            style={{ fontWeight: 1000, width: "100%" }}
            placeholder="Chọn nhóm khách hàng cha"
          >
            {listGr?.map((item, index) => {
              return (
                <option key={index} value={item?.gr_id}>
                  {item?.gr_name}
                </option>
              );
            })}
          </Select>
        </div>
        <div>&nbsp;</div> <div>&nbsp;</div> <div>&nbsp;</div>
        <div className={style.right}>
          <div className={style.titlebot}>Nhân viên nhập liệu</div>
          <Select
            style={{ fontWeight: 1000, width: "100%" }}
            placeholder="Chọn nhân viên nhập liệu"
            value={dataAdd?.user_create_id}
            onChange={(value) =>
              setDataAdd({ ...dataAdd, user_create_id: value })
            }
          >
            {listNV &&
              listNV?.map((item, index) => {
                return (
                  <option key={index} value={item?.idQLC}>
                    ({item?.idQLC}) {item?.userName}
                  </option>
                );
              })}
          </Select>
        </div>
      </div>
      <div>
        <div className={style.bot_bot}>
          <div
            style={{
              padding: "10px 5px",
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <div className={style.titlebot}>Nhóm khách hàng con</div>
            <div>
              <Checkbox
                checked={checkCon}
                onChange={(e) => handleGhimNhomCon(e)}
              />
              <b>&nbsp;</b>
              Ghim nhóm
            </div>
          </div>
          <Select
            value={dataAdd?.children_group}
            onSelect={handleselectCon}
            style={{ fontWeight: 1000, width: "50%" }}
            placeholder="Chọn nhóm khách hàng con"
          >
            {listGr_Child?.map((item, index) => {
              return (
                <option key={index} value={item?.gr_id}>
                  {item?.gr_name}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Bot_textEditor;
