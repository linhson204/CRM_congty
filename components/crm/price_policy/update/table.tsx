import TableDataPricePolicyUpdateFiles from "@/components/crm/table/table-price-policy-update-files";
import styles from "./update_file_price_policy.module.css";
import InputText from "./input_text";
export default function AddTable() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataPricePolicyUpdateFiles
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
