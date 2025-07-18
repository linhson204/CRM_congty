import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import styles from "../../potential/potential.module.css";
import styleCustomer from "../customer.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

import Cookies from "js-cookie";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  listNV: any;
  handover: string;
}

const SharingCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  listNV,
  handover
}) => {
  const [valueSharing, setValueSharing] = useState("");
  const [roleValue, setRoleValue] = useState("all");
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [optionsDep, setOptionsDep] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedItems, setSelectedItems] = useState<any>(undefined);
  const [selectedItemsPB, setSelectedItemsPB] = useState<any>(undefined);
  const [listPB, setlistPB] = useState<any>();;
  const [errorSelectedValue, setErrorSelectedValue] = useState(false);
  const [errorSelectedItems, setErrorSelectedItems] = useState(false);
  const [errorSelectedItemsPB, setErrorSelectedItemsPB] = useState(false);
  const [errorSelectedItemsPBAll, setErrorSelectedItemsPBAll] = useState(false);
  const [errorSelectedItemsAll, setErrorSelectedItemsAll] = useState(false);

  //data Phòng ban
  const handleGetPhongBan = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/department/list`,
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
      setlistPB(data?.data?.items);
    } catch (error) { }
  };

  //Chia sẻ khách hàng
  const handleShareCustomer = async () => {
    try {
      const formData = new FormData();
      formData.append("receiver_id", selectedItems || null);
      formData.append("dep_id", selectedItemsPB || null)
      formData.append("role", roleValue)
      formData.append("customer_id", handover)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/customerdetails/shareCustomer`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: formData,
        }
      );

    } catch (error) { }
  };


  const handleOK = async () => {
    const isValidSharing = validate();
    const isValidPB = validatePB();
    const isValidNV = validateNV();
    const isValidAll = validateAll();

    if (isValidSharing && isValidPB && isValidNV && isValidAll) {
      setSelectedItems(undefined);
      setSelectedItemsPB(undefined);
      setIsModalCancel(false);
      await handleShareCustomer()
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
        resetSharingOption();
      }, 2000);
    }
  };

  const handleCancel = () => {
    setIsModalCancel(false);
    setSelectedItems(undefined);
    setSelectedItemsPB(undefined);
    resetSharingOption()
  }

  const resetSharingOption = () => {
    setValueSharing("");
  };

  const handleRoleChange = (value) => {
    setRoleValue(value);
  };

  // validate
  const validate = () => {
    if (!valueSharing) {
      setErrorSelectedValue(true);
      return false;
    } else {
      setErrorSelectedValue(false);
      return true;
    }
  };

  const validatePB = () => {
    if (valueSharing === "department" && !selectedItemsPB) {
      setErrorSelectedItemsPB(true);
      return false;
    } else {
      setErrorSelectedItemsPB(false);
      return true;
    }
  };

  const validateNV = () => {
    if (valueSharing === "staff" && !selectedItems) {
      setErrorSelectedItems(true);
      return false;
    } else {
      setErrorSelectedItems(false);
      return true;
    }
  };

  const validateAll = () => {
    if (valueSharing === "all") {
      const hasErrorPB = !selectedItemsPB;
      const hasErrorNV = !selectedItems;

      setErrorSelectedItemsPBAll(hasErrorPB);
      setErrorSelectedItemsAll(hasErrorPB || hasErrorNV);

      return !(hasErrorPB || hasErrorNV);
    } else {
      setErrorSelectedItemsPBAll(false);
      setErrorSelectedItemsAll(false);
      return true;
    }
  };


  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn nhân viên bàn giao" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?.ep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, [listNV]);

  useEffect(() => {
    if (Array.isArray(listPB)) {
      const updatedOptionsDep = [
        { value: "", label: "Chọn phòng ban bàn giao" },
        ...listPB?.map((item) => {
          const name = item?.dep_name || "";
          const id = item?.dep_id?.toString() || "";

          return { value: id, label: `${name}` };
        }),
      ];

      setOptionsDep(updatedOptionsDep);
    }
  }, [listPB]);

  useEffect(() => {
    handleGetPhongBan();
  }, []);

  return (
    <>
      <Modal
        title={"Chia sẻ khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => handleCancel()}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={`${styles.choose_obj} ${errorSelectedItems ? styles.error : ""}`}>
            <label className={`${styles.form_label} required`}>
              {"Chia sẻ với"}
            </label>
            <select
              onChange={(e) => {
                if (e) {
                  setValueSharing(e.target.value),
                    setErrorSelectedValue(false),
                    setSelectedItems(undefined),
                    setSelectedItemsPB(undefined)
                } else {
                  resetSharingOption()
                }

              }}
              className={styleCustomer.input_control}
              value={valueSharing}
            >
              <option value="" >Chọn đối tượng chia sẻ</option>
              <option value={"staff"}>Nhân viên</option>
              <option value="department">Phòng ban</option>
              <option value="all">Phòng ban & Nhân viên</option>
            </select>
            <div className={`error ${styles.error}`}>
              {errorSelectedValue && "Bạn chưa chọn đối tượng chia sẻ."}
            </div>
          </div>

          {valueSharing === "department" ? (
            <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
              <label className={`${styles.form_label} required`}>
                {"Phòng ban được chia sẻ"}
              </label>
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Phòng ban được chia sẻ"
                value={selectedItemsPB}
                onChange={(value) => {
                  if (value) {
                    setSelectedItemsPB(value);
                    setErrorSelectedItemsPB(false)
                  } else {
                    setSelectedItemsPB(undefined);
                  }
                }}
                style={{ width: "100%" }}
                options={optionsDep}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
              <div className={`error ${styles.error}`}>
                {errorSelectedItemsPB && "Bạn chưa chọn phòng ban chia sẻ."}
              </div>
            </div>
          ) : valueSharing === "staff" ? (
            <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
              <label className={`${styles.form_label} required`}>
                {"Nhân viên được chia sẻ"}
              </label>
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Nhân viên được chia sẻ"
                value={selectedItems}
                onChange={(value) => {
                  if (value) {
                    setSelectedItems(value);
                    setErrorSelectedItems(false)
                  } else {
                    setSelectedItems(undefined);

                  }
                }}
                style={{ width: "100%" }}
                options={options}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
              <div className={`error ${styles.error}`}>
                {errorSelectedItems && "Bạn chưa chọn nhân viên được chia sẻ."}
              </div>
            </div>
          ) : valueSharing === "all" ? (
            <>
              <div style={{ marginTop: "10px" }}>
                <div className={`${styles.choose_obj} ${errorSelectedItemsAll ? styles.error : ""}`}>
                  <label className={`${styles.form_label} required`}>
                    {"Phòng ban được chia sẻ"}
                  </label>
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    placeholder="Phòng ban được chia sẻ"
                    value={selectedItemsPB}
                    onChange={(value) => {
                      if (value) {
                        setSelectedItemsPB(value);
                        setErrorSelectedItemsPBAll(false);
                      } else {
                        setSelectedItemsPB(undefined);
                      }
                    }}
                    style={{ width: "100%" }}
                    options={optionsDep}
                    filterOption={(input, option) =>
                      option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  />
                  <div className={`error ${styles.error}`}>
                    {errorSelectedItemsPBAll && "Bạn chưa chọn phòng ban được chia sẻ."}
                  </div>
                </div>
                <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
                  <label className={`${styles.form_label} required`}>
                    {"Nhân viên được chia sẻ"}
                  </label>
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    placeholder="Nhân viên được chia sẻ"
                    value={selectedItems}
                    onChange={(value) => {
                      if (value) {
                        setSelectedItems(value);
                        setErrorSelectedItemsAll(false);
                      } else {
                        setSelectedItems(undefined);
                      }
                    }}
                    style={{ width: "100%" }}
                    options={options}
                    filterOption={(input, option) =>
                      option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  />
                  <div className={`error ${styles.error}`}>
                    {errorSelectedItemsAll && "Bạn chưa chọn nhân viên được chia sẻ."}
                  </div>
                </div>
              </div>
            </>

          ) : null}

          <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Quyền sử dụng"}
            </label>
            <select className={styleCustomer.input_control} value={roleValue}
              onChange={(e) => handleRoleChange(e.target.value)}
            >
              <option value="all">Toàn quyền</option>
              <option value="edit">Sửa</option>
              <option value="seen" >Xem</option>
            </select>
          </div>

          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Chia sẻ thành công!"}
        link={"/customer/list"}
      />
    </>
  );
};

export default SharingCustomerModal;
