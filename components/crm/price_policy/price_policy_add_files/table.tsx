import TableDataPricePolicyAddFiles from "@/components/crm/table/table-price-policy-add-files";
import styles from "./add_file_price_policy.module.css";
import InputText from "./input_text";
export default function AddTable() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataPricePolicyAddFiles
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
