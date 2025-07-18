// Su dung ham nay de xu ly API

export const fetchApi = async (
    url: string,
    accessToken: string,
    body: any = {},
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET"
) => {
    try {
        const res = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
                "Content-Type": "application/json", // Thêm header Content-Type
                mode: 'no-cors'
            },
            body: method === "GET" ? null : JSON.stringify(body), // Chỉ truyền body nếu là phương thức POST
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Có lỗi xảy ra khi gọi API");
        }

        return data;
    } catch (err) {
        // console.error(err);
        return err
    }
};
