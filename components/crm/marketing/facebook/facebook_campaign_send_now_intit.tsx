import React, { useState } from 'react'
import Selecter from './selecter'
import { FormCampaign } from './form_campaign';
import styles from './facebook.module.css'
import LookBeforFacebook from './facebook_look_before';
import TraditionLookFacebook from './facebook_look_tradition';
import GroupAddFriendAndAddGroup from './friend_list';

const SendNowInitFacebookCampaign = () => {
  const [ filterTable, setFilterTable ] = useState<any>(1);
  const changeFilterTable = (name: any) => {
    setFilterTable(name.target.value as any)
  }
  return (
    <div>
        {/* fillter */}
        <Selecter/>
        {/* content */}
        <div className={`${styles.box_campign} ${filterTable == 2 ? 'campign' : 'campign-scan'}  `}>
            {/* left */}
            <div className={styles.campaign}>
                <span className={styles.title}>Tin nhắn truyền thống</span>
                <p className={styles.des}>Mẫu tin nhắn tự động số 1</p>
                <FormCampaign  onChangeInfor={changeFilterTable}/>
            </div>
            {/* right */}
            <div className={`${styles.campign_right} ${styles.custom_table_init} ${filterTable == 2 ? 'custom_table_init' : ''}`}>
                <TraditionLookFacebook/>
                <GroupAddFriendAndAddGroup numberChange={filterTable} />
            </div>
        </div>
    </div>
  )
}

export default SendNowInitFacebookCampaign