import { useState } from "react";
import styles from "./set_up_role.module.css";
export default function TableOptions({ checkboxState, setCheckboxState }: any) {
  const handleSelectCheckbox = (event: {
    target: { name: any; checked: any };
  }) => {
    const { name, checked } = event.target;
    setCheckboxState((prevState: any) => ({
      ...prevState,
      checkboxItems: {
        ...prevState.checkboxItems,
        [name]: checked ? 1 : 0,
      },
    }));
  };

  return (
    <table className={styles.content_table_permi}>
      <thead>
        <tr>
          <th className={styles.border_left}>Chọn quyền</th>
          <th className={styles.th_01}>Thêm</th>
          <th className={styles.th_01}>Sửa</th>
          <th className={styles.th_01}>Xóa</th>
          <th className={styles.border_right}>Xem</th>
        </tr>
      </thead>
      <tbody>
        {/* module khách hàng */}
        <tr className="module" data-id_module={1}>
          <td className="title_module">Khách hàng</td>
          <td>
            <input
              name="custom_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.custom_1}
              onChange={handleSelectCheckbox}
              data-type={1}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="custom_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.custom_2}
              onChange={handleSelectCheckbox}
              data-type={2}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="custom_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.custom_3}
              onChange={handleSelectCheckbox}
              data-type={3}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="custom_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.custom_4}
              onChange={handleSelectCheckbox}
              data-type={4}
              type="checkbox"
            />
          </td>
        </tr>

        {/* module nhà cung cấp */}
        <tr className="module" data-id_module={2}>
          <td className="title_module">Nhà cung cấp</td>
          <td>
            <input
              name="provider_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.provider_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={1}
            />
          </td>
          <td>
            <input
              name="provider_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.provider_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={2}
            />
          </td>
          <td>
            <input
              name="provider_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.provider_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={3}
            />
          </td>
          <td>
            <input
              name="provider_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.provider_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={4}
            />
          </td>
        </tr>

        {/* module marketing */}
        <tr className="module" data-id_module={3}>
          <td className="title_module">Marketing</td>
          <td>
            <input
              name="mkt_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mkt_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={1}
            />
          </td>
          <td>
            <input
              name="mkt_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mkt_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={2}
            />
          </td>
          <td>
            <input
              name="mkt_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mkt_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
              data-type={3}
            />
          </td>
          <td>
            <input
              name="mkt_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mkt_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
        </tr>

        {/* module quản lý đơn hàng */}
        <tr className="module" data-id_module={4}>
          <td className="title_module">Quản lý đơn hàng</td>
          <td>
            <input
              name="mange_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mange_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="mange_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mange_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="mange_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mange_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="mange_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.mange_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
        </tr>

        {/* module chăm sóc khách hàng */}
        <tr className="module" data-id_module={5}>
          <td className="title_module">Chăm sóc khách hàng</td>
          <td>
            <input
              name="care_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.care_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="care_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.care_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="care_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.care_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="care_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.care_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
        </tr>

        {/* module quản lý thu chi */}
        <tr className="module" data-id_module={6}>
          <td className="title_module">Quản lý thu chi</td>
          <td>
            <input
              name="cost_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.cost_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="cost_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.cost_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="cost_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.cost_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="cost_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.cost_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
        </tr>

        {/* module báo cáo */}
        <tr className="module" data-id_module={7}>
          <td className="title_module">Báo cáo</td>
          <td>
            <input
              name="report_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.report_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="report_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.report_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="report_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.report_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="report_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.report_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
        </tr>

        {/* module quản lý chung */}
        <tr className="module" data-id_module={8}>
          <td className="title_module">Quản lý chung</td>
          <td>
            <input
              name="general_1"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.general_1}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="general_2"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.general_2}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="general_3"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.general_3}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
          <td>
            <input
              name="general_4"
              className={styles.check_box_input}
              checked={checkboxState.checkboxItems?.general_4}
              onChange={handleSelectCheckbox}
              type="checkbox"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
