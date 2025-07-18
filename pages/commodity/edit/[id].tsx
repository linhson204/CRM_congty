import FooterAddFiles, {
  MAddModal,
  MCancelModal,
  MModalCompleteStep,
} from "@/components/commodity/modal";
import SelectSingle, {
  InputAndSelect,
  SelectSingleAndAdd,
  SelectSingleAndOption,
} from "@/components/commodity/select";
import styleHome from "@/components/crm/home/home.module.css";
("");
import styles from "@/components/commodity/potential.module.css";
import stylesAdd from "@/components/commodity/add_file_commodity.module.css";

import TextEditor from "@/components/crm/text-editor/text_editor";
import { axiosCRM, axiosCRMUpfile } from "@/utils/api/api_crm";
import {
  convertTimestampToDate,
  ngayHomNay,
  notifyError,
  notifyWarning,
} from "@/utils/function";
import { useEffect, useRef, useState } from "react";
import { MInputText } from "@/components/commodity/input";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { ToastContainer } from "react-toastify";
import { getCategory, getListDate } from "@/utils/listOption";
import { useRouter } from "next/router";

function EditProduct() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [URLImg, setURLImg] = useState("");
  const [formData, setFormData] = useState<any>({});
  const [formAddGroup, setFormAddGroup] = useState<any>({});
  const [formAddUnit, setFormAddUnit] = useState<any>({});
  const [description, setDescription] = useState<string>("");
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [listUnit, setListUnit] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [openModalAddGroup, setOpenModalAddGroup] = useState<any>(false);
  const [openModalAddUnit, setOpenModalAddUnit] = useState<any>(false);
  const [reCallUnit, setRecallUnit] = useState(true);
  const [reCallGroup, setRecallGroup] = useState(true);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const { id } = router.query;
  //Set Header
  useEffect(() => {
    setHeaderTitle(`Chỉnh sửa sản phẩm`);
    setShowBackButton(false);
    setCurrentPath("/commodity/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  //Lấy dataProduct
  useEffect(() => {
    axiosCRM
      .post("/product/show-product", { prod_id: id })
      .then((res) => {
        setURLImg(res.data.data.data[0].product_image);
        setFormData({
          ...res.data.data.data[0],
          group_id: res.data.data.data[0]?.group_id?._id,
          dvt: res.data.data.data[0]?.dvt?._id,
        });
      })
      .catch((err) => notifyError("Vui lòng tải lại trang"));
  }, [id]);
  //Lấy về Unit
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-unit")
      .then((res) => {
        res.data.data.data.length > 0 &&
          setListUnit(
            res.data.data.data.map((dt: any) => ({
              value: dt._id,
              label: dt.unit_name,
            }))
          );
      })
      .catch((error) => console.log("reCallGroup", error));
  }, [reCallUnit]);
  //Lấy về Group
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group")
      .then(
        (res) =>
          res.data.data.data.length > 0 &&
          setListGroup(
            res.data.data.data.map((dt: any) => ({
              value: dt._id,
              label: dt.gr_name,
            }))
          )
      )
      .catch((error) => console.log("reCallGroup", error));
  }, [reCallGroup]);
  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setURLImg(URL.createObjectURL(file));
      setFormData({ ...formData, product_image: file });
    }
  };
  const handleAddProductGroup = () => {
    if (!formAddGroup.gr_name?.trim()) {
      notifyWarning("Nhập tên nhóm!");
      return;
    }
    axiosCRM
      .post("/product/add-product-group", formAddGroup)
      .then((res) => {
        setModal1Open(true);
        setOpenModalAddGroup(false);
        setRecallGroup(!reCallGroup);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };

  const handleRemoveImg = () => {
    setURLImg("");
    delete formData.product_image;
    setFormData({ ...formData });
  };
  const handleUpdateProduct = () => {
    if (URLImg != formData.product_image) {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      form.append("description", description);
      axiosCRMUpfile
        .post("/product/edit-product", form)
        .then((res) => {
          setModal1Open(true);
        })
        .catch((err) => notifyError("Vui lòng thử lại sau!"));
    } else {
      axiosCRM
        .post("/product/edit-product", {
          ...formData,
          description: description,
        })
        .then((res) => {
          setModal1Open(true);
        })
        .catch((err) => notifyError("Vui lòng thử lại sau!"));
    }
  };
  const handleAddUnit = () => {
    if (!formAddUnit.unit_name?.trim()) {
      notifyWarning("Nhập tên đơn vị tính!");
      return;
    }
    axiosCRM
      .post("/product/add-product-unit", formAddUnit)
      .then((res) => {
        setModal1Open(true);
        setOpenModalAddUnit(false);
        setRecallUnit(!reCallUnit);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };

  console.log("EditProduct", formData);
  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới vật tư hàng hóa</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}>
                  <div className={styles.group_infor_user_containter}>
                    <div>
                      <SelectSingleAndOption
                        title="Tính chất"
                        formData={formData}
                        setFormData={setFormData}
                        value={formData.category}
                        data={getCategory}
                        valueChecked={formData.tracking}
                        name="category"
                        nameChecked="tracking"
                        placeholder="Chọn tính chất"
                        labelChecked="Theo dõi theo lô, hạn sử dụng."
                      />
                      <MInputText
                        disable
                        placeholder="Nhập tên vật tư,hàng hóa"
                        require={true}
                        label="Tên vật tư, hàng hóa"
                        value={formData.prod_name}
                        name="prod_name"
                        setFormData={setFormData}
                      />
                      <MInputText
                        placeholder="Nhập mã vạch"
                        // require={true}
                        label="Mã vạch"
                        value={formData.barcode}
                        name="barcode"
                        setFormData={setFormData}
                      />
                      <SelectSingleAndAdd
                        data={listGroup}
                        title="Nhóm vật tư, hàng hóa"
                        titleAdd="Thêm nhóm"
                        value={formData.group_id}
                        name="group_id"
                        handleAdd={() => setOpenModalAddGroup(true)}
                        formData={formData}
                        setFormData={setFormData}
                        placeholder="Chọn nhóm vật tư hàng hóa"
                      />
                      <SelectSingleAndAdd
                        data={listUnit}
                        title="Đơn vị tính"
                        titleAdd="Thêm đơn vị tính"
                        value={formData.dvt}
                        name="dvt"
                        handleAdd={() => setOpenModalAddUnit(true)}
                        formData={formData}
                        setFormData={setFormData}
                        placeholder="Chọn đơn vị tính"
                      />
                      <MInputText
                        disable
                        placeholder="Nhập giá vốn"
                        require={true}
                        label="Giá vốn (VNĐ)"
                        type="number"
                        value={formData.capital_price}
                        name="capital_price"
                        setFormData={setFormData}
                      />
                      <MInputText
                        disable
                        placeholder="Nhập giá bán (VNĐ)"
                        require={true}
                        label="Giá bán (VNĐ)"
                        type="number"
                        value={formData.price}
                        name="price"
                        setFormData={setFormData}
                      />
                      <InputAndSelect
                        title="Bảo hành"
                        placeholder="Nhập số "
                        type="number"
                        setFormData={setFormData}
                        inputValue={formData.bao_hanh}
                        inputName="bao_hanh"
                        selectName="bao_hanh_type"
                        selectData={getListDate}
                        selectValue={formData.warranty_type}
                      />
                      <div className={styles.input_group_last2}>
                        {" "}
                        <MInputText
                          label="Nguồn gốc"
                          placeholder="Nhập nguồn gốc"
                          name="product_origin"
                          value={formData.product_origin}
                          setFormData={setFormData}
                        />
                        <MInputText
                          label="Số lượng tối thiểu"
                          placeholder="Số lượng tối thiểu"
                          name="min_amount"
                          value={formData.min_amount}
                          setFormData={setFormData}
                        />
                      </div>
                      <div className={styles.text_editor2}>
                        <TextEditor
                          des={formData.description}
                          setEditorContent={setDescription}
                        />
                      </div>
                    </div>{" "}
                    <div>
                      <div className={styles.img_product_container}>
                        {!URLImg && (
                          <div>
                            <label
                              style={{
                                textAlign: "center",
                              }}
                              htmlFor="inputImage"
                            >
                              <img src="/crm/camera.png" alt="camera" />
                              <p>Tải lên hình ảnh</p>
                            </label>
                            <input
                              onChange={(e) => handleChangeImage(e)}
                              style={{ display: "none" }}
                              id="inputImage"
                              type="file"
                              accept="image/png,image/gif,image/jpeg"
                            />
                          </div>
                        )}

                        {URLImg && (
                          <img onClick={handleRemoveImg} src={URLImg} alt="/" />
                        )}
                      </div>
                      <div className={styles.text_editor1}>
                        <TextEditor
                          des={formData.description}
                          setEditorContent={setDescription}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.input_group_last}>
                    {/* co lại sẽ mất */}
                    <div className={styles.input_group_last1}>
                      {" "}
                      <MInputText
                        label="Nguồn gốc"
                        placeholder="Nhập nguồn gốc"
                        name="product_origin"
                        value={formData.product_origin}
                        setFormData={setFormData}
                      />
                      <MInputText
                        label="Số lượng tối thiểu"
                        placeholder="Số lượng tối thiểu"
                        name="min_amount"
                        value={formData.min_amount}
                        setFormData={setFormData}
                      />
                    </div>
                    <div>
                      <MInputText
                        label="Người tạo"
                        disable={true}
                        value={formData.userName}
                      />
                      <MInputText
                        label="Ngày tạo"
                        value={convertTimestampToDate(formData.created_at)}
                        disable={true}
                      />
                    </div>
                  </div>
                  <div className={stylesAdd.main__footer}>
                    <button
                      type="button"
                      onClick={() => setIsModalCancel(true)}
                    >
                      Hủy
                    </button>
                    <button
                      className={stylesAdd.save}
                      type="submit"
                      onClick={handleUpdateProduct}
                    >
                      Lưu
                    </button>

                    {
                      <MCancelModal
                        isModalCancel={isModalCancel}
                        setIsModalCancel={setIsModalCancel}
                        content={
                          "Bạn có chắc chắn muốn hủy thêm mới vật tư, hàng hóa mọi dữ liệu được nhập sẽ không được lưu lại?"
                        }
                        title={"Hủy thêm mới nhóm vật tư,hàng hóa"}
                        link={"/commodity/list"}
                      />
                    }

                    <MModalCompleteStep
                      modal1Open={modal1Open}
                      setModal1Open={setModal1Open}
                      title={"Thành công"}
                      link={"/commodity/list"}
                    />
                  </div>
                  <MAddModal
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
                  <MAddModal
                    setFormAdd={setFormAddUnit}
                    openModalAdd={openModalAddUnit}
                    setOpenModalAdd={setOpenModalAddUnit}
                    label="Tên đơn vị tính"
                    title="Thêm đơn vị tính"
                    name="unit_name"
                    placeholder="Nhập tên đơn vị tính"
                    description="description"
                    handleAdd={handleAddUnit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default EditProduct;
