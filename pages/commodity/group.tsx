import { useHeader } from "@/components/crm/hooks/useHeader";
import { axiosCRM } from "@/utils/api/api_crm";
import { ngayHomNay, notifyError, notifyWarning } from "@/utils/function";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import styles from "@/components/commodity/potential2.module.css";
import { InputSearch } from "@/components/commodity/input";
import Image from "next/image";
import styleHome from "@/components/crm/home/home.module.css";
import TableCommodityList from "@/components/crm/table/table-commodity-list";
import TableCommodityGroup from "@/components/crm/table/table-commodity-group";
import { MAddModal } from "@/components/commodity/modal";
import { ExcelDownload } from "@/components/commodity/excelDownload";

function CommodityGroup() {
  const [listGroup, setListGroup] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recall, setRecall] = useState(true);
  const [total, setTotal] = useState(0);
  const [formSearch, setFormSearch] = useState<any>({});
  const [formAddGroup, setFormAddGroup] = useState<any>({});
  const [openModalAddGroup, setOpenModalAddGroup] = useState<any>(false);

  const mainRef = useRef<HTMLDivElement>(null);

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle("Nhóm vật tư, hàng hóa");
    setShowBackButton(false);
    setCurrentPath("/commodity/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group", {
        ...formSearch,
        page: page,
        page_size: pageSize,
      })
      .then((res) => {
        handleConvertDataTable(res.data.data.data);
        setTotal(res.data.data.count);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau"));
  }, [page, pageSize, recall]);
  const handleConvertDataTable = (datas) => {
    let dataReturn: any = [];
    if (datas.length > 0) {
      dataReturn = datas?.map((item: any, index: number) => ({
        ...item,
        gr_id: item._id,
        stt: (page - 1) * pageSize + index + 1,
      }));
    }
    setListGroup(dataReturn);
  };
  const handleAddProductGroup = () => {
    if (!formAddGroup.gr_name?.trim()) {
      notifyWarning("Nhập tên nhóm!");
      return;
    }
    axiosCRM
      .post("/product/add-product-group", formAddGroup)
      .then((res) => {
        // setModal1Open(true);
        setOpenModalAddGroup(false);
        setRecall(!recall);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleExportExcel = () => {
    const headerTitle = ["STT", "Tên nhóm vật tư, hàng hóa", "Mô tả"];
    const data = listGroup.map((item) => [
      item.stt,
      item.gr_name,
      item.description,
    ]);
    ExcelDownload(
      [headerTitle, ...data],
      `Danh sách nhóm vật tư hàng hóa ${ngayHomNay()}`
    );
    console.log("handleExportExcel", data);
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
      {" "}
      <div>
        <div className={styles.box_search_new}>
          <InputSearch
            onSubmit={() => setRecall(!recall)}
            placeholder="Tìm kiếm theo tên"
            value={formSearch.gr_name}
            setFormData={setFormSearch}
            name="gr_name"
          />
          <div className={`${styles.main__control_add} flex flex_end`}>
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
              onClick={() => setOpenModalAddGroup(true)}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>

            <button
              type="button"
              onClick={handleExportExcel}
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            >
              <img src="/crm/icon_excel.svg" />
              Xuất excel
            </button>
            <button className={`${styles.btn_hdan} flex_align_center`}>
              <Image
                style={{ marginRight: "5px" }}
                alt="/"
                height={36}
                width={36}
                src={"/crm/l3_hc.png"}
              />{" "}
              Hướng dẫn
            </button>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
      <TableCommodityGroup
        total={total}
        data={listGroup}
        setRecall={setRecall}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
      <MAddModal
        formAdd={formAddGroup}
        setFormAdd={setFormAddGroup}
        openModalAdd={openModalAddGroup}
        setOpenModalAdd={setOpenModalAddGroup}
        label="Tên nhóm vật tư,hàng hóa"
        title="Thêm mới nhóm vật tư, hàng hóa"
        name="gr_name"
        placeholder="Nhập tên nhóm vật tư, hàng hóa"
        description="description"
        handleAdd={handleAddProductGroup}
      />
    </div>
  );
}

export default CommodityGroup;
