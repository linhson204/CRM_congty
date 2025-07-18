import { useEffect, useState } from "react";
import s from "./index.module.css";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { useHeader } from "@/components/crm/hooks/useHeader";

interface DetailPoint {
  response: any;
}

const Index: React.FC<DetailPoint> = ({ response }) => {
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle(`Chi tiết đề xuất`);
    setShowBackButton(true);
    setCurrentPath("/customer/point/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const data = response;
  const [type, setType] = useState();
  const router = useRouter();
  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setType(decodedToken?.data?.type);
    }
  }, []);
  const getTime = (time: number) => {
    try {
      const date = new Date(null);
      date.setSeconds(time);
      const ngay = date.getDate();
      const thang = date.getMonth() + 1;
      const nam = date.getFullYear();
      const gio = date.getHours();
      const phut = date.getMinutes();
      return `${gio}:${phut} ngày ${ngay}/${thang}/${nam}`;
    } catch (error) {
      return "";
    }
  };
  const { id } = router.query;

  const handleClick = async () => {
    const response = await axiosCRMv2("customer/DuyetDexuatCongDiem", {
      IdDeXuat: id,
      company: data?.dexuat?.company,
    });
    if (response.data) {
      alert("Duyệt đề xuất thành công!");
      router.reload();
    } else {
      alert("Có lỗi xảy ra!");
    }
  };

  const handleClickCancel = async () => {
    const response = await axiosCRMv2("customer/DeleteDeXuat", {
      IdDeXuat: id,
      company: data?.dexuat?.company,
    });
    if (response.message) {
      alert("Xoá đề xuất thành công!");
      router.push("/customer/point/list");
    } else {
      alert("Có lỗi xảy ra!");
    }
  };
  return (
    <>
      <div className={s.container}>
        <div className={s.title}>Đề xuất cộng điểm #{data?.dexuat?._id}</div>
        <div>Người tạo đề xuất:&nbsp;&nbsp;&nbsp;{data?.creator?.userName}</div>
        <div>
          Thời gian tạo đề xuất:&nbsp;&nbsp;&nbsp;
          {getTime(data?.dexuat?.createdAt)}
        </div>
        <div>Công ty:&nbsp;&nbsp;&nbsp;{data?.dexuat?.company}</div>
        <div>Số điểm:&nbsp;&nbsp;&nbsp;{data?.dexuat?.point}</div>
        <div>
          Trạng thái:
          <span className={s.status_0}>
            &nbsp;&nbsp;&nbsp;
            {data?.dexuat?.status == 0 && "Chờ xác nhận"}
          </span>
          <span className={s.status_1}>
            &nbsp;&nbsp;&nbsp;
            {data?.dexuat?.status == 1 && "Đã chấp nhận"}
          </span>
          <span className={s.status_2}>
            &nbsp;&nbsp;&nbsp;
            {data?.dexuat?.status == 2 && "Đã từ chối"}
          </span>
        </div>
        {type == 1 && !data?.dexuat?.status && (
          <div className={s.btn}>
            <div className={s.btn_accept} onClick={() => handleClick()}>
              Đồng ý
            </div>
            <div className={s.btn_cancel} onClick={() => handleClickCancel()}>
              Từ chối
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Index;
