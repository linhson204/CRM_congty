import stylesOrderSelect from "@/components/crm/quote/order.module.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../quote/order.module.css";
// import OrderSelectBoxStep from "../";
import OrderApplyModal from "../quote/add_quote_action_modal/quote_apply";
import { QuoteContext } from "../quote/quoteContext";
import OrderSelectBoxStep from "../quote/quote_steps/select_box_table_step copy";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: number;
  dongia: number;
  chietkhau: number;
  tienchietkhau: number;
  tien: number;
  thue: number;
  tienthue: number;
  total: number;
}

let testData: DataType[] = []
for (let i = 0; i < 4; i++) {
  testData.push({
    key: i + 1,
    idproduct: "Chưa có",
    nameproduct: "Chọn",
    donvi: "Đơn vị",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: 0,
    tienthue: 0,
    total: 0,
  });
}
const resetData = () => {
  testData = []
  for (let i = 0; i < 1; i++) {
    testData.push({
      key: i + 1,
      idproduct: "Chưa có",
      nameproduct: "Chọn",
      donvi: "Chưa có",
      soluong: 0,
      dongia: 0,
      tien: 0,
      chietkhau: 0,
      tienchietkhau: 0,
      thue: 0,
      tienthue: 0,
      total: 0,
    });
  }
}

interface TableDataOrderAddFilesDrops {
  setSelected: (value: boolean) => void;
}

const TableDataQuoteAddFiles: React.FC<
  TableDataOrderAddFilesDrops
