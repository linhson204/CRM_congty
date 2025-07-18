import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useRouter } from "next/router";

interface HeaderProps {
  keyTab: string;
  id1: any;
  id2: any;
}

const HeaderBarChanceDetails: React.FC<HeaderProps> = ({
  keyTab,
  id1,
  id2,
}: any) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState(keyTab);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thông tin chi tiết`,
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Liên hệ`,
      // children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Lịch hẹn`,
    },
    {
      key: "4",
      label: `Báo giá`,
    },
    {
      key: "5",
      label: `Đơn hàng`,
    },
    {
      key: "6",
      label: `Tài liệu đính kèm`,
    },
    {
      key: "7",
      label: `Lịch sử giai đoạn`,
    },
    {
      key: "8",
      label: `Danh sách chia sẻ`,
    },
  ];

  useEffect(() => {
    setActiveKey(keyTab);
  }, [keyTab]);

  const onChangeKey = (key: string) => {
    setActiveKey(key);
    if (key) {
      switch (key) {
        case "1":
          router.push(`customer/chance/detail/${id1}/${id2}`);
          return;
        case "2":
          router.push(`customer/chance/detail/contact/${id1}/${id2}`);
          return;
        case "3":
          router.push(`customer/chance/detail/schedule/${id1}/${id2}`);
          return;
        case "4":
          router.push(`customer/chance/detail/quote/${id1}/${id2}`);
          return;
        case "5":
          router.push(`customer/chance/detail/order/${id1}/${id2}`);
          return;
        case "6":
          router.push(`customer/chance/detail/attachment/${id1}/${id2}`);
          return;
        case "7":
          router.push(`customer/chance/detail/history/${id1}/${id2}`);
          return;
        case "8":
          router.push(`customer/chance/detail/share/${id1}/${id2}`);
          return;
        default:
          return;
      }
    }
  };

  return (
    <div style={{ marginLeft: "15px", marginTop: "20px" }}>
      <Tabs
        style={{ fontSize: "16px" }}
        activeKey={activeKey}
        items={items}
        onChange={onChangeKey}
      />
    </div>
  );
};

export default HeaderBarChanceDetails;
