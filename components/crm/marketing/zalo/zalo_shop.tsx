import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Button, Card, Tabs, Tooltip, Modal, Input } from "antd";
import Link from "next/link";
import ZaloListProduct from "./zalo_list_product";
import { ModalSucess } from "./zalo_modal";

const TYPE_UPDATE = 'update';
const TYPE_ADD = 'add';
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/crm`

const list_acc = [
    {
        acc_id: 1,
        username: 'Vũ Thị Thùy Dung',
        phone: '0335415426'
    },
    {
        acc_id: 2,
        username: 'Vũ Thị Thùy Dung',
        phone: '0335415426'
    },
    {
        acc_id: 3,
        username: 'Vũ Thị Thùy Dung',
        phone: '0335415426'
    },
]

const ProductList: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [checkFile, setCheckFile] = useState(false);
    const { isOpen } = useContext<any>(SidebarContext);
    const imgRef = useRef<HTMLInputElement>(null);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();
    useEffect(() => {
        setHeaderTitle("Zalo / Zalo shop");
        setShowBackButton(true);
        setCurrentPath("/marketing/zalo");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    const [listProduct, setListProduct] = useState([])
    const [listCategory, setListCategory] = useState([])
    const [hasAccount, getHasAccount] = useState(false)
    const [accoutApply, setAccountApply] = useState(0)
    const [currentCategory, setCurrentCategory] = useState(0)
    const [openCategModal, setOpenCategModal] = useState(false)
    const [type, setType] = useState('')
    const [inputAddCategory, setInputAddCategory] = useState('')
    const [count, setCount] = useState(0)
    const [openModalDel, setOpenModalDel] = useState(false)
    const [openModalSucess, setOpenModalSucess] = useState(false)


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

    useEffect(() => {
        if (!openCategModal) {
            setInputAddCategory('')
        }
    }, [openCategModal])

    useEffect(() => {
        if (currentCategory !== 0) {
            const getData = async () => {
                if (accoutApply === 0) {
                    setListProduct([])
                    setCount(0)
                } else {
                    const response = await handleFetchData({}, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
                    setListProduct(response?.data?.data ? response?.data?.data : [])
                    setCount(response?.data?.count ? response?.data?.count : 0)
                }
            }
            getData()
        }
    }, [accoutApply])

    useEffect(() => {
        const getData = async () => {
            const response = await handleFetchData({}, `${BASE_URL}/marketingZalo/getZaloShopCategory`)
            setListCategory(response?.data?.data ? response?.data?.data : [])
        }
        getData()
    }, [])

    const onSubmitAddCategory = async () => {
        try {
            let response = null
            if (type === TYPE_ADD) {
                response = await handleFetchData({ category_name: inputAddCategory }, `${BASE_URL}/marketingZalo/addZaloShopCategory`)
            } else if (type === TYPE_UPDATE) {
                response = await handleFetchData({ category_name: inputAddCategory, category_id: currentCategory }, `${BASE_URL}/marketingZalo/updateZaloShopCategory`)
            }
            if (response?.data?.result) {
                const response2 = await handleFetchData({}, `${BASE_URL}/marketingZalo/getZaloShopCategory`)
                setListCategory(response2?.data?.data ? response2?.data?.data : [])
                setOpenModalSucess(true)
            } else console.log('Lỗi thêm danh mục');
        } catch (e) {
            console.log(e);
            alert('Lỗi')
        }
    }
    const onChangInputCategory = (e) => {
        setInputAddCategory(e.target.value)
    }

    const handleGetByCategory = async (item) => {
        try {
            const response = await handleFetchData({ category_id: item.category_id }, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
            setListProduct(response?.data?.data ? response?.data?.data : [])
            setCount(response?.data?.count ? response?.data?.count : 0)
        } catch (e) {
            console.log(e)
            alert('Lỗi')
        }
    }

    const handelDeleteCategory = async (item) => {
        try {
            const response = await handleFetchData({ category_id: item.category_id }, `${BASE_URL}/marketingZalo/deleteZaloShopCategory`)
            if (response?.data?.result) {

                const response2 = await handleFetchData({}, `${BASE_URL}/marketingZalo/getZaloShopCategory`)
                setListCategory(response2?.data?.data ? response2?.data?.data : [])
                setOpenModalSucess(true)
            } else console.log('Lỗi xóa danh mục');
        } catch (e) {
            console.log(e);
            alert('Lỗi')
        }
    }
    return (
        <>
            <Card>
                <div className={styles.container_content}>
                    {accoutApply !== 0 ? <>
                        <div className={styles.list_product}>
                            <div>
                                <p className={styles.title_zalo_zhop}>Danh sách sản phẩm</p>
                            </div>
                            {
                                listProduct.length !== 0 ? <>
                                    <ZaloListProduct list_product={listProduct} category_id={currentCategory} count={count} setCount={setCount} />
                                </> : <>
                                    <div className={styles.main_default}>
                                        <p className={styles.text_title}>Bạn chưa có sản phẩm nào</p>
                                        <p className={styles.text_content}>Hãy thêm mới sản phẩm của riêng bạn ngay nào</p>
                                        <p className={styles.img_default}>
                                            <img className="img_none" src="/crm/form_email_null.svg" style={{ width: '100%' }} />
                                        </p>
                                        {
                                            currentCategory !== 0 ? <>
                                                <div className="dropdown">
                                                    <div className={`${styles.main__control_add}`}>
                                                        <Link href={`/marketing/zalo/add_product/${currentCategory}`}>
                                                            <button
                                                                type="button"
                                                                className={`${styles.dropbtn_add_zalo_shop} flex_align_center`}
                                                            >
                                                                <img src="/crm/add.svg" />
                                                                Thêm sản phẩm
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </> : <></>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </> : <>
                        <div className={styles.list_product}>
                            <div>
                                <p className={styles.title_zalo_zhop}>Danh mục sản phẩm</p>
                            </div>
                            <div className={styles.main_default}>
                                <p className={styles.text_title}>Bạn chưa có danh mục nào</p>
                                <p className={styles.text_content}>Hãy thêm mới danh mục của riêng bạn ngay nào</p>
                                <p className={styles.img_default}>
                                    <img className="img_none" src="/crm/form_email_null.svg" style={{ width: '100%' }} />
                                </p>
                            </div>
                        </div>
                    </>}
                    {accoutApply !== 0 ? <>
                        <div className={styles.acc_info}>
                            <div style={{ marginBottom: '20px' }}>
                                <p className={styles.title_zalo_zhop}>Tài khoản áp dụng</p>
                                {
                                    list_acc.filter((e) => e.acc_id === accoutApply).map((item, index) => {
                                        return (
                                            <>
                                                <div className={styles.acc_info_detail_container}>
                                                    <div className={styles.acc_info_detail} onClick={() => { getHasAccount(true) }}>
                                                        <img src="/crm/img/marketing/ava.png" alt="hungha.com" className={styles.circle_img} />
                                                        <div className={styles.list_acc_detail}>
                                                            <p>{item.username}</p>
                                                            <p>{item.phone}</p>
                                                        </div>
                                                    </div>
                                                    <img src="/crm/change_acc.svg" alt="hungha.com" style={{ cursor: 'pointer' }} onClick={() => {
                                                        setAccountApply(0)
                                                        setCurrentCategory(0)
                                                        getHasAccount(false)
                                                    }} />
                                                </div>
                                            </>
                                        )
                                    })
                                }

                            </div>
                            <p className={styles.title_zalo_zhop}>Danh mục sản phẩm</p>
                            <div className={styles.category_list}>
                                {

                                    listCategory?.map((item, index) => {
                                        return (
                                            <>
                                                <div className={styles.category_item}>
                                                    <img src="/crm/img/marketing/image_not_found.svg" alt="hungha.com" onClick={() => {
                                                        setCurrentCategory(item.category_id)
                                                        handleGetByCategory(item)
                                                    }} />
                                                    <p style={item.category_id === currentCategory ? { fontWeight: 800 } : {}} onClick={() => {
                                                        setCurrentCategory(item.category_id)
                                                        handleGetByCategory(item)
                                                    }}>{item.category_name}</p>
                                                    <Tooltip
                                                        color="white"
                                                        placement="topRight"
                                                        title={<>
                                                            <div style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => {
                                                                setType(TYPE_UPDATE)
                                                                setOpenCategModal(true)
                                                                setInputAddCategory(item.category_name)
                                                            }}>
                                                                <img src="/crm/img/marketing/edit.svg" alt="hungha.com" />
                                                                <span style={{ marginLeft: '12px', color: '#474747', fontSize: '15px', fontWeight: 500 }}>Chỉnh sửa</span>
                                                            </div>
                                                            <div style={{ padding: '12px 16px' }} onClick={() => {
                                                                handelDeleteCategory(item)
                                                            }}>
                                                                <img src="/crm/img/marketing/delete.svg" alt="hungha.com" />
                                                                <span style={{ marginLeft: '12px', color: '#474747', fontSize: '15px', fontWeight: 500 }}>Xóa</span>
                                                            </div>
                                                        </>}>
                                                        <img src="/crm/3_cham.png" alt="hungha.com" />
                                                    </Tooltip>
                                                </div>
                                            </>
                                        )
                                    })


                                }

                            </div>
                            <div className={styles.btn_face}>
                                <button
                                    type="button"
                                    className={`${styles.dropbtn_add_zalo_shop} flex_align_center`}
                                    style={{ width: '100%', justifyContent: 'center' }}
                                    onClick={() => {
                                        setType(TYPE_ADD)
                                        setOpenCategModal(true)
                                    }}
                                >
                                    <img src="/crm/add.svg" />
                                    Thêm danh mục
                                </button>
                            </div>
                        </div>
                    </> : <>
                        <div className={styles.acc_info}>
                            <div>
                                <p className={styles.title_zalo_zhop}>Tài khoản áp dụng</p>
                                <p className={styles.descriptions}> Vui lòng chọn tài khoản Zalo để truy cập ZaloShop</p>
                                {
                                    list_acc?.map((item, index) => {
                                        return (
                                            <>
                                                <div className={styles.acc_info_detail_container}>
                                                    <div className={styles.acc_info_detail} onClick={() => {
                                                        getHasAccount(true)
                                                        setAccountApply(item.acc_id)
                                                    }}>
                                                        <img src="/crm/img/marketing/ava.png" alt="hungha.com" className={styles.circle_img} />
                                                        <div className={styles.list_acc_detail}>
                                                            <p>{item.username}</p>
                                                            <p>{item.phone}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>}
                </div>
            </Card>

            <Modal
                className={"zalo_modal_categor"}
                open={openCategModal}
                onCancel={() => { setOpenCategModal(false) }}
                footer={[
                    <>
                        <div className={styles.footer_zalo_shop}>
                            <div style={{ flex: 1 }}>
                                <button style={{ background: 'white', color: '#4C5BD4', width: '100%', display: 'block', border: ' 1px solid #4C5BD4' }} className={`${styles.dropbtn_add_zalo_shop} flex_align_center`} onClick={() => { setOpenCategModal(false) }}>
                                    Hủy
                                </button>
                            </div>
                            <div style={{ flex: 1 }}>
                                <button style={{ width: '100%', display: 'block' }} className={`${styles.dropbtn_add_zalo_shop} flex_align_center`} onClick={() => {
                                    onSubmitAddCategory()
                                    setOpenCategModal(false)
                                }}>
                                    Đồng ý
                                </button>
                            </div>
                        </div>
                    </>
                ]}
            >
                <p className={styles.titleModifiled}>Vui lòng nhập tên danh mục</p>
                <img className={styles.cross} src="/crm/img/marketing/cross.svg" alt="hungha.com" onClick={() => { setOpenCategModal(false) }} />
                <div className={styles.zalo_modal_categor_button}>
                    <input onChange={onChangInputCategory} value={inputAddCategory} type="text" placeholder="Nhập tên danh mục" />
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} />
        </>
    );
};

export default ProductList;
