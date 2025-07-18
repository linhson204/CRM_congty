import React, { useContext, useEffect, useRef, useState } from "react";
import { InputRef, Select } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import Image from "next/image";
import { ColumnsType } from "antd/es/table";
import { axiosCRM } from "@/utils/api/api_crm";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {}
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const TableChanceProduct: React.FC = () => {
  const [listCommodities, setListCommodities] = useState([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [count, setCount] = useState(2);

  const columnsDefault: ColumnsType<any> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên hàng hóa",
      width: 350,
      dataIndex: "prod_name",
      key: "0",
      render: (product, record) => (
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          placeholder="Chọn"
          style={{ width: "80%" }}
          // onChange={(e) =>
          //   setFormData({ ...formData, listGroup: e?.join(",") })
          // }
          defaultValue={record?._id}
          options={listCommodities?.map((item) => {
            return {
              label: item?.prod_name,
              value: item?._id,
            };
          })}
        />
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "dvt",
      key: "1",
      width: 150,
      render: (product, record) => (
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          style={{ width: "80%" }}
          placeholder="Chọn"
          // onChange={(e) =>
          //   setFormData({ ...formData, listGroup: e?.join(",") })
          // }
          defaultValue={product?._id}
          options={listCommodities?.map((item) => {
            return {
              label: item?.dvt?.unit_name,
              value: item?.dvt?._id,
            };
          })}
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "min_amount",
      key: "2",
      width: 150,
      render: (value) => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          placeholder="Nhập"
          defaultValue={value}
        />
      ),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "price",
      key: "2",
      width: 200,
      render: (value) => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          placeholder="Nhập"
          defaultValue={value}
        />
      ),
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "total_price",
      key: "3",
      width: 200,
    },
    {
      title: "Tỉ lệ chiết khấu (%)",
      dataIndex: "discount_rates",
      key: "3",
      width: 150,
      render: () => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          placeholder="Nhập"
        />
      ),
    },
    {
      title: "Tiền chiết khẩu (VNĐ)",
      dataIndex: "discount_money",
      key: "3",
      width: 250,
    },
    {
      title: "Thế suất (%)",
      dataIndex: "tax_rates",
      key: "3",
      width: 150,
      render: () => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          placeholder="Nhập"
        />
      ),
    },
    {
      title: "Tiền thuế (VNĐ)",
      dataIndex: "tax_money",
      key: "3",
      width: 200,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total_money",
      key: "3",
      width: 200,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 120,
      fixed: "right",
      render: () => (
        <div style={{ color: "#FF3333", fontSize: "15px" }}>
          <Image width={16} height={16} alt="del" src="/crm/del_red.svg" />
          Xóa
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    const newData: any = listCommodities[0];
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    axiosCRM
      .post("/product/show-product", { page_size: 50 })
      .then((res) => handleConvertCommodity(res.data.data.data))
      .catch((err) => console.log("errrCommodity", err));
  }, []);
  const handleConvertCommodity = (datas) => {
    const convert = datas?.map((item) => ({
      ...item,
      unit_name: item?.dvt?.unit_name,
      unit_id: item?.dvt?._id,
    }));
    setListCommodities(convert);
  };

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        scroll={{ x: 1500, y: 300 }}
        dataSource={dataSource}
        columns={columnsDefault}
        summary={() => {
          let totalBorrow = 0;
          let totalRepayment = 0;

          //   pageData.forEach(({ borrow, repayment }) => {
          //     totalBorrow += borrow;
          //     totalRepayment += repayment;
          //   });

          return (
            <>
              <Table.Summary fixed="top">
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <div style={{ background: "white" }}></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} colSpan={15}>
                    <div
                      onClick={handleAdd}
                      style={{
                        textAlign: "left",
                        marginLeft: "10px",
                        color: "#4C5BD4",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        alt="img"
                        src={"/crm/plus_icon_field.svg"}
                        width={25}
                        height={25}
                      />
                      Thêm dòng
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={15}></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
      <div style={{ width: "100%", fontSize: "14px" }}>
        Tổng số: <span> {dataSource?.length} Hàng hóa</span>
      </div>
    </div>
  );
};

export default TableChanceProduct;
