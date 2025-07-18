import React, { useState } from "react";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
  },
];

const MultipleSelection: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};

export default MultipleSelection;
