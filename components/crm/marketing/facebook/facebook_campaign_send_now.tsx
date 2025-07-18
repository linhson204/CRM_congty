import React, { useState } from 'react'
import SendNowInitFacebookCampaign from './facebook_campaign_send_now_intit';
import SendNowScanFacebookCampaign from './facebook_campaign_send_now_scan';

const SendNowFacebookCampaign = () => {
    const [ isScan, setIsScan ] = useState(true);
  return (
    <section>
        { isScan ? <SendNowInitFacebookCampaign/> : <SendNowScanFacebookCampaign/>}
    </section>
  )
}

export default SendNowFacebookCampaign