import SelectSingle from "@/components/commodity/select";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";
import styles from "@/components/commodity/potential2.module.css";
// import styleCommodity from "../commodity/commodity.css ";
import { useEffect, useRef, useState } from "react";
import TableCommodityList from "@/components/crm/table/table-commodity-list";
import { axiosCRM } from "@/utils/api/api_crm";
import { getCategory, renderCategory } from "@/utils/listOption";
import Image from "next/image";
import { ExcelDownload } from "@/components/commodity/excelDownload";
import { ngayHomNay } from "@/utils/function";
import { InputSearch } from "@/components/commodity/input";
import { useRouter } from "next/router";
import useLoading from "@/components/crm/hooks/useLoading";
import { Spin } from "antd";

function commodityList() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [listProduct, setListProduct] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [listGroup, setListGroup] = useState([]);
  const [recall, setRecall] = useState(true);
  const [formSearch, setFormSearch] = useState<any>({});
  const [total, setTotal] = useState(0);
  const { isLoading, startLoading, stopLoading, loadingComponent } =
    useLoading();
  useEffect(() => {
    setHeaderTitle("Danh sách vật tư hàng hóa");
    setShowBackButton(false);
    setCurrentPath("/commodity/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group")
      .then(
        (res) =>
          res.data.data.data.length > 0 && handleGroup(res.data.data.data)
      )
      .catch((error) => console.log("reCallGroup", error));
  }, []);
  //Search
  useEffect(() => {
    startLoading();
    axiosCRM
      .post("/product/show-product", {
        ...formSearch,
        page: page,
        page_size: pageSize,
      })
      .then((res) => {
        setTotal(res.data.data.count);
        convertDataToTable(res.data.data.data);
      })
      .catch((err) => console.log("commodityList", err));
    stopLoading();
  }, [recall, page, pageSize]);
  const handleExportExcel = () => {
    const headerName = [
      "Mã vật tư, hàng hóa",
      "Vật tư,hàng hóa",
      "Tính chất",
      "Đơn vị tính",
      "Giá vốn (VNĐ)",
      "Đơn giá (VNĐ)",
      "Tồn tối thiểu",
      "Nhóm vật tư, hàng hóa",
      "Mô tả ",
    ];
    const dataExcel = listProduct.map((data) => [
      data.idCommodity,
      data.name,
      data.category,
      data.unit,
      data.capital_price,
      data.price,
      data.min_amount,
      data.group,
      data.description,
    ]);
    ExcelDownload(
      [headerName, ...dataExcel],
      `Danh sách vật tư hàng hóa ngày ${ngayHomNay()} `
    );
  };
  const handleGroup = (datas) => {
    setListGroup(
      datas.map((dt: any) => ({
        value: dt._id,
        label: dt.gr_name,
      }))
    );
  };

  const convertDataToTable = (datas: any) => {
    let dataReturn: any = [];
    if (datas.length > 0) {
      dataReturn = datas.map((data: any) => ({
        idCommodity: data._id,
        name: (
          <p
            className={styles.justify_center}
            onClick={() => router.push(`/commodity/detail/${data._id}`)}
          >
            <span className={styles.name_product}> {data.prod_name}</span>
          </p>
        ),
        category: renderCategory(data.category),
        unit: data.dvt?.unit_name,
        capital_price: data.capital_price,
        price: data.price,
        min_amount: data.min_amount,
        group: data.group_id?.gr_name,
        description: data.description,
      }));
    }
    setListProduct(dataReturn);
  };

  return (
    <div ref={mainRef} className={styleHome.main}>
      <div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <SelectSingle
            onChange={() => setRecall(!recall)}
            data={listGroup}
            title="Nhóm vật tư hàng hóa"
            setFormData={setFormSearch}
            formData={formSearch}
            value={formSearch.gr_id}
            name="gr_id"
            placeholder="Tất cả"
          />
          <div style={{ marginLeft: "20px", width: "100%" }}>
            <SelectSingle
              onChange={() => setRecall(!recall)}
              data={getCategory}
              title="Tính chất"
              setFormData={setFormSearch}
              name="category"
              placeholder="Tất cả"
            />
          </div>
        </div>
        <div className={styles.box_search_new}>
          <InputSearch
            onSubmit={() => setRecall(!recall)}
            placeholder="Tìm kiếm theo mã"
            value={formSearch.prod_id}
            setFormData={setFormSearch}
            name="prod_id"
          />
          <div className={`${styles.main__control_add} flex flex_end`}>
            <Link href="/commodity/addNew">
              <button
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" />
                Thêm mới
              </button>
            </Link>
            <button
              type="button"
              onClick={handleExportExcel}
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            >
              <img src="/crm/icon_excel.svg" />
              Xuất excel
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        loadingComponent()
      ) : (
        <TableCommodityList
          total={total}
          data={listProduct}
          setRecall={setRecall}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize} /* pageSize={pageSize}  */
        />
      )}
    </div>
  );
}

export default commodityList;
