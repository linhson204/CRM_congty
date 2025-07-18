import React, { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Input, Button } from "antd";
import styles from '../marketing.module.css'

const ZaloDomain: React.FC = () => {
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
        setHeaderTitle(" Zalo / Tên miền");
        setShowBackButton(true);
        setCurrentPath("/marketing/zalo");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    return (
        <>
            <div className={`${styles.zalo_domain} zalo_domain`}>
                <h2>Cấu hình tên miền riêng</h2>
                <div>
                    <div className={styles.zalo_domain_des}>
                        <p>Tên miền riêng để sử dụng các tính năng như Mini Shop, đăng hình ảnh trên tường, v.v...</p>
                        <p>
                            Sau khi thêm Tên miền riêng vào hệ thống, các sản phẩm trong Mini Shop sẽ có link dạng: https://[tên miền của bạn .com]/shop/xxxx</p>
                        <p>
                            Vui lòng trỏ tên miền của bạn về IP: 157.245.48.61 trước khi thêm vào hệ thống!
                        </p>
                    </div>
                    <div className={styles.zalo_domain_form}>
                        <p>Tên miền:</p>
                        <div className={styles.zalo_domain_form_input}>
                            <Input size="large" placeholder="Thêm tên miền riêng đẻ cá nhân hoá link Shop" />
                            <div>
                                <Button size="large">Cập nhật</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZaloDomain