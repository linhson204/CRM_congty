import { Select, Space } from 'antd'
import React from 'react';


const { Option } = Select;

const Selecter = () => {
const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    };
  return (
    <Select
    className='change_css'
    style={{ width: '100%', background: '#FFF' }}
    placeholder="select one country"
    defaultValue={["Quản lý chiến dịch theo tin nhắn"]}
    onChange={handleChange}
    popupMatchSelectWidth={false}
    optionLabelProp="label"
  >
    <Option value="Quản lý chiến dịch theo tin nhắn" label="Quản lý chiến dịch theo tin nhắn">
      <Space>
          <input type="radio" />
        Quản lý chiến dịch theo tin nhắn
      </Space>
    </Option>
    <Option value="Quản lý chiến dịch theo kịch bản bạn bè" label="Quản lý chiến dịch theo kịch bản bạn bè">
      <Space>
      <input type="radio" />
        Quản lý chiến dịch theo kịch bản bạn bè
      </Space>
    </Option>
    <Option value="Quản lý chiến dịch theo kịch bản nhóm" label="Quản lý chiến dịch theo kịch bản nhóm">
      <Space>
      <input type="radio" />
        Quản lý chiến dịch theo kịch bản nhóm
      </Space>
    </Option>
  </Select>
  )
}

export default Selecter