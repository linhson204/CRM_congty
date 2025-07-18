import * as XLSX from "xlsx";

export const ExcelDownload = (data: any, name: string) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const blob = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([blob], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(excelBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
};
