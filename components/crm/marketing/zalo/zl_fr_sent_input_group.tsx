import React, { useState } from "react";
import styles from "../../marketing/marketing.module.css";
import Link from "next/link";
import Image from "next/image";
import Popup from "./zalo_qr_popup"
export default function EmailFormInputGroup({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};
  const [showPopup, setShowPopup] = useState(true);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
    <div className={styles.main__control}>

      </div><div className={`${styles.main__control_btn} flex_between`}>
              <div className={styles.main__control_search}>
                  <form>
                    
                      <input
                          type="text"
                          className={styles.input__search_fr}
                          name="search"
                          defaultValue="Tìm kiếm "
                          placeholder="Tìm kiếm " />
                      <button className={styles.kinh_lup}>
                          <Image
                              width={18.5}
                              height={18.5}
                              className={styles.img__search}
                              src="/crm/search.svg"
                              alt="hungha365.com" />
                      </button>
                  </form>
              </div>
              <div className={`${styles.main__control_add} flex_end`}>
                  
                      <button
                           onClick={handleOpenPopup} 
                          type="button"
                          className={`${styles.dropbtn_add} flex_align_center`}
                          
                      >
                      
                        
                          <Image height={15} width={16} alt="..." src="/crm/thu-hoi.svg" />
                         Thu hồi
                      </button>
                      
                  
                 
              </div>
             
          </div>
          </>
  
  );
}
