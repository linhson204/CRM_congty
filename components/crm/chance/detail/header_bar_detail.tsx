import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useRouter } from "next/router";

interface HeaderProps {
  keyTab: string;
}

const HeaderBarChanceDetails: React.FC<HeaderProps> = ({ keyTab }: any) => {
  const router = useRouter();
  const { id } = router.query;
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
          router.push(`/chance/detail/${id}`);
          return;
        case "2":
          router.push(`/chance/detail/contact/${id}`);
          return;
        case "3":
          router.push(`/chance/detail/schedule//${id}`);
          return;
        case "4":
          router.push(`/chance/detail/quote/${id}`);
          return;
        case "5":
          router.push(`/chance/detail/order/${id}`);
          return;
        case "6":
          router.push(`/chance/detail/attachment/${id}`);
          return;
        case "7":
          router.push(`/chance/detail/history/${id}`);
          return;
        case "8":
          router.push(`/chance/detail/share`);
          return;
        default:
          return;
      }
    }
  };

  return (
    <div
      style={{ marginLeft: "15px", marginTop: "20px", marginBottom: "10px" }}
    >
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
