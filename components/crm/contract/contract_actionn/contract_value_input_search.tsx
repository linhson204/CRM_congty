import React from "react";

export default function ContractValueInputSearch({
  value,
  index,
  handleChecked,
  checked,
}: any) {
  return (
    <div className="height:fit-content" style={{ marginRight: "5px" }}>
      <input
        type="checkbox"
        className="check_box"
        id="check_box1"
        value={index}
        checked={checked[value] || false}
        onChange={() => handleChecked(value)}
      />
      <label htmlFor="check_box1" className="text_change" data-index="1">
        {value} ({index})
      </label>
    </div>
  );
}
