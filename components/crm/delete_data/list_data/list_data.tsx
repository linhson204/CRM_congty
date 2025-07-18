import Link from "next/link";
import styles from "../delele_data.module.css";
import { useEffect } from "react";
import Icontiemnang from "../../../public/icon_tiemnang.svg"
const SelectDataDelete = (props: any) => {
    const { listDataDelete } = props
 
    return (
        <>
            {listDataDelete && listDataDelete.map((item: any, index: any) => {
                return (
                    <Link key={index} href={item.link} className={`${styles.ct_item} ${styles.flex_column}`}>

                        <div className={`${styles.item_left} ${styles.flex_between}`}>
                            <img
                                src={item.image}
                                className="img_ct" />
                            <p className={styles.value_item}>{item.quantity}</p>
                        </div>
                        <div className="item_right">
                            <p className={styles.title_item}>{item.name}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}
export default SelectDataDelete;