const getTime = () => {
    const currentDate = new Date();

    // Lấy thông tin giờ và phút từ đối tượng Date
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    // Lấy thông tin ngày, tháng, và năm từ đối tượng Date
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript tính từ 0, nên cần cộng thêm 1
    const year = currentDate.getFullYear().toString();

    // Ghép nối thông tin thành chuỗi định dạng "10:10 - 22/03/2022"
    const formattedDate = `${hours}:${minutes} - ${day}/${month}/${year}`;
    return formattedDate
}
const getDay = () => {
    const currentDate = new Date();

    // Lấy thông tin giờ và phút từ đối tượng Date
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    // Lấy thông tin ngày, tháng, và năm từ đối tượng Date
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript tính từ 0, nên cần cộng thêm 1
    const year = currentDate.getFullYear().toString();

    // Ghép nối thông tin thành chuỗi định dạng "10:10 - 22/03/2022"
    const formattedDate =  `${day}/${month}/${year}`;
    return formattedDate
}
export const dataPotential = [] as {}[];
for (let i = 1; i <= 100; i++) {
    dataPotential.push({
        key: i,
        vocative: `string${i}`,
        name: `Hello aoaoaoaoao${i}`,
        office: `Hello ${i}`,
        myPhone: `100000${i}`,
        myEmail: "Strung",
        companyPhone: "string",
        companyEmail: "string",
        address: `stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring${i}`,
        tinh: `string${i}`,
        quan: `string${i}`,
        phuong: `string${i}`,
        type: `string${i}`,
        field: `string${i}`,
        description: `string${i}`,
        typecompany: `string${i}`,
        nameCreate: `string${i}`,
        nameDelete: `string${i}`,
        day:getDay(),
        timeDelete: getTime(),
        source: "Không xác định"
    })
}