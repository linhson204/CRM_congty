import CampaignInputGroups from "@/components/crm/campaign/campaign_input_group";
import TableDataCampaign from "@/components/crm/table/table-campaign";
import React, { useContext, useEffect, useRef } from "react";
import CampaignInputGroupsPO from "./campaign_potential_input";

type Props = {};

const Campaign_potetial = (props: Props) => {
  return (
    <div>
      <CampaignInputGroupsPO />
      {/* <TableDataCampaign /> */}
    </div>
  );
};
export default Campaign_potetial;
