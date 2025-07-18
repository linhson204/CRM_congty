import style from "./information.module.css";
import PotentialSelectBox from "../potential_selectt";
import TablePotentialItem from "../../table/table-potential-item";
import { CheckSquareOutlined } from "@ant-design/icons";
import ShowProductPO from "../mdal_action/mdal_show_product";
import { useEffect, useMemo, useState } from "react";
import { axiosCRM } from "@/utils/api/api_crm";
import SelectSingle from "@/components/commodity/select";
import { useRouter } from "next/router";
export default function ItemPotential() {
  const router = useRouter();
  const { id } = router.query;
  const [isModalCancelPO, setIsShowMdalCanCel] = useState(false);
  const onClose = () => {
    setIsShowMdalCanCel(false);
  };

  const [formSearch, setFormSearch] = useState<any>({
    recall: false,
    potential_id: id,
    page: 1,
    pageSize: 10,
  });
  const [listGroupProduct, setListGroupProduct] = useState([]);
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group")
      .then(
        (res) =>
          res.data.data.data.length > 0 && handleGroup(res.data.data.data)
      )
      .catch((error) => console.log("reCallGroup", error));
  }, []);
  const handleGroup = (datas) => {
    setListGroupProduct(
      datas.map((dt: any) => ({
        value: dt._id,
        label: dt.gr_name,
      }))
    );
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setFormSearch({ ...formSearch, recall: !formSearch.recall });
  };
  return (
    <div>
      <div style={{ width: "30%" }} className={style.selectbox}>
        <SelectSingle
          placeholder="Tất cả"
          title="Nhóm hàng hóa"
          setFormData={setFormSearch}
          onChange={() =>
            setFormSearch({ ...formSearch, recall: !formSearch.recall })
          }
          name="product_group"
          data={listGroupProduct}
        />
        {/* <PotentialSelectBox title="Nhóm hàng hoá:" value="Tất cả" /> */}
      </div>
      <div className={style.input_search}>
        <div className={style.main__control_search}>
          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              className={style.input__search}
              onChange={(e) =>
                setFormSearch({ ...formSearch, product_name: e.target.value })
              }
              placeholder="Tìm kiếm theo tên hàng hoá"
            />
            <button className={style.kinh_lup}>
              <img
                className={style.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <button
          onClick={() => setIsShowMdalCanCel(true)}
          className={style.choose_button}
        >
          <CheckSquareOutlined rev={null} /> Chọn vào
        </button>
      </div>
      <div>
        <TablePotentialItem
          formSearch={formSearch}
          setFormSearch={setFormSearch}
        />
      </div>
      <ShowProductPO
        recall={() => {
          setFormSearch({ ...formSearch, recall: !formSearch.recall });
        }}
        isModalCancelPO={isModalCancelPO}
        onClose={onClose}
      />
    </div>
  );
}