> = ({ }: any) => {
  const { tempListProd, setTempListProd, listProduct, listProductOptions,
    getCusId, prodName, setProdName, isCreate, newQuote, editQuote,
    detailData, getPropOrDefault } = useContext(QuoteContext);
  const [data, setData] = useState<DataType[]>([]);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [pageSize, setPageSize] = useState<number>(data.length);

  useEffect(() => {
    resetData()
    setData(testData)
  }, [])

  useEffect(() => {
    if (!isCreate) {
      if (detailData && getPropOrDefault(detailData, 'product_list') !== '' && detailData.product_list.length > 0) {
        let tempData = []
        for (let i = 0; i < detailData.product_list.length; i++) {
          tempData.push({
            key: i + 1,
            idproduct: detailData.product_list[i].product_id ? detailData.product_list[i].product_id._id : '',
            nameproduct: detailData.product_list[i].product_id ? detailData.product_list[i].product_id.prod_name : '',
            donvi: detailData.product_list[i].product_id ? (detailData.product_list[i].product_id.dvt ? detailData.product_list[i].product_id.dvt.unit_name : 'Chưa cập nhật') : 'Chưa cập nhật',
            soluong: detailData.product_list[i].amount,
            dongia: detailData.product_list[i].product_price,
            tien: detailData.product_list[i].amount * detailData.product_list[i].product_price,
            chietkhau: detailData.product_list[i].product_discount_rate,
            tienchietkhau: Number(((detailData.product_list[i].amount * detailData.product_list[i].product_price) * (1.0 * detailData.product_list[i].product_discount_rate / 100)).toFixed(2)),
            thue: detailData.product_list[i].tax_rate,
            tienthue: Number(((detailData.product_list[i].amount * detailData.product_list[i].product_price) * (1 - detailData.product_list[i].product_discount_rate / 100.0) * (detailData.product_list[i].tax_rate / 100.0)).toFixed(2)),
            total: detailData.product_list[i].product_total_money,
          })
        }
        setData(tempData)
      }
    } else {
      resetData()
      setData(testData)
    }
  }, [detailData])

  useEffect(() => {
    setPageSize(data.length)
    const newProd = data
      .filter((prod) => prod.idproduct !== 'Chưa có' && prod.idproduct !== '' && prod.idproduct !== "0")
      .map((item) => ({
        product_id: item.idproduct,
        amount: item.soluong,
        product_price: item.dongia,
        product_discount_rate: item.chietkhau,
        tax_rate: item.thue,
        total: (Number(item.soluong) * Number(item.dongia)) * (1 - Number(item.chietkhau) * 1.0 / 100) * (1 + Number(item.thue) * 1.0 / 100)
      }))
    setTempListProd(newProd)
  }, [data])

  const handleAddRow = () => {
    const newEmptyRow = {
      key: data.reduce((maxKey, obj) => {
        return Number(obj.key) > maxKey ? Number(obj.key) : maxKey
      }, 0) + 1,
      idproduct: "Chưa có",
      nameproduct: "Chọn",
      donvi: "Chưa có",
      soluong: 0,
      dongia: 0,
      tien: 0,
      chietkhau: 0,
      tienchietkhau: 0,
      thue: 0,
      tienthue: 0,
      total: 0,
    }
    setData([...data, newEmptyRow])
  }

  const handleDeleteRow = (index) => {
    let newData = [...data]
    newData.splice(index, 1)
    setData(newData.map((item, index) => ({ ...item, key: index + 1 })))
  }

  const handleInputChange = (key, index, value) => {
    setData((prevData) => {
      let newData = [...prevData];
      newData[index] = { ...newData[index], [key]: value }

      if (['soluong', 'dongia', 'chietkhau', 'thue'].includes(key)) {
        const { soluong, dongia, tien, chietkhau, tienchietkhau, thue, tienthue, total } = newData[index]
        newData[index].tien = Number((Number(soluong) * Number(dongia)).toFixed(2))
        newData[index].tienchietkhau = Number((Number(newData[index].tien) * 1.0 * Number(chietkhau) / 100).toFixed(2))
        newData[index].tienthue = Number(((Number(newData[index].tien) - Number(newData[index].tienchietkhau)) * 1.0 * Number(thue) / 100).toFixed(2))
        newData[index].total = Number((Number(newData[index].tien) - Number(newData[index].tienchietkhau) + Number(newData[index].tienthue)).toFixed(2))
      }

      return newData;
    })
  }

  const handleOnBlur = (key, index, value) => {
    setData(prevData => {
      let newData = [...prevData]
      if (['soluong', 'dongia', 'chietkhau', 'thue'].includes(key)) {
        let sannitizedValue = 0;
        if (key === 'soluong') {
          sannitizedValue = Math.max(0, parseInt(value, 10)) || 0
        } else if (['chietkhau', 'thue'].includes(key)) {
          sannitizedValue = Math.min(100, Math.max(0, parseFloat(value))) || 0
        } else {
          sannitizedValue = Math.max(0, parseFloat(value)) || 0
        }
        newData[index] = { ...newData[index], [key]: sannitizedValue }
      }

      const { soluong, dongia, tien, chietkhau, tienchietkhau, thue, tienthue, total } = newData[index]
      newData[index].tien = Number((Number(soluong) * Number(dongia)).toFixed(2))
      newData[index].tienchietkhau = Number((Number(newData[index].tien) * 1.0 * Number(chietkhau) / 100).toFixed(2))
      newData[index].tienthue = Number(((Number(newData[index].tien) - Number(newData[index].tienchietkhau)) * 1.0 * Number(thue) / 100).toFixed(2))
      newData[index].total = Number((Number(newData[index].tien) - Number(newData[index].tienchietkhau) + Number(newData[index].tienthue)).toFixed(2))

      return newData
    })
  }

  const handleInputKeyPress = (e, key, index, value) => {
    if (e.key === 'Enter') {
      setData(prevData => {
        let newData = [...prevData]
        if (['soluong', 'dongia', 'chietkhau', 'thue'].includes(key)) {
          let sannitizedValue = 0;
          if (key === 'soluong') {
            sannitizedValue = Math.max(0, parseInt(value, 10)) || 0
          } else if (['chietkhau', 'thue'].includes(key)) {
            sannitizedValue = Math.min(100, Math.max(0, parseFloat(value))) || 0
          } else {
            sannitizedValue = Math.max(0, parseFloat(value)) || 0
          }
          newData[index] = { ...newData[index], [key]: sannitizedValue }
        }

        const { soluong, dongia, tien, chietkhau, tienchietkhau, thue, tienthue, total } = newData[index]
        newData[index].tien = Number((Number(soluong) * Number(dongia)).toFixed(2))
        newData[index].tienchietkhau = Number((Number(newData[index].tien) * 1.0 * Number(chietkhau) / 100).toFixed(2))
        newData[index].tienthue = Number(((Number(newData[index].tien) - Number(newData[index].tienchietkhau)) * 1.0 * Number(thue) / 100).toFixed(2))
        newData[index].total = Number((Number(newData[index].tien) - Number(newData[index].tienchietkhau) + Number(newData[index].tienthue)).toFixed(2))

        return newData
      })
    }
  }

  const handleProductChange = (index, product) => {
    const product_id = getCusId(product)
    let newProduct = {
      dvt: 'Chưa cập nhật',
      price: 0,
      name: 'Chưa cập nhật'
    }
    axiosCRMCall
      .post('/product/detail-product', { prod_id: product_id })
      .then(res => {
        // console.log(res)
        if (res.data.data) {
          if (res.data.data.data) {
            const prod = res.data.data.data
            newProduct.dvt = getPropOrDefault(prod, 'dvt.unit_name', 'Chưa cập nhật')
            newProduct.name = getPropOrDefault(prod, 'prod_name', 'Chưa cập nhật')
            newProduct.price = getPropOrDefault(prod, 'price', 0)

            setData((prevData) => {
              let newData = [...prevData]

              if (product) {
                newData[index].idproduct = product_id
                newData[index].donvi = newProduct.dvt
                newData[index].dongia = newProduct.price
                newData[index].nameproduct = newProduct.name
              }

              return newData
            })
          }
        }
      })
      .catch((err) => console.log(err))

    // setData((prevData) => {
    //   let newData = [...prevData]

    //   // const product = listProduct.find(prod => prod.id === product_id)
    //   let product = {
    //     dvt: 'Chưa cập nhật',
    //     price: 0,
    //     name: 'Chưa cập nhật'
    //   }

    //   if (product) {
    //     newData[index].idproduct = product_id
    //     newData[index].donvi = product.dvt
    //     newData[index].dongia = product.price
    //     newData[index].nameproduct = product.name
    //   }

    //   return newData
    // })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã hàng hóa",
      width: 80,
      dataIndex: "idproduct",
      key: "0",
      // render: (text) => <div style={{ background: "#EEEEEE", color: "black", textAlign: "center", }}>{text}</div>,
    },
    // TODO Dropdown ở ngoài bảng
    {
      title: "Tên hàng hóa",
      dataIndex: "nameproduct",
      key: "1",
      width: 240,
      render: (text, record, index) => (
        <div
          style={{
            padding: "5px",
            paddingLeft: "11px",
            // position: 'absolute',
            // zIndex: 9,
            // top: 0,
            overflow: 'visible',
          }}
          className={stylesOrderSelect.wrap_select}
        >
          <OrderSelectBoxStep
            value={text}
            placeholder="Chọn"
            setValue={(value) => handleProductChange(index, value)}
            data={listProductOptions}
            keyword={prodName}
            setKeyword={setProdName}
          />
        </div>
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "donvi",
      key: "2",
      width: 120,
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "3",
      width: 100,
      render: (text, record, index) => (
        <>
          <input
            type="number"
            min={0}
            className={styles.inputform}
            placeholder="Nhập"
            value={String(text)}
            onChange={(e) => handleInputChange('soluong', index, e.target.value)}
            onBlur={(e) => handleOnBlur('soluong', index, e.target.value)}
            onKeyDown={(e) => handleInputKeyPress(e, 'soluong', index, e.currentTarget.value)}
          />
        </>
      ),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "4",
      width: 100,
      render: (text, record, index) => (
        <>
          <input
            type="number"
            min={0}
            className={styles.inputform}
            placeholder="Nhập"
            value={String(text)}
            onChange={(e) => handleInputChange('dongia', index, e.target.value)}
            onBlur={(e) => handleOnBlur('dongia', index, e.target.value)}
            onKeyDown={(e) => handleInputKeyPress(e, 'dongia', index, e.currentTarget.value)}
          />
        </>
      ),
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "tien",
      key: "5",
      width: 100,
      render: (text) => {
        return Number(text).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })
      }
    },
    {
      title: "Tỷ lệ chiết khấu (%)",
      dataIndex: "chietkhau",
      key: "6",
      width: 130,
      render: (text, record, index) => (
        <>
          <input
            type="number"
            min={0}
            max={100}
            className={styles.inputform}
            placeholder="Nhập"
            value={String(text)}
            onChange={(e) => handleInputChange('chietkhau', index, e.target.value)}
            onBlur={(e) => handleOnBlur('chietkhau', index, e.target.value)}
            onKeyDown={(e) => handleInputKeyPress(e, 'chietkhau', index, e.currentTarget.value)}
          />
        </>
      ),
    },
    {
      title: "Tiền chiết khấu (VNĐ)",
      dataIndex: "tienchietkhau",
      key: "7",
      width: 120,
      // render: () => (
      //   <>
      //     <input type="text" className={styles.inputform} placeholder="Nhập" />
      //   </>
      // ),
    },
    {
      title: "Thuế suất(%)",
      dataIndex: "thue",
      key: "8",
      width: 120,
      render: (text, record, index) => (
        <>
          <input
            type="number"
            min={0}
            max={100}
            className={styles.inputform}
            placeholder="Nhập"
            value={String(text)}
            onChange={(e) => handleInputChange('thue', index, e.target.value)}
            onBlur={(e) => handleOnBlur('thue', index, e.target.value)}
            onKeyDown={(e) => handleInputKeyPress(e, 'thue', index, e.currentTarget.value)}
          />
        </>
      ),
    },
    {
      title: "Tiền thuế (VNĐ)",
      dataIndex: "tienthue",
      key: "9",
      width: 90,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "10",
      width: 90,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 120,
      fixed: "right",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {
              index === data.length - 1 &&
              (
                <div style={{ width: 15 }} onClick={() => handleAddRow()}>
                  <img style={{ cursor: "pointer" }} src="/crm/add_row.svg"></img>{" "}
                </div>
              )
            }
            {
              data.length > 1 &&
              (
                <div style={{ width: 15 }} onClick={() => handleDeleteRow(index)}>
                  <img style={{ cursor: "pointer" }} src="	/crm/remove_row.svg"></img>{" "}
                </div>
              )
            }
            <div style={{ width: 15 }}>
              <img style={{ cursor: "pointer" }} src="	/crm/menu_row.svg"></img>{" "}
            </div>
          </div>
        )
      },
    },
  ];
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{
          x: 1100,
          // y: 800 
        }}
        pagination={{
          pageSize: pageSize,
          style: { display: "none" },
        }}
        summary={() => {
          // let totalBorrow = 0;
          // let totalRepayment = 0;

          //   pageData.forEach(({ borrow, repayment }) => {
          //     totalBorrow += borrow;
          //     totalRepayment += repayment;
          //   });

          return <></>;
        }}
      />
      {
        <OrderApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
        // content="Hello"
        />
      }

      <div style={{ paddingTop: 20, paddingLeft: 30 }} id="">
        <div>
          <div style={{ textAlign: "left" }}>
            <button
              type="button"
              onClick={() => {
                setIsModalCancel(true);
              }}
            >
              <div style={{ background: "white", color: "#4C5BD4" }}>
                &nbsp;
                <i className="bi bi-plus-circle-fill"></i>
                &nbsp;
                <b style={{ fontSize: 18 }}>Thêm chương trình khuyến mại</b>
              </div>
            </button>
          </div>
        </div>
        <div className="total"></div>
      </div>
    </div>
  );
};

export default TableDataQuoteAddFiles;
