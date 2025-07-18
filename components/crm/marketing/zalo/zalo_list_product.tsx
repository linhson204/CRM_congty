import { Table, Image, Tooltip, Pagination } from "antd"
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react"
import styles from "../marketing.module.css"
import Link from "next/link";
import { ModalDel, ModalSucess } from "./zalo_modal";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/crm`

export default function ZaloListProduct({ list_product, category_id, count, setCount }) {
    const handleFetchData = async (payload, url) => {
        try {
            const res = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json()
            return data
        } catch (e) {
            console.log(e);
            alert('Lỗi')
            return []
        }
    }
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [windowSize, setWindowSize] = useState(0)
    const [resizeColoumns, setResizeColumns] = useState({
        stt: 80,
        name_product: 160,
        description: 600,
        anh: 100,
        action: 100
    })
    const [dataTable, setDataTable] = useState(list_product)
    const [inputSearch, setInputSearch] = useState('')
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [openModalDel, setOpenModalDel] = useState(false)
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(0)

    const handleResize = () => {
        if (windowSize <= 414) {
            setIsSmallScreen(true)
            setResizeColumns({
                stt: 70,
                name_product: 130,
                description: 250,
                anh: 100,
                action: 100
            })
        } else {
            setIsSmallScreen(false)
            if (windowSize > 414 && windowSize <= 768) {
                setResizeColumns({
                    stt: 70,
                    name_product: 130,
                    description: 250,
                    anh: 100,
                    action: 100
                })
            } else if (windowSize > 768 && windowSize <= 1024) {
                setResizeColumns({
                    stt: 70,
                    name_product: 150,
                    description: 150,
                    anh: 100,
                    action: 100
                })
            } else if (windowSize > 1024 && windowSize <= 1366) {
                setResizeColumns({
                    stt: 70,
                    name_product: 140,
                    description: 220,
                    anh: 100,
                    action: 100
                })
            } else {
                setResizeColumns({
                    stt: 80,
                    name_product: 160,
                    description: 600,
                    anh: 100,
                    action: 100
                })
            }
        }
    };
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowSize]);

    useEffect(() => {
        setDataTable(list_product)
    }, [list_product])

    useEffect(() => {
        setWindowSize(window.innerWidth)
    }, [window.innerWidth])
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            align: 'center',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => index + 1 + pageSize * (currentPage - 1),
            width: resizeColoumns.stt,
            fixed: isSmallScreen ? 'left' : undefined
        },
        {
            title: 'Tên sản phẩm',
            align: 'center',
            dataIndex: 'product_name',
            key: 'product_name',
            width: resizeColoumns.name_product
        },
        {
            title: 'Mô tả',
            align: 'center',
            dataIndex: 'product_description',
            key: 'product_description',
            width: resizeColoumns.description
        },
        {
            title: 'Ảnh',
            align: 'center',
            key: 'anh',
            width: resizeColoumns.anh,
            render: (text, record, index) => <>
                <Image src={record?.img[0]} alt="hungha.com" width={64} height={64} />
            </>
        },
        {
            title: 'Tùy chọn',
            align: 'center',
            width: resizeColoumns.action,
            fixed: isSmallScreen ? 'right' : undefined,
            render: (text, record, index) => <>
                <Tooltip
                    color="white"
                    placement="topRight"
                    title={<>
                        <div style={{cursor: 'pointer'}}>
                            <Link href={`/marketing/zalo/update_product/${category_id}/${record.product_id}`}>
                                <div style={{ padding: '12px 16px' }} >
                                    <img src="/crm/img/marketing/edit.svg" alt="hungha.com" />
                                    <span style={{ marginLeft: '12px', color: '#474747', fontSize: '15px', fontWeight: 500 }}>Chỉnh sửa</span>
                                </div>
                            </Link>
                            <div style={{ padding: '12px 16px' }} onClick={() => {
                                setOpenModalDel(true)
                                setCurrentProduct(record.product_id)
                            }}>
                                <img src="/crm/img/marketing/delete.svg" alt="hungha.com" />
                                <span style={{ marginLeft: '12px', color: '#474747', fontSize: '15px', fontWeight: 500 }}>Xóa</span>
                            </div>
                        </div>
                    </>}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: ' #4C5BD4' }}> <img src="/crm/3_cham.png" alt="hungha.com" />Thao tác</span>
                </Tooltip>
            </>
        },
    ]

    const handleSearchProductByName = async (event) => {
        if (event.key === 'Enter') {
            const response = await handleFetchData({ product_name: inputSearch, category_id: category_id, pageSize: pageSize, pageNumber: currentPage }, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
            if (response?.data?.result) {
                setDataTable(response.data.data)
                setCount(response.data.count)
            } else alert('Lỗi tìm kiếm')
        }
    }

    const onchangeInputSearch = (e) => {
        setInputSearch(e.target.value)
    }

    const handelChangePageSize = async (e) => {
        const newPageSize = e.target.value
        setPageSize(newPageSize)
        const response = await handleFetchData({ product_name: inputSearch, category_id: category_id, pageSize: newPageSize, pageNumber: currentPage }, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
        if (response?.data?.result) {
            setDataTable(response.data.data)
        } else alert('Lỗi thay đổi page size')
    }

    const handelChangeCurrentPage = async (e) => {
        setCurrentPage(e)
        const response = await handleFetchData({ product_name: inputSearch, category_id: category_id, pageSize: pageSize, pageNumber: e }, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
        if (response?.data?.result) {
            setDataTable(response.data.data)
        } else alert('Lỗi chuyển trang')
    }

    const handleDeleteProduct = async (product_id) => {
        try {
            const response = await handleFetchData({product_id: product_id},  `${BASE_URL}/marketingZalo/deleteZaloShopProduct`)
            if (response?.data?.result) {
                const response1 = await handleFetchData({ product_name: inputSearch, category_id: category_id, pageSize: pageSize, pageNumber: currentPage }, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
                setDataTable(response1.data.data)
                setCount(response1.data.count)
            }
            return true
        } catch (e) {
           console.log(e);
           alert('Lỗi khi xóa sản phẩm')
           return false
        }
    }

    return (<>
        <div className={`${styles.main__control_btn} flex_between mb-20 ${styles.search_product_zalo}`} style={{ marginBottom: '20px' }}>
            <div className={styles.main__control_search} onKeyDown={(e) => handleSearchProductByName(e)}>
                <input
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    value={inputSearch}
                    onChange={onchangeInputSearch}
                />
                <button className={styles.kinh_lup}>
                    <Image
                        preview={false}
                        onClick={() => handleSearchProductByName({ key: 'Enter' })}
                        width={14}
                        height={14}
                        className={styles.img__search}
                        src="/crm/search.svg"
                        alt="hungha365.com"
                    />
                </button>
            </div>
            <div className={`${styles.main__control_add} flex_end`}>
                <Link href={`/marketing/zalo/add_product/${category_id}`}>
                    <button
                        type="button"
                        className={`${styles.dropbtn_add} flex_align_center items-center`}
                    >
                        <img height={14} width={14} alt="..." src="/crm/add.svg" />
                        <div>Thêm mới</div>
                    </button>
                </Link>
            </div>
        </div>
        <div>
            <Table
                className="marketing_table_custom"
                columns={columns}
                dataSource={dataTable}
                scroll={{ x: 'scrollWidth', y: 700 }}
                bordered
                pagination={false}
                footer={() => (
                    <>
                        <div className={styles.marketing_footer_table}>
                            <div className={styles.pagesize}>
                                <b>Hiển thị: </b>
                                <select onChange={(e) => handelChangePageSize(e)} className="">
                                    <option value={10}>10 bản ghi trên trang</option>
                                    <option value={20}>20 bản ghi trên trang</option>
                                    <option value={30}>30 bản ghi trên trang</option>
                                    <option value={40}>40 bản ghi trên trang</option>
                                    <option value={50}>50 bản ghi trên trang</option>
                                </select>
                            </div>
                            <div className={styles.total}>
                                <span>Tổng số: {count} Sản phẩm</span>
                            </div>
                            <div className={styles.pagination}>
                                <Pagination onChange={(e) => handelChangeCurrentPage(e)} showLessItems size="small" pageSize={pageSize} total={count} />
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
        <ModalDel openModalDel={openModalDel} setOpenModalDel={setOpenModalDel} text={'Bạn chắn muốn xóa'} textTitle={'Xóa sản phẩm'} handleOke={() => handleDeleteProduct(currentProduct)}/>
    </>
    )
}
