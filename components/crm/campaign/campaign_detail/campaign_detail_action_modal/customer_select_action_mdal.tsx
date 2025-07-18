import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import { useRouter } from "next/router";
import OrderSelectBox from "@/components/crm/order/order_selectt";
// import TabOrderList from './tab_order_list';
import TableDataCampaignCustomerSelect from "@/components/crm/table/table-campaign-customer-select";
import { useTrigger } from "@/components/crm/context/triggerContext";
import Link from "next/link";
const Cookies = require("js-cookie");

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  // content: string;
  title: string;
  fetchApi?: (arrCustomerId: any) => Promise<void>;
}

const ModalChooseCustomer: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  title = "Chọn liên hệ",
  fetchApi,
}) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [searchParam, setSearchParam] = useState({});
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [arrCustomerId, setArrCustomerId] = useState([]);
  const [errorSelectedValue, setErrorSelectedValue] = useState(false);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const { trigger, setTrigger } = useTrigger();

  // const handleOK = () => {
  //   setIsModalCancel(false);
  //   router.push("/order/list");
  // };
  const handleOK = async () => {
    const isValidSharing = validate();
    if (isValidSharing) {
      try {
        // await fetch(
        //   `https://api.timviec365.vn/api/crm/customerdetails/add-campaign-customer`,
        //   {
        //     method: "POST",
        //     headers: {
        //       Authorization: `Bearer ${Cookies.get("token_base365")}`,
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       arr_campaign_id: [Number(router.query.id)],
        //       arr_cus_id: arrCustomerId,
        //     }),
        //   }
        // );
        await fetchApi(arrCustomerId);

        setTrigger(true);

        setIsModalCancel(false);
        setIsOpenMdalSuccess(true);
        setTimeout(() => {
          setIsOpenMdalSuccess(false);
        }, 2000);
      } catch (error) {}

      // await fetchData();
    }
  };
  const validate = () => {
    if (arrCustomerId.length < 0) {
      setErrorSelectedValue(true);
      return false;
    } else {
      setErrorSelectedValue(false);
      return true;
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        {/* <TabOrderList /> */}
        <div
          style={{ marginTop: "0px" }}
          className={`${styles.main__control_btn} flex_between`}
        >
          <div className={styles.main__control_search_campaign}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = inputRef?.current?.value;
                setSearchParam((prev) => {
                  return {
                    ...prev,
                    keyword: value,
                    //
                  };
                });
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng"
              />
              <button className={styles.kinh_lup}>
                <img
                  className={styles.img__search}
                  src="/crm/search.svg"
                  alt="hungha365.com"
                />
              </button>
            </form>
          </div>
          <div className={`${styles.main__control_add} flex_end`}>
            <Link href={"/customer/add"}>
              <button
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" alt="hungha365" />
                Thêm mới
              </button>
            </Link>
          </div>
        </div>
        {
          <TableDataCampaignCustomerSelect
            searchParam={searchParam}
            setSelected={setIsSelectedRow}
            setNumberSelected={setNumberSelected}
            setArrCustomerId={setArrCustomerId}
          />
        }
      </Modal>
    </>
  );
};

export default ModalChooseCustomer;
