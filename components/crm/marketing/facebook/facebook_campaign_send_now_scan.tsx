import React from 'react'
import Selecter from './selecter'
import styles from './facebook.module.css'
import { FormCampaign } from './form_campaign'
import TraditionLookFacebook from './facebook_look_tradition'
import GroupAddFriendAndAddGroup from './friend_list';


const SendNowScanFacebookCampaign = () => {
  return (
    <div>
        {/* fillter */}
        <Selecter/>
        {/* content */}
        <div className={`${styles.box_campign} campign campign-scan`}>
            {/* left */}
            <div className={styles.campaign}>
                <span className={styles.title}>Tin nhắn truyền thống</span>
                <p className={styles.des}>Mẫu tin nhắn tự động số 1</p>
                <FormCampaign onChangeInfor={function (value: any): void {
            throw new Error('Function not implemented.')
          } }/>


            </div>
            {/* right */}
            <div className={styles.campign_right}>
                <TraditionLookFacebook/>
                <GroupAddFriendAndAddGroup numberChange={0}/>
            </div>
        </div>
    </div>
  )
}

export default SendNowScanFacebookCampaign