export function timestampToCustomString(timestamp: number, type = 'text') {
    if (timestamp > 0) {
        const milliseconds = timestamp * 1000;

        const date = new Date(milliseconds);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        if (type === "input") {
            return `${year}-${month}-${day}`;
        }
        return `${day}/${month}/${year}`;
    }
    return `Chưa cập nhật`
}


export function stringToDateNumber(dateString: string): number {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
       return 
    }
    return date.getTime();
}




