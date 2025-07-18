import React, { useRef, useState } from "react";
import ExamppleSMSFacebook from "./facebook_example_sms";
import ProgramFacebook from "./facebook_program";
import FacebookProgramGroup from "./facebook_program_group";
import CurrentFacebookSlug from "./facebook_current_slug";
import SendNowFacebookCampaign from "./facebook_campaign_send_now";
import FacebookList from "./facebook_list";
import styles from './facebook.module.css'
import DetailProgramFacebook from "./facebook_detail_program";
import ScanFacebook from "./facebook_scan_all";
import FacebookFriend from "./facebook_group"

const FacebookAll = () => {

  const [isDetailProgram, setDetailProgram ] = useState(0);
  
  return (
    <div className={`${styles.warrper_all_facebook} warrper_all_facebook`}>
      <div style={{
        marginBottom: '0.81rem'
      }}>
        <CurrentFacebookSlug numberCurrentDetailForGroup={isDetailProgram} onChangeNumberPage={(e) =>  setDetailProgram(e)} />
      </div>
      { isDetailProgram === 0 && <FacebookList/>}
      { isDetailProgram === 1 && <FacebookFriend/>}
      { isDetailProgram === 2 && <ScanFacebook/>}
      { isDetailProgram === 4 && <DetailProgramFacebook/>}
      { isDetailProgram === 3 && <SendNowFacebookCampaign/>}
    </div>
  );
};

export default FacebookAll;
