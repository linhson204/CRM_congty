import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (
    data: any[],
    filename: string,
    sheetName: string,
    columnHeaders: string[]
) => {
    const modifiedData = data.map((obj: { [key: string]: any }) => {
        const newObj: { [key: string]: any } = {};
        columnHeaders.forEach((header: string) => {
            newObj[header] = obj[header];
        });
        return newObj;
    });

    const worksheet = XLSX.utils.json_to_sheet(modifiedData, { header: columnHeaders });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, filename);
};

export default exportToExcel;
