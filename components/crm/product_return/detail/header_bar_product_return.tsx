import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useRouter } from "next/router";

interface HeaderProps {
  keyTab: string;
  id: any;
}

const HeaderBarProductReturn: React.FC<HeaderProps> = ({ keyTab, id }: any) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState(keyTab);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thông tin chi tiết`,
    },
    {
      key: "2",
      label: `Lịch hẹn`,
    },
    {
      key: "3",
      label: `Ghi chú`,
    },
    {
      key: "4",
      label: `Danh sách chia sẻ`,
    },
  ];

  useEffect(() => {
    setActiveKey(keyTab);
    keyTab;
  }, [keyTab]);

  const onChangeKey = (key: string) => {
    setActiveKey(key);
    if (key) {
      switch (key) {
        case "1":
          router.push(`/product_return/detail/${id}`);
          return;
        case "2":
          router.push(`/product_return/detail/schedule/${id}}`);
          return;
        case "3":
          router.push(`/product_return/detail/note/${id}}`);
          return;
        case "4":
          router.push(`/product_return/detail/share/${id}}`);
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

export default HeaderBarProductReturn;
