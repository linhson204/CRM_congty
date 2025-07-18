import React from 'react';
import Image from 'next/image';
import styles from './group.module.css';
import stylesFacebook from '../../facebook/facebook.module.css'

export interface UserProps {
    linkUser: string,
    nameUser: string,
    isMobile: boolean
}

const GroupZaloUserTable: React.FC<UserProps> = ({linkUser, nameUser, isMobile}) => {
  return (
    <div>
        <div className={`${!isMobile ? styles.image_table : styles.image_table_mobile} ${stylesFacebook.custom_box_detail_user_campign}`} >
            <div className={`${styles.image_user_group} ${stylesFacebook.custom_image_campign}`}>
                <Image  src={linkUser} fill objectFit='cover' alt="image-user-table-group" className={``}/>
            </div>
            <div className={stylesFacebook.custom_text_campign}>
              <span className={stylesFacebook.custom_name_campign}>{nameUser}</span><br></br>
              <span className={stylesFacebook.custom_number_campign}>0987 654 321</span>
            </div>
        </div>
    </div>
  )
}

export default GroupZaloUserTable;