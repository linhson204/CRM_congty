import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import styles from "@/components/commodity/potential.module.css";
import styleHome from "@/components/crm/home/home.module.css";
import { axiosCRM } from "@/utils/api/api_crm";
import {
  convertTimestampToDate,
  notifyError,
  notifySuccess,
} from "@/utils/function";
import { renderCategory, renderListDate } from "@/utils/listOption";
import { MCancelModal } from "@/components/commodity/modal";

function DetailProduct() {
  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { id } = router.query;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [dataProduct, setDataProduct] = useState<any>({});
  //Set Header
  useEffect(() => {
    setHeaderTitle(`Chi tiết sản phẩm`);
    setShowBackButton(true);
    setCurrentPath("/commodity/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRM
      .post("/product/detail-product", { prod_id: id })
      .then((res) => setDataProduct(res.data.data.data))
      .catch((err) => notifyError("Đã có lỗi xảy ra vui lòng thử lại!"));
  }, [id]);
  const handleDelete = () => {
    axiosCRM.post("/product/del-product", { prod_id: id }).then((res) => {
      notifySuccess("Xóa thành công!");
      setTimeout(() => {
        router.push("/commodity/list");
      }, 2000);
    });
  };
  console.log("CHECK DATA", dataProduct);
  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.box_btn_detail}>
        <button
          onClick={() => router.push(`/commodity/edit/${id}`)}
          className={styles.dropbtn_add}
        >
          <img src="/crm/sua_t.png" alt="" /> Chỉnh sửa
        </button>
        <button
          onClick={() => setOpenDeleteModal(true)}
          className={styles.btn_delete}
        >
          <img src="/crm/h_delete_cus.svg" alt="" />
          Xóa
        </button>
      </div>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thông tin vật tư hàng hóa</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}>
                  <div className={styles.main_content}>
                    <div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Tính chất:</p>
                        <p className={styles.infor_value}>
                          {renderCategory(dataProduct?.category)}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}>
                          {" "}
                          Tên vật tư,hàng hóa:
                        </p>
                        <p className={styles.infor_value}>
                          {dataProduct?.prod_name}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Mã vạch:</p>
                        <p className={styles.infor_value}>
                          {dataProduct?.barcode}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}>
                          {" "}
                          Nhóm vật tư, hàng hóa:
                        </p>
                        <p className={styles.infor_value}>
                          {dataProduct?.group_id?.gr_name}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Đơn vị tính:</p>
                        <p className={styles.infor_value}>
                          {dataProduct?.dvt?.unit_name}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Giá vốn:</p>
                        <p className={styles.infor_value}>
                          {dataProduct?.capital_price}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Giá bán:</p>
                        <p className={styles.infor_value}>
                          {dataProduct?.price}{" "}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> VAT(%):</p>
                        <p className={styles.infor_value}>
                          0 (chỗ này cần xem lại)
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Bảo hành:</p>
                        <p className={styles.infor_value}>
                          {dataProduct.bao_hanh
                            ? `${dataProduct.bao_hanh} ${renderListDate(
                                dataProduct?.warranty_type
                              )}`
                            : "Không bảo hành"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong> Hình ảnh vật tư hàng hóa</strong>
                      </div>
                      <div className={styles.img_product_container}>
                        {dataProduct.product_image ? (
                          <img
                            src={dataProduct.product_image}
                            alt="product_image"
                          />
                        ) : (
                          "Chưa có hình ảnh"
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.prod_infor_last}>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Nguồn gốc:</p>
                        <p className={styles.infor_value}>
                          {dataProduct?.product_origin}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Người tạo:</p>
                        <p className={styles.infor_value}>Thiếu tên công ty</p>
                      </div>
                    </div>
                    <div className={styles.prod_infor_last}>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}>
                          {" "}
                          Số lượng tối thiểu:
                        </p>
                        <p className={styles.infor_value}>
                          {dataProduct?.min_amount}
                        </p>
                      </div>
                      <div className={styles.prod_infor}>
                        <p className={styles.infor_label}> Ngày tạo:</p>
                        <p className={styles.infor_value}>
                          {convertTimestampToDate(dataProduct?.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MCancelModal
        isModalCancel={openDeleteModal}
        setIsModalCancel={setOpenDeleteModal}
        title="Xóa vật tư, hàng hóa"
        updateData={handleDelete}
        content={
          <div>
            Bạn muốn xóa{" "}
            <span style={{ color: "red", fontWeight: "600" }}>
              {dataProduct.prod_name}
            </span>{" "}
            khỏi danh sách?{" "}
          </div>
        }
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default DetailProduct;
