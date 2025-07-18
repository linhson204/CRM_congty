import { useHeader } from "@/components/crm/hooks/useHeader";
import { axiosCRM } from "@/utils/api/api_crm";
import { ngayHomNay, notifyError, notifyWarning } from "@/utils/function";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import styles from "@/components/commodity/potential2.module.css";
import { InputSearch } from "@/components/commodity/input";
import Image from "next/image";
import styleHome from "@/components/crm/home/home.module.css";
import { MAddModal } from "@/components/commodity/modal";
import { ExcelDownload } from "@/components/commodity/excelDownload";
import TableCommodityUnit from "@/components/crm/table/table-commodity-unit";

function CommodityUnit() {
  const [listUnit, setListUnit] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recall, setRecall] = useState(true);
  const [total, setTotal] = useState(0);
  const [formSearch, setFormSearch] = useState<any>({});
  const [formAddUnit, setFormAddUnit] = useState<any>({});
  const [openModalAddUnit, setOpenModalAddUnit] = useState<any>(false);

  const mainRef = useRef<HTMLDivElement>(null);

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle("Đơn vị tính");
    setShowBackButton(false);
    setCurrentPath("/commodity/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-unit", {
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
        unit_id: item._id,
        stt: (page - 1) * pageSize + index + 1,
      }));
    }
    setListUnit(dataReturn);
  };
  const handleAddUnit = () => {
    if (!formAddUnit.unit_name?.trim()) {
      notifyWarning("Nhập tên Đơn vị tính!");
      return;
    }
    axiosCRM
      .post("/product/add-product-unit", formAddUnit)
      .then((res) => {
        // setModal1Open(true);
        setOpenModalAddUnit(false);
        setRecall(!recall);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleExportExcel = () => {
    const headerTitle = ["STT", "Tên đơn vị tính", "Mô tả"];
    const data = listUnit.map((item) => [
      item.stt,
      item.unit_name,
      item.description,
    ]);
    ExcelDownload(
      [headerTitle, ...data],
      `Danh sách đơn vị tính ${ngayHomNay()}`
    );
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
      {" "}
      <div>
        <div className={styles.box_search_new}>
          <InputSearch
            onSubmit={() => setRecall(!recall)}
            placeholder="Tìm kiếm theo tên"
            value={formSearch.unit_name}
            setFormData={setFormSearch}
            name="unit_name"
          />
          <div className={`${styles.main__control_add} flex flex_end`}>
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
              onClick={() => setOpenModalAddUnit(true)}
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
      <TableCommodityUnit
        total={total}
        data={listUnit}
        setRecall={setRecall}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
      <MAddModal
        formAdd={formAddUnit}
        setFormAdd={setFormAddUnit}
        openModalAdd={openModalAddUnit}
        setOpenModalAdd={setOpenModalAddUnit}
        label="Tên đơn vị tính"
        title="Thêm mới đơn vị tính"
        name="unit_name"
        placeholder="Nhập tên đơn vị tính"
        description="description"
        handleAdd={handleAddUnit}
      />
    </div>
  );
}

export default CommodityUnit;
