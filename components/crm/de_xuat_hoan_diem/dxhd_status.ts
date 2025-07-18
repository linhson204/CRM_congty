export const dxhd_status = [
    // {
    //     value: 0,
    //     label: 'Tất cả',
    //     color: '#4C5BD4'
    // },
    {
        value: 1,
        label: 'Chờ tiếp nhận',
        color: '#FFA800'
    },
    {
        value: 2,
        label: 'Đã tiếp nhận',
        color: '#4C5BD4'
    },
    {
        value: 3,
        label: 'Từ chối',
        color: '#FF3333'
    },
    {
        value: 4,
        label: 'Đang xử lý',
        color: '#4C5BD4'
    },
    {
        value: 5,
        label: 'Xử lý xong',
        color: '#00CE2D'
    }
]

export const dxhd_status_admin = [
    {
        value: 1,
        label: 'Chuyên viên xử lý xong',
        color: '#4C5BD4'
    },
    {
        value: 2,
        label: 'Tổng đài đã duyệt',
        color: '#00CE2D'
    },
    {
        value: 3,
        label: 'Tổng đài từ chối',
        color: '#FF3333'
    },
]

export const dxhd_req_status = [
    // {
    //     value: 0,
    //     label: 'Tất cả',
    //     color: '#4C5BD4'
    // },
    {
        value: 1,
        label: 'Chưa xử lý',
        color: '#4C5BD4'
    },
    {
        value: 2,
        label: 'Từ chối',
        color: '#FF3333'
    },
    {
        value: 3,
        label: 'Duyệt',
        color: '#00CE2D'
    },
]

export function dxhd_status_available() {
    // return dxhd_status.slice(1)
    return dxhd_status
}

export function dxhd_status_admin_available() {
    return dxhd_status_admin
}

export function dxhd_status_num_to_string (num: number): string {
    const foundObj = dxhd_status.find(s => s.value === num);
    return foundObj ? foundObj.label : ''
}

export function dxhd_status_num_to_color (num: number): string {
    const foundObj = dxhd_status.find(s => s.value === num);
    return foundObj ? foundObj.color : 'inherit'
}

export function dxhd_req_status_num_to_string (num: number): string {
    const foundObj = dxhd_req_status.find(s => s.value === num);
    return foundObj ? foundObj.label : ''
}

export function dxhd_req_status_num_to_color (num: number): string {
    const foundObj = dxhd_req_status.find(s => s.value === num);
    return foundObj ? foundObj.color : 'inherit'
}

export function isAccepted (num: number): boolean {
    return [2, 4, 5].includes(num)
}

export function isWaiting (num: number): boolean {
    return num === 1
}

export function isDenied (num: number): boolean {
    return num === 3
}

export function isReqAccepted (num: number): boolean {
    return num === 3
}

export function dxhd_status_admin_num_to_string (num: number): string {
    const foundObj = dxhd_status_admin.find(s => s.value === num);
    return foundObj ? foundObj.label : ''
}

export function dxhd_status_admin_num_to_color (num: number): string {
    const foundObj = dxhd_status_admin.find(s => s.value === num);
    return foundObj ? foundObj.color : 'inherit'
}