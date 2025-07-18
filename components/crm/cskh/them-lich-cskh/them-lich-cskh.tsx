import styles from "../chitietkhaosat/index.module.css";
import styless from "../../potential/potential.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectProps,
  Table,
} from "antd";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import ModalCancel from "./modalcancel";
export default function ThemLichCSKH() {
  const [showOp, setShowOp] = useState(false);
  const [keyNhom, setKeyNhom] = useState<any>();
  const [keyGioiTinh, setKeyGioiTinh] = useState<any>();
  const [keyNgaysinh, setKeyNgaysinh] = useState<any>();
  const [keyDiaChi, setKeyDiaChi] = useState<any>();
  const [keyNV, setKeyNV] = useState<any>();
  const [keyNgayTao, setKeyNgaoTao] = useState<any>();
  const [keyNguonKh, setKeyNguonKh] = useState<any>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const [countNhom, setCountNhom] = useState(1);
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    street: string;
    building: string;
    number: number;
    companyAddress: string;
    companyName: string;
    gender: string;
  }
  const handleChange = (value: string) => {
    setShowOp(!showOp);
    switch (value[0]) {
      case "Nhóm":
        setKeyNhom("Nhóm");
        break;
      case "Giới tính":
        setKeyGioiTinh("Giới tính");
        break;
      case "Ngày sinh":
        setKeyNgaysinh("Ngày sinh");
        break;
      case "Địa chỉ":
        setKeyDiaChi("Địa chỉ");
        break;
      case "Nhân viên phụ trách":
        setKeyNV("Nhân viên phụ trách");
        break;
      case "Ngày tạo khách hàng":
        setKeyNgaoTao("Ngày tạo khách hàng");
        break;
      case "Nguồn khách hàng":
        setKeyNguonKh("Nguồn khách hàng");
        break;

      default:
        break;
    }
  };
  const handleChange2 = (value: string) => {};
  const handleChange3 = (value: string) => {
    switch (value[0]) {
      case "Nhóm":
        setKeyNhom("Nhóm");
        break;
      case "Giới tính":
        setKeyGioiTinh("Giới tính");
        break;
      case "Ngày sinh":
        setKeyNgaysinh("Ngày sinh");
        break;
      case "Địa chỉ":
        setKeyDiaChi("Địa chỉ");
        break;
      case "Nhân viên phụ trách":
        setKeyNV("Nhân viên phụ trách");
        break;
      case "Ngày tạo khách hàng":
        setKeyNgaoTao("Ngày tạo khách hàng");
        break;
      case "Nguồn khách hàng":
        setKeyNguonKh("Nguồn khách hàng");
        break;

      default:
        break;
    }
  };
  const AddNguon = () => {
    let Nguon = [];
    Nguon.push(
      <div key={"2"} className={styles.add}>
        <Button disabled>Nguồn</Button>
        <div style={{ width: "40%" }}>
          <Select placeholder="Chọn nguồn khách hàng" style={{ width: "100%" }}>
            <option value={"facebook"}>FaceBook</option>
            <option value={"zalo"}>Zalo</option>
            <option value={"web"}>WebSite</option>
            <option value={"gioithieu"}>Giới thiệu</option>
          </Select>
        </div>

        <Select
          mode="tags"
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          value={selectedValues}
          options={options}
          placeholder="Thêm mới khách hàng"
        />
      </div>
    );
    return <div>{Nguon}</div>;
  };

  const AddNgayTao = () => {
    let NgayTao = [];
    NgayTao.push(
      <div key={"2"} className={styles.add}>
        <Button
          style={{ width: 90, textAlign: "center", alignItems: "center" }}
        >
          Ngày tạo
        </Button>
        <div className={styles.formNgaysinh}>
          <div className={styles.datengaysinh}>
            <DatePicker
              style={{ width: "100  %" }}
              placeholder="dd/mm/yyy"
              picker="date"
              className={styles.dateinput}
            />
          </div>

          <div>&nbsp;đến&nbsp;</div>
          <div className={styles.datengaysinh}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="dd/mm/yyy"
              picker="date"
              className={styles.dateinput}
            />
          </div>
        </div>

        <Select
          mode="tags"
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          options={options}
          placeholder="Thêm mới khách hàng"
          value={selectedValues}
        />
      </div>
    );
    return <div>{NgayTao}</div>;
  };

  const AddNV = () => {
    let NV = [];
    NV.push(
      <div key={"2"} className={styles.add}>
        <Button disabled>Nhân viên</Button>
        <div style={{ width: "40%" }}>
          <Select placeholder="Chọn nhân viên" style={{ width: "100%" }}>
            <option>Nhân viên 1</option>
            <option>Nhân viên 2</option>
            <option>Nhân viên 3</option>
          </Select>
        </div>

        <Select
          mode="tags"
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          options={options}
          placeholder="Thêm mới khách hàng"
          value={selectedValues}
        />
      </div>
    );
    return <div>{NV}</div>;
  };
  const AddDiaChi = () => {
    let DiaChi = [];
    DiaChi.push(
      <div key={"2"} className={styles.add}>
        <Button disabled>Địa chỉ</Button>
        <div style={{ width: "40%" }}>
          <Select placeholder="Chọn tỉnh thành" style={{ width: "100%" }}>
            <option>Bắc Ninh</option>
            <option>Hà Nội</option>
            <option>TP Hồ Chí Minh</option>
          </Select>
        </div>

        <Select
          value={selectedValues}
          mode="tags"
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          options={options}
          placeholder="Thêm mới khách hàng"
        />
      </div>
    );
    return <div>{DiaChi}</div>;
  };
  const AddNgaySinh = () => {
    let NgaySinh = [];
    NgaySinh.push(
      <div key={"2"} className={styles.add}>
        <Button
          style={{ width: 90, textAlign: "center", alignItems: "center" }}
        >
          Ngày sinh
        </Button>
        <div className={styles.formNgaysinh}>
          <div className={styles.datengaysinh}>
            <DatePicker
              style={{ width: "100  %" }}
              placeholder="dd/mm/yyy"
              picker="date"
              className={styles.dateinput}
            />
          </div>

          <div>&nbsp;đến&nbsp;</div>
          <div className={styles.datengaysinh}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="dd/mm/yyy"
              picker="date"
              className={styles.dateinput}
            />
          </div>
        </div>

        <Select
          value={selectedValues}
          mode="tags"
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          options={options}
          placeholder="Thêm mới khách hàng"
        />
      </div>
    );
    return <div>{NgaySinh}</div>;
  };
  const AddNhom = () => {
    let Nhom = [];
    Nhom.push(
      <div key={"1"} className={styles.add}>
        <Button disabled>{keyNhom}</Button>
        <Select
          mode="tags"
          style={{ width: "40%" }}
          onChange={handleChange2}
          tokenSeparators={[","]}
          options={options2}
          placeholder="Chọn nhóm khách hàng"
        />

        <Select
          mode="tags"
          value={selectedValues}
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          options={options}
          placeholder="Thêm mới khách hàng"
        />
      </div>
    );
    return <div>{Nhom}</div>;
  };
  const AddGioiTinh = () => {
    let Nhom = [];
    Nhom.push(
      <div key={"2"} className={styles.add}>
        <Button disabled>{keyGioiTinh}</Button>
        <div style={{ display: "flex" }} className={styles.select}>
          <Checkbox>Nam</Checkbox>
          <Checkbox>Nữ</Checkbox>
          <Checkbox>Khác</Checkbox>
        </div>
        <Select
          mode="tags"
          value={selectedValues}
          style={{ width: "40%" }}
          onChange={handleChange3}
          tokenSeparators={[","]}
          options={options}
          placeholder="Thêm mới khách hàng"
        />
      </div>
    );
    return <div>{Nhom}</div>;
  };

  const options2: SelectProps["options"] = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
  ];
  const options: SelectProps["options"] = [
    {
      value: "Nhóm",
      label: "Nhóm",
    },
    {
      value: "Giới tính",
      label: "Giới tính",
    },
    {
      value: "Ngày sinh",
      label: "Ngày sinh",
    },
    {
      value: "Địa chỉ",
      label: "Địa chỉ",
    },
    {
      value: "Nhân viên phụ trách",
      label: "Nhân viên phụ trách",
    },
    {
      value: "Ngày tạo khách hàng",
      label: "Ngày tạo khách hàng",
    },
    {
      value: "Nguồn khách hàng",
      label: "Nguồn khách hàng",
    },
  ];

  const router = useRouter();
  const path = router.query;
  const handleSave = () => {
    setIsShowModal(true);
  };
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      router.push("/phieu-thu");
    } else {
    }
  };
  const columns: any = [
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "Thứ trong tuần",
      children: [
        {
          title: "Thứ 2",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 3",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 4",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 5",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 6",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 7",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Chủ nhật",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
      ],
    },

    {
      title: "Tuần",
      children: [
        {
          title: "Tuần 1",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Tuần 2",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Tuần 3",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Tuần 4",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
      ],
    },
    {
      title: "Diễn ra tháng",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Tổng chăm sóc",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Bắt đầu",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
  ];

  const data: DataType[] = [];

  return (
    <div>
      <div className={styles.headercontentCS}>
        Thêm lịch chăm sóc khách hàng
      </div>
      <div className={styles.contentheader}>
        <div className={styles.fieldset}>
          <div className={styles.info2}>
            <div className={styles.left}>Tên lịch </div>
            <div className={styles.right}>
              <Input placeholder="Nhập tên lịch chăm sóc khách hàng" />
            </div>
          </div>
          <div className={styles.info2}>
            <div className={styles.left}>Người tạo </div>
            <div
              className={styles.right}
              style={{ padding: "5px 3px 5px 10px" }}
            >
              <PotentialSelectBoxStep
                value="Tên nhà cung cấp "
                placeholder="Chọn người tạo"
              />
            </div>
          </div>
          <div className={styles.info2}>
            <div className={styles.left}>Ngày tạo </div>
            <div className={styles.right}>
              <DatePicker
                placeholder="dd/mm/yyy"
                picker="date"
                className={styles.dateinput}
              />
            </div>
          </div>
          <div className={styles.info2}>
            <div className={styles.left}>Hình thức chăm sóc </div>
            <div className={styles.right}>
              <Input placeholder="Nhập hình thức chăm sóc" />
            </div>
          </div>
          <div className={styles.info2}>
            <div className={styles.left}>Mô tả </div>
            <div className={styles.right}>
              <Input placeholder="Nhập mô tả" />
            </div>
          </div>

          <div className={styles.info2}>
            <div className={styles.left}>Thiết lập lịch</div>
            <div
              className={styles.right}
              style={{ padding: "5px 3px 5px 10px" }}
            >
              <PotentialSelectBoxStep
                value="Chọn toàn bộ "
                placeholder="Lịch riêng từng khách hàng"
              />
            </div>
          </div>

          <div className={styles.info2}>
            <div
              className={styles.left}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingTop: 20,
              }}
            >
              Thêm khách hàng
            </div>
            <div className={styles.right}>
              {!showOp ? (
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  tokenSeparators={[","]}
                  options={options}
                  placeholder="Chọn khách hàng"
                />
              ) : (
                <div className={styles.add2}>
                  <div>{keyNhom == "Nhóm" && <div> {AddNhom()}</div>}</div>
                  <div>
                    {keyGioiTinh == "Giới tính" && <div> {AddGioiTinh()}</div>}
                  </div>
                  <div>
                    {keyNgaysinh == "Ngày sinh" && <div> {AddNgaySinh()}</div>}
                  </div>
                  <div>
                    {keyDiaChi == "Địa chỉ" && <div> {AddDiaChi()}</div>}
                  </div>

                  <div>
                    {keyNV == "Nhân viên phụ trách" && <div> {AddNV()}</div>}
                  </div>
                  <div>
                    {keyNgayTao == "Ngày tạo khách hàng" && (
                      <div> {AddNgayTao()}</div>
                    )}
                  </div>
                  <div>
                    {keyNguonKh == "Nguồn khách hàng" && (
                      <div> {AddNguon()}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Table
          style={{ paddingTop: 20 }}
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
          scroll={{ x: 1500, y: "100%" }}
        />
      </div>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          gap: 15,
        }}
      >
        <div>
          <Button
            onClick={() => setIsShowModal(true)}
            style={{
              width: 200,
              color: "#4c5bd4",
              border: "1px solid #4c5bd4",
            }}
          >
            Hủy
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              router.push("/lich-cham-soc-khach-hang");
            }}
            style={{
              width: 200,
              color: "#fff",
              background: "#4c5bd4",
              border: "1px solid #4c5bd4",
            }}
          >
            Lưu
          </Button>
          <ModalCancel isShowModal={isShowModal} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
