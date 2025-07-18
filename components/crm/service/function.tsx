export const base_url="https://api.timviec365.vn"

export const convert_time= (timestamp) =>{
    const dateObj = new Date(timestamp * 1000);

    // Đặt múi giờ cho múi giờ +7
    const offset = 7 * 60 * 60 * 1000; // 7 giờ * 60 phút * 60 giây * 1000 milliseconds
    const localDateObj = new Date(dateObj.getTime() + offset);

    const formattedDate = `${
      localDateObj.getUTCDate() < 10 ? "0" : ""
    }${localDateObj.getUTCDate()}-${
      localDateObj.getUTCMonth() + 1 < 10 ? "0" : ""
    }${localDateObj.getUTCMonth() + 1}-${localDateObj.getUTCFullYear()}`;

    const formattedTime = `${
      localDateObj.getUTCHours() < 10 ? "0" : ""
    }${localDateObj.getUTCHours()}:${
      localDateObj.getUTCMinutes() < 10 ? "0" : ""
    }${localDateObj.getUTCMinutes()}:${
      localDateObj.getUTCSeconds() < 10 ? "0" : ""
    }${localDateObj.getUTCSeconds()}`;

    const outputTimeString = `${formattedDate}\n${formattedTime}`;
return outputTimeString
}