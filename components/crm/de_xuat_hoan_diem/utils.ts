
export function getPropOrDefault(obj, propPath: string, defaultValue: any = '') { // Lấy của đối tượng theo trường, nếu không có trả giá trị mặc định
    const props = propPath.split('.');
    let currentObj = obj;

    for (const prop of props) {
        if (currentObj && currentObj.hasOwnProperty(prop)) {
            currentObj = currentObj[prop];
        } else {
            return defaultValue;
        }
    }

    return currentObj ?? defaultValue;
}