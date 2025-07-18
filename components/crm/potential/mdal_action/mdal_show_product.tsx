import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import styles from "@/components/crm/campaign/campaign.module.css";

import TablePotentialshowItem from "@/components/crm/table/table-potential-show-item";
import { axiosCRM } from "@/utils/api/api_crm";
import Link from "next/link";
import ShowCampaignPOMD from "./mdal_show_campaignPO";
import SelectSingle from "@/components/commodity/select";
import CampaignAction from "../../campaign/campaign_action";
import { MModalCompleteStep } from "@/components/commodity/modal";
import { notifyError } from "@/utils/function";
const ShowProductPO = (props: any) => {
  const router = useRouter();
  const { isModalCancelPO, onClose, recall } = props;
  const [showMdalAdd, setIsShowMdalADd] = useState(false);

  const [listGroupProduct, setListGroupProduct] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [formSearch, setFormSearch] = useState<any>({
    recall: true,
    page: 1,
    page_size: 40,
  });
  const { id } = router.query;
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  //lay ra group
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group")
      .then(
        (res) =>
          res.data.data.data.length > 0 && handleGroup(res.data.data.data)
      )
      .catch((error) => console.log("reCallGroup", error));
  }, []);
  useEffect(() => {
    axiosCRM
      .post("/product/show-product", formSearch)
      .then((res) => handleDataTable(res.data.data.data));
  }, [formSearch.recall]);
  const handleGroup = (datas) => {
    setListGroupProduct(
      datas.map((dt: any) => ({
        value: dt._id,
        label: dt.gr_name,
      }))
    );
  };
  const handleDataTable = (datas) => {
    const convert = [];
    datas?.forEach((item, index) =>
      convert.push({
        ...item,
        stt: index + 1,
        gr_name: item?.group_id?.gr_name,
        unit_name: item?.dvt?.unit_name,
        key: item._id,
      })
    );
    setListProduct(convert);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setFormSearch({ ...formSearch, recall: !formSearch.recall });
  };

  const handleAddProductInterest = () => {
    axiosCRM
      .post("/potential/addProductInterest", {
        arr_potential_id: [Number(id)],
        arr_product_id: selectedRowKeys,
      })
      .then((res) => {
        recall();
        setIsShowMdalADd(true);
      })
      .catch((err) => notifyError("Vui lòng thử lại!"));
  };
  console.log("ShowProductPO", id);
  // const onClose = () => {
  //   setIsModalCancelPO(false);
  // };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        width={750}
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "107%",
              margin: "-20px -30px",
            }}
          >
            <div style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Danh sách hàng hóa
            </div>
          </div>
        }
        centered
        open={isModalCancelPO}
        onOk={() => onClose()}
        onCancel={() => onClose()}
        okText="Đồng ý"
        cancelText="Huỷ"
        footer={
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "100px" }} onClick={() => onClose()}>
              <Button style={{ width: 150 }}>Hủy</Button>
            </div>
            <div style={{ width: "100px" }}>
              <Button
                onClick={handleAddProductInterest}
                style={{ width: 150, color: "#fff", background: "#4C5BD4" }}
              >
                Đồng ý
              </Button>
            </div>
          </div>
        }
      >
        <MModalCompleteStep
          modal1Open={showMdalAdd}
          setModal1Open={setIsShowMdalADd}
          title="Thêm hàng hóa thành công!"
        />

        <div style={{ paddingTop: 30 }}>
          <div className={styles.main__control}>
            <div className={`${styles.main__control_btn} flex_between`}>
              <SelectSingle
                title="Nhóm hàng hóa"
                data={listGroupProduct}
                setFormData={setFormSearch}
                name="gr_id"
                onChange={(e) =>
                  setFormSearch({ ...formSearch, recall: !formSearch.recall })
                }
              />
              <div className={styles.main__control_search}>
                <form onSubmit={handleSubmitSearch}>
                  <input
                    onChange={(e) =>
                      setFormSearch({ ...formSearch, gr_name: e.target.value })
                    }
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm theo tên hàng hóa"
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
                <Link
                  href={
                    router.pathname === "/potential/detail/[id]"
                      ? "#"
                      : "/crm/campaign/add"
                  }
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/add.svg" />
                  Thêm mới
                </Link>
              </div>
            </div>

            <CampaignAction />
          </div>
          {/* <CampaignInputGroupsModal /> */}
        </div>
        <TablePotentialshowItem
          selectedRowKeys={selectedRowKeys}
          data={listProduct}
        />
      </Modal>
    </>
  );
};

export default ShowProductPO;
