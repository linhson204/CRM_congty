import { Button, Input, Pagination, Table } from "antd";
import styles from "../delete_data/table.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalDelete from "../delete_data/modal/modal_delete";
import ModalReturn from "../delete_data/modal/modal_return";
const Table_Form_Sms = (props: any) => {
  const { ColumFormSms, dataPotential, name } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const data = dataPotential;
  const columns = ColumFormSms;
  const [total, setTotal] = useState<number>(data.length);
  const start = () => {
    setSelectedRowKeys([]);
  };
  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const selectAll = () => {
    setSelectedRowKeys(dataPotential.map((item: any) => item.key));
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const suffix = (
    <SearchOutlined
      onClick={() => window.location.reload()}
      style={{
        fontSize: 20,
        color: "black",
      }}
    />
  );
  const handleDelete = () => {
    setIsShowModal(true);
  };
  const handleReturn = () => {
    setIsShowModalReturn(true);
  };
  const onChangePage = (page: any, pageSize: any) => {
    if (page != current) {
      setCurrent(page);
    }
  };
  const handleChange = (event: any) => {
    const selectedOptionValue = parseInt(event.target.value);
    setPageSize(selectedOptionValue);
  };
  const handleDeleteDB = () => {
    onClose();
  };
  const handleReturnDB = () => {
    onClose();
  };
  return (
    <div className={`${styles.main__content} ${styles.flex_column}`}>
      <div className={styles.main__control_search_delete}>
        <Input
          placeholder={`Tìm kiếm theo tên ${name.toLowerCase()}`}
          suffix={suffix}
          bordered={false}
          style={{
            width: "100%",
            fontSize: 20,
            fontWeight: 1000,
            textAlign: "center",
            height: "100%",
          }}
        />
      </div>
      <div className={styles.table}>
        <div style={{ marginBottom: 16 }} className={styles.selected}>
          Đã chọn
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? ` ${selectedRowKeys.length} ` : ""}
          </span>
          {hasSelected ? (
            <Button style={{ color: "red" }} type="link" onClick={start}>
              Bỏ chọn
            </Button>
          ) : (
            <Button type="link" onClick={selectAll}>
              Chọn tất cả
            </Button>
          )}
          <div className={styles.btnAction}>
            {hasSelected ? (
              <div>
                <Button className={styles.btnDelete} onClick={handleDelete}>
                  Xóa
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button className={styles.btnRe} onClick={handleReturn}>
                  Khôi phục
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={styles.scrollTable}>
          <Table
            className={styles.table_antd}
            rowSelection={{ ...rowSelection }}
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: 1500, y: 300 }}
            pagination={{
              style: { display: "none" },
              current: current,
              pageSize: pageSize,
            }}
          />
        </div>
        <br />

        <Pagination
          onChange={(page, pageSize) => onChangePage(page, pageSize)}
          style={{ float: "right" }}
          current={current}
          total={total}
          pageSize={pageSize}
        />

        <div
          className={styles.pagination_custom}
          style={{
            paddingTop: 40,
            display: "flex",
            width: "100%",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="show_number_item">
            <div>
              <b> Hiển thị:</b>
            </div>
            <div>
              <select onClick={handleChange} className="show_item_delete">
                <option value={10}>10 bản ghi trên trang</option>
                <option value={20}>20 bản ghi trên trang</option>
                <option value={30}>30 bản ghi trên trang</option>
                <option value={40}>40 bản ghi trên trang</option>
                <option value={50}>50 bản ghi trên trang</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", width: "60%" }}>
            <div>Tổng số:</div>
            <div>
              &nbsp; <b>{data.length}</b>&nbsp;{name}
            </div>
          </div>
        </div>
      </div>
      <ModalDelete
        isShowModal={isShowModal}
        onClose={onClose}
        handleDeleteDB={handleDeleteDB}
      />
      <ModalReturn
        isShowModalReturn={isShowModalReturn}
        onClose={onClose}
        handleReturnDB={handleReturnDB}
      />
    </div>
  );
};
export default Table_Form_Sms;
