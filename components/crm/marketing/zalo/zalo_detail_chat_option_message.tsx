import React, { useRef } from 'react';
import styles from '../marketing.module.css'

const OptionDetailRepMessage = () => {
    const boxOptionsRef  = useRef<any>(null);

  const handleClickOut = () => {
    
  }
  return (
    <div className={styles.detail_options_handle}>
        <ul ref={boxOptionsRef}>
            <li>Lưu</li>
            <li>Trả lời</li>
            <li>Đánh dấu tin nhắn</li>
            <li>Ghim tin nhắn</li>
            <li>Lưu vào lưu trữ cá nhân</li>
            <li>Sao chép</li>
            <li>Chuyển tiếp</li>
            <li>Chọn tin nhắn</li>
            <li>Chi tiết tin nhắn</li>
            <li>Xóa</li>
        </ul>
    </div>
  )
}

export default OptionDetailRepMessage