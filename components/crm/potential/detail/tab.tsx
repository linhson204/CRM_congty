import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import GeneralRowInforText from "./general_row_info";
import ItemPotential from "./item_potential";
import { useRouter } from "next/router";
import Email_potential from "./email_potential";
import SMS_potential from "./sms_potential";
import Lich_hen_potential from "./lich_hen_potential";
import Tai_lieu_dinh_kem_potetial from "./tai_lieu_dinh_kem_potetial";
import Danh_sach_chia_se_Po from "./danh_sach_chia_se_potential";
import Note_potential from "./note_potential";
import Campaign_potetial from "./campaign_potetial";

const Tab: React.FC = ({ key }: any) => {
  const router = useRouter();
  const onChange = (key: string) => {
    switch (key) {
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thông tin chi tiết`,
      children: <GeneralRowInforText />,
    },
    {
      key: "2",
      label: `Hàng hoá quan tâm`,
      children: <ItemPotential />,
    },
    {
      key: "3",
      label: `Chiến dịch`,
      children: <Campaign_potetial />,
    },
    {
      key: "4",
      label: `Tài liệu đính kèm`,
      children: <Tai_lieu_dinh_kem_potetial />,
    },
    {
      key: "5",
      label: `Lịch hẹn`,
      children: <Lich_hen_potential />,
    },
    {
      key: "6",
      label: `Email`,
      children: <Email_potential />,
    },
    {
      key: "7",
      label: `SMS`,
      children: <SMS_potential />,
    },
    {
      key: "8",
      label: `Ghi chú`,
      children: <Note_potential />,
    },
    {
      key: "9",
      label: `Danh sách chia sẻ`,
      children: <Danh_sach_chia_se_Po />,
    },
  ];
  return <Tabs activeKey={key} items={items} onChange={onChange} />;
};

export default Tab;
