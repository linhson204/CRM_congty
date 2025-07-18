import TableDataSalesProcess from "@/components/crm/table/table-setting-sales-process";
export default function AddTable() {
  return (
    <div>
      <TableDataSalesProcess
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
