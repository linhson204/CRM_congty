import { useEffect, useState } from "react";
import { fetchApi } from "../ultis/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const useApi = (
    initialUrl: string,
    initialAccessToken: string,
    initialMethod: HttpMethod = "GET",
    initialBody: any = {}
) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    // Hàm get data từ API
    const fetchData = async (
        url: string = initialUrl,
        accessToken: string = initialAccessToken,
        method: HttpMethod = initialMethod,
        body: any = initialBody
    ) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchApi(url, accessToken, body, method);
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Hàm chỉnh sửa data lên API (tuỳ thuộc vào phương thức bên Be yêu cầu mà dùng POST hoặc PUT)
    const updateData = async (url: string, accessToken: string, method: HttpMethod, body: any) => {
        try {
            setLoading(true);
            setError(null);
            await fetchApi(url, accessToken, body, method);
            await fetchData(); 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xoá data
    const deleteData = async (url: string, accessToken: string) => {
        try {
            setLoading(true);
            setError(null);
            await fetchApi(url, accessToken, {}, "DELETE");
            await fetchData(); 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Các giá trị sẽ trả về (Nếu ko cần loading thì không cần khai báo vào.)
    return { data, loading, error, fetchData, updateData, deleteData };
};


