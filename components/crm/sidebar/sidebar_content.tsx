import { ID_HUNGHA } from "@/constants/home-constants";
import { getToken } from "@/pages/api/api-hr/token";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { AccessContext } from "../context/accessContext";
import { sidebar_button_group } from "../ultis/consntant";
import style from "./sidebar.module.css";

export default function SiebarContent({ isOpen, toggleModal }: any) {
  const tokenBase = Cookies.get("token_base365");
  const btnResize = useRef<HTMLDivElement>(null);
  const [accessRoleOpen, setAccessRoleOpen] = useState(false);
  const [isAutoOpen, setIsAutoOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isCustomCareOpen, setIsCustomCareOpen] = useState(false);
  const [isMKTOpen, setIsMKTOpen] = useState(false);
  const [isManageCostOpen, setIsManageCostOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [isCommodity, setIsCommodity] = useState(false);
  const [isWordSentitive, setIsWordSentitive] = useState(false);
  const [isRecruiterStatistic, setIsRecruiterStatistic] = useState(false);
  const [userType, setUserType] = useState(0);
  const [checkReceiver, setCheckReceiver] = useState(false);
  const [isAdminTimviec, setIsAdminTimviec] = useState(false);
  const [isAdminVl88, setIsAdminVl88] = useState(false);
  const [isAdminW247, setIsAdminW247] = useState(false);
  const [isAdminJK365, setIsAdminJK365] = useState(false);
  const [isAdminTd3s, setIsAdminTd3s] = useState(false);
  const [isStatisticAi, setIsStatisticAi] = useState(false)
  const [isAdminJob247, setIsAdminJob247] = useState(false);
  const [isAdminJobnew, setIsAdminJobnew] = useState(false);
  const [isAdminViec3s, setIsAdminViec3s] = useState(false);
  const [isToolFacebookOpen, setIsToolFacebookOpen] = useState(false);

  const { accessAcountRole, setAccessAcountRole }: any =
    useContext(AccessContext);

  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        setUserType(decodedToken?.data.type ?? 0);
        decodedToken?.data.com_id === ID_HUNGHA && setCheckReceiver(true);
      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      }
    };
    fetchDataType();
  }, []);
  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1024) {
        btnResize.current?.classList.remove("active_resize");
        btnResize.current?.querySelector("img")?.classList.remove("rotateBtn");
        document?.querySelectorAll(".none")?.forEach((node) => {
          node.classList.remove("none");
        });
      }
    }
  };

  const handleResizeSIdeBar = () => {
    toggleModal(!isOpen);
    setAccessRoleOpen(false);
    setIsCustomCareOpen(false);
    setIsCustomOpen(false);
    setIsAdminTimviec(false);
    setIsMKTOpen(false);
    setIsManageCostOpen(false);
    setProviderOpen(false);
    setIsToolFacebookOpen(false);
  };

  const handleOpenChild = (label: string) => {
    if (isOpen) {
      toggleModal(false);
    }
    if (label === "Phân quyền") {
      setAccessRoleOpen(!accessRoleOpen);
    }
    if (label === "Vật tư hàng hóa") {
      setIsCommodity(!isCommodity);
    }
    if (label === "Từ khóa nhạy cảm") {
      setIsWordSentitive(!isWordSentitive);
    }
    if (label === "Thống kê nhà tuyển dụng MXH") {
      setIsRecruiterStatistic(!isRecruiterStatistic);
    }
    if (label === "Auto") {
      setIsAutoOpen(!isAutoOpen);
    }
    if (label === "Thông tin khách hàng") {
      setIsCustomOpen(!isCustomOpen);
    }
    if (label === "Admin Timviec365") {
      setIsAdminTimviec(!isAdminTimviec);
    }
    if (label === "Admin Vieclam88") {
      setIsAdminVl88(!isAdminVl88);
    }
    if (label === "Admin Work247") {
      setIsAdminW247(!isAdminW247);
    }
    if (label === "Admin Joblike365") {
      setIsAdminJK365(!isAdminJK365);
    }
    if (label === "Admin Tuyendung3s") {
      setIsAdminTd3s(!isAdminTd3s);
    }

    if (label === "Chăm sóc khách hàng") {
      setIsCustomCareOpen(!isCustomCareOpen);
    }
    if (label === "Marketing") {
      setIsMKTOpen(!isMKTOpen);
    }
    if (label === "Quản lý thu chi") {
      setIsManageCostOpen(!isManageCostOpen);
    }

    if (label === "Nhà cung cấp") {
      setProviderOpen(!providerOpen);
    }

    if (label === "Thống kê AI") {
      setIsStatisticAi(!isStatisticAi)
    }

    if (label === "Admin Job247") {
      setIsAdminJob247(!isAdminJob247)
    }

    if (label === "Admin Jobnew") {
      setIsAdminJobnew(!isAdminJobnew)
    }

    if (label === "Admin Viec3s") {
      setIsAdminViec3s(!isAdminViec3s)
    }

    if (label === "Tool facebook") {
      setIsToolFacebookOpen(!isToolFacebookOpen)
    }
  };

  const isOpenChild = (label: string) => {
    if (label === "Phân quyền") {
      return accessRoleOpen;
    }
    if (label === "Thông tin khách hàng") {
      return isCustomOpen;
    }

    if (label === "Auto") {
      return isAutoOpen;
    }
    if (label === "Từ khóa nhạy cảm") {
      return isWordSentitive;
    }
    if (label === "Thống kê nhà tuyển dụng MXH") {
      return isRecruiterStatistic;
    }
    if (label === "Chăm sóc khách hàng") {
      return isCustomCareOpen;
    }
    if (label === "Marketing") {
      return isMKTOpen;
    }
    if (label === "Quản lý thu chi") {
      return isManageCostOpen;
    }
    if (label === "Nhà cung cấp") {
      return providerOpen;
    }
    if (label === "Vật tư hàng hóa") {
      return isCommodity;
    }

    if (label === "Admin Timviec365") {
      return isAdminTimviec;
    }
    if (label === "Admin Vieclam88") {
      return isAdminVl88;
    }
    if (label === "Admin Work247") {
      return isAdminW247;
    }
    if (label === "Admin Joblike365") {
      return isAdminJK365;
    }
    if (label === "Admin Tuyendung3s") {
      return isAdminTd3s;
    }

    if (label === "Thống kê AI") {
      return isStatisticAi;
    }

    if (label === "Admin Job247") {
      return isAdminJob247
    }

    if (label === "Admin Jobnew") {
      return isAdminJobnew
    }

    if (label === "Admin Viec3s") {
      return isAdminViec3s
    }

    if (label === "Tool facebook") {
      return isToolFacebookOpen
    }
  };

  useEffect(() => {
    if (!isOpen) {
      btnResize.current?.classList.remove("active_resize");
      btnResize.current?.querySelector("img")?.classList.remove("rotateBtn");
    } else {
      btnResize.current?.classList.add("active_resize");
      btnResize.current?.querySelector("img")?.classList.add("rotateBtn");
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebar_button_group_company = [
    {
      img_link: "/crm/home.svg",
      link: `/home`,
      children: [],
      content: "Trang chủ",
    },
    {
      img_link: "/crm/role.svg",
      link: `#`,
      content: "Phân quyền",
      children: [
        {
          blank: "",
          label: "Thiết lập quyền",
          link: "/thiet-lap-quyen",
        },
        {
          blank: "_blank",
          label: "Bổ nhiệm, quy hoạch",
          link: "#",
          // link: "https://phanmemnhansu.timviec365.vn/bien-dong-nhan-su.html?tab=1",
        },
      ],
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Danh sách khách hàng",
          link: "/customer/list",
        },
        {
          blank: "",
          label: "Nhóm khách hàng",
          link: "/customer/group/list",
        },
        {
          blank: "",
          label: "Tình trạng khách hàng",
          link: "/tinh-trang-khach-hang",
        },
        {
          blank: "",
          label: "Nhập liệu",
          link: "/customer/input/add",
        },
        {
          blank: "",
          label: "Đề xuất cộng điểm",
          link: "/customer/point/list",
        },
        {
          blank: "",
          label: "Danh sách ứng viên",
          link: "/customer/cadidate/list",
        },
        {
          blank: "",
          label: "Danh sách ứng viên cập nhật",
          link: "/customer/cadidate/listupdate",
        },
        {
          blank: "",
          label: "Thư mời phỏng vấn",
          link: "/customer/candiLetter",
        },
        {
          blank: "",
          label: "Điểm Nhà tuyển dụng",
          link: "/customer/pointsNTD",
        },
        {
          blank: "",
          label: "Tin tuyển dụng bảo lưu",
          link: "/customer/reserveNew",
        }
      ],
      content: "Thông tin khách hàng",
    },
    {
      img_link: "/crm/hotline.svg",
      link: "/crm",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Tổng đài",
          link: "/tong-dai",
        },
        {
          blank: "",
          label: "Khảo sát",
          link: "/khao-sat",
        },
        {
          blank: "",
          label: "Lịch chăm sóc khách hàng",
          link: "/lich-cham-soc-khach-hang",
        },
        {
          blank: "",
          label: "Lịch hẹn",
          link: "/lich-hen",
        },
      ],
      content: "Chăm sóc khách hàng",
    },
    {
      img_link: "/crm/i_cds365.svg",
      link: "#",
      children: [
        {
          blank: "",
          label: "Quét ứng viên từ FB",
          link: "/quet-ung-vien/list",
        },
        {
          blank: "",
          label: "Danh sách Link tin nhắn",
          link: "/quet-link-tin-nhan/list",
        },
        {
          blank: "",
          label: "Danh sách tin AI bình luận",
          link: "/save-link/list",
        },
        {
          blank: "",
          label: "Danh sách bài video đăng nhóm",
          link: "/quet-video-dang-nhom/list",
        },
        {
          blank: "",
          label: "Danh sách bài JD đăng nhóm",
          link: "/quet-jd-dang-nhom/list",
        },
      ],
      content: "Thống kê AI",
    },
    // {
    //   img_link: "/crm/hotline.svg",
    //   link: "/quet-ung-vien/list",
    //   content: "Quét ứng viên từ FB",
    // },
    // {
    //   img_link: "/crm/i_cds365.svg",
    //   link: "/quet-link-tin-nhan/list",
    //   content: "Danh sách Link tin nhắn",
    // },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/timviec365/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/timviec365/list_company_new",
        },
        {
          blank: "",
          label: "NTD đăng nhập",
          link: "/admin/timviec365/login_company",
        },
        {
          blank: "",
          label: "Tất cả NTD",
          link: "/admin/timviec365/list_all_company",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/timviec365/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/timviec365/list_news",
        },
        {
          blank: "",
          label: "Danh sách tin nhạy cảm",
          link: "/admin/timviec365/list_new_bad_word",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/timviec365/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/timviec365/list_history_point",
        },
        {
          blank: "",
          label: "Lịch sử cộng điểm",
          link: "/admin/timviec365/list_history_add_point",
        },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/timviec365/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/timviec365/apply_candidates",
        },
        {
          blank: "",
          label: "Duyệt ứng viên ứng tuyển sai",
          link: "/admin/timviec365/apply_fail",
        },
        {
          blank: "",
          label: "Tổng các tab",
          link: "/admin/timviec365/sum",
        },
      ],
      content: "Admin Timviec365",
    },

    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/vieclam88/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/vieclam88/list_company_new",
        },
        {
          blank: "",
          label: "NTD đăng nhập",
          link: "/admin/vieclam88/login_company",
        },
        {
          blank: "",
          label: "Tất cả NTD",
          link: "/admin/vieclam88/list_all_company",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/vieclam88/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/vieclam88/list_news",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/vieclam88/list_history_point",
        },
        {
          blank: "",
          label: "Lịch sử cộng điểm",
          link: "/admin/vieclam88/list_history_add_point",
        },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/vieclam88/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/vieclam88/apply_candidates",
        },
      ],
      content: "Admin Vieclam88",
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/Joblike365/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/Joblike365/list_company_new",
        },
        {
          blank: "",
          label: "NTD đăng nhập",
          link: "/admin/Joblike365/login_company",
        },
        {
          blank: "",
          label: "Tất cả NTD",
          link: "/admin/Joblike365/list_all_company",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/Joblike365/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/Joblike365/list_news",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/Joblike365/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/Joblike365/list_history_point",
        },
      ],
      content: "Admin Joblike365",
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/work247/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/work247/list_company_new",
        },
        {
          blank: "",
          label: "NTD đăng nhập",
          link: "/admin/work247/login_company",
        },
        {
          blank: "",
          label: "Tất cả NTD",
          link: "/admin/work247/list_all_company",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/work247/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/work247/list_news",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/work247/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/work247/list_history_point",
        },
        {
          blank: "",
          label: "Lịch sử cộng điểm",
          link: "/admin/work247/list_history_add_point",
        },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/work247/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/work247/apply_candidates",
        },
      ],
      content: "Admin Work247",
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/tuyendung3s/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/tuyendung3s/list_company_new",
        },
        // {
        //   blank: "",
        //   label: "NTD đăng nhập",
        //   link: "/admin/tuyendung3s/login_company",
        // },
        // {
        //   blank: "",
        //   label: "Tất cả NTD",
        //   link: "/admin/tuyendung3s/list_all_company",
        // },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/tuyendung3s/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/tuyendung3s/list_news",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/tuyendung3s/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/tuyendung3s/list_history_point",
        },
        // {
        //   blank: "",
        //   label: "Lịch sử cộng điểm",
        //   link: "/admin/tuyendung3s/list_history_add_point",
        // },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/tuyendung3s/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/tuyendung3s/apply_candidates",
        },
      ],
      content: "Admin Tuyendung3s",
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/job247/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/job247/list_company_new",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/job247/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/job247/list_news",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/job247/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/job247/list_history_point",
        },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/job247/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/job247/apply_candidates",
        },
      ],
      content: "Admin Job247",
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/jobnew/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/jobnew/list_company_new",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/jobnew/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/jobnew/list_news",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/jobnew/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/jobnew/list_history_point",
        },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/jobnew/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/jobnew/apply_candidates",
        },
      ],
      content: "Admin Jobnew",
    },
    {
      img_link: "/crm/customer.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Thêm mới NTD",
          link: "/admin/viec3s/add_company",
        },
        {
          blank: "",
          label: "NTD đăng ký mới",
          link: "/admin/viec3s/list_company_new",
        },
        {
          blank: "",
          label: "Đăng tin mới",
          link: "/admin/viec3s/create_news",
        },
        {
          blank: "",
          label: "Danh sách tin đăng",
          link: "/admin/viec3s/list_news",
        },
        {
          blank: "",
          label: "Danh sách điểm",
          link: "/admin/viec3s/list_point",
        },
        {
          blank: "",
          label: "Lịch sử điểm",
          link: "/admin/viec3s/list_history_point",
        },
        {
          blank: "",
          label: "Chuyên viên gửi ứng viên",
          link: "/admin/viec3s/specialists_candidates",
        },
        {
          blank: "",
          label: "Ứng viên tự ứng tuyển",
          link: "/admin/viec3s/apply_candidates",
        },
      ],
      content: "Admin Viec3s",
    },
    {
      img_link: "/crm/contract.svg",
      link: "/contract/list",
      children: [],
      content: "Hợp đồng",
    },

    {
      img_link: "/crm/nav_potential.svg",
      link: `/potential/list`,
      children: [],
      content: "Tiềm năng",
    },
    {
      img_link: "/crm/chance.svg",
      link: "/chance/list",
      children: [],
      content: "Cơ hội",
    },
    {
      img_link: "/crm/chiendich.svg",
      link: "/campaign/list",
      children: [],
      content: "Chiến dịch",
    },
    {
      img_link: "/crm/form.svg",
      link: "#",
      // role: "seen",
      children: [],
      content: "Báo cáo",
    },
    {
      img_link: "/crm/baogia.svg",
      link: "/quote/list",
      children: [],
      content: "Báo giá",
    },
    {
      img_link: "/crm/nav-price-promotion.svg",
      link: "/promotion/list",
      children: [],
      content: "Quản lý khuyến mãi",
    },

    {
      img_link: "/crm/warehouse.png",
      link: "#",
      children: [
        {
          blank: "",
          label: "Danh sách vật tư, hàng hóa",
          link: "/commodity/list",
        },
        {
          blank: "",
          label: "Nhóm vật tư, hàng hóa",
          link: "/commodity/group",
        },
        {
          blank: "",
          label: "Đơn vị tính",
          link: "/commodity/unit",
        },
      ],
      content: "Vật tư hàng hóa",
    },
    {
      img_link: "/crm/marketing.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Email",
          link: "/marketing/email",
        },
        {
          blank: "",
          label: "SMS",
          link: "/marketing/sms",
        },
        {
          blank: "",
          label: "Zalo",
          link: "/marketing/zalo",
        },
        {
          blank: "",
          label: "Facebook",
          link: "/marketing/facebook",
        },
      ],
      content: "Marketing",
    },
    {
      img_link: "/crm/cart.svg",
      link: "/order/list",
      children: [],
      content: "Quản lý đơn hàng",
    },
    {
      img_link: "/crm/cart.svg",
      link: "/order-new/list",
      children: [],
      content: "Quản lý đơn hàng mới",
    },
    // {
    //   img_link: "/crm/i_cds365.svg",
    //   link: "/save-link/list",
    //   children: [],
    //   content: "Danh sách tin AI bình luận",
    // },
    {
      img_link: "/crm/bill.svg",
      link: "/bill/list",
      children: [],
      content: "Quản lý hoá đơn",
    },
    {
      img_link: "/crm/supplier.svg",
      link: "/price_policy/list",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Danh sách nhà cung cấp",
          link: "/supplier/list",
        },
        {
          blank: "",
          label: "Nhóm nhà cung cấp",
          link: "/supplier/group",
        },
      ],
      content: "Nhà cung cấp",
    },
    {
      img_link: "/crm/nav_price_policy.svg",
      link: "/price_policy/list",
      children: [],
      content: "Chính sách giá",
    },
    {
      img_link: "/crm/nav_product_return.svg",
      link: "/product_return/list",
      children: [],
      content: "Trả lại hàng bán",
    },
    {
      img_link: "/crm/re-expen.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Theo dõi thu chi",
          link: "/theo-doi-thu-chi",
        },
        {
          blank: "",
          label: "Phiếu thu",
          link: "/phieu-thu",
        },
        {
          blank: "",
          label: "Phiếu chi",
          link: "/phieu-chi",
        },
        {
          blank: "",
          label: "Sổ quỹ",
          link: "/so-quy",
        },
        {
          blank: "",
          label: "Công nợ",
          link: "/cong-no-nha-cung-cap",
        },
        {
          blank: "",
          label: "Sản phẩm",
          link: "/san-pham",
        },
      ],
      content: "Quản lý thu chi",
    },
    {
      img_link: "/crm/nav_bin.svg",
      link: "/delete_data/list",
      children: [],
      content: "Dữ liệu đã xoá",
    },
    {
      img_link: "/crm/nav_setting.svg",
      link: "/setting/main",
      // role: "seen",
      children: [],
      content: "Cài đặt",
    },
    {
      img_link: "/crm/i_cds365.svg",
      link: "https://hungha365.com/",
      children: [],
      content: "Chuyển đổi số",
    },
    {
      img_link: "/crm/hotline.svg",
      link: "/approve-post/main",
      children: [],
      content: "Phê duyệt bài viết",
    },

    
    {
      img_link: "/crm/re-expen.svg",
      link: "#",
      // role: "seen",
      children: [
        {
          blank: "",
          label: "Theo dõi thu chi",
          link: "/theo-doi-thu-chi",
        },
        {
          blank: "",
          label: "Phiếu thu",
          link: "/phieu-thu",
        },
        {
          blank: "",
          label: "Phiếu chi",
          link: "/phieu-chi",
        },
        {
          blank: "",
          label: "Sổ quỹ",
          link: "/so-quy",
        },
        {
          blank: "",
          label: "Công nợ",
          link: "/cong-no-nha-cung-cap",
        },
        {
          blank: "",
          label: "Sản phẩm",
          link: "/san-pham",
        },
      ],
      content: "Quản lý thu chi",
    },
    {
        img_link: "/crm/customer.svg",
        link: `/toolfacebook/tham-gia-nhom/HomePage`,
        // children: [
        //   {
        //     blank: "",
        //     label: "Đăng bài",
        //     link: "/toolfacebook/dang-bai",
        //   },
        //   {
        //     blank: "",
        //     label: "Nhắn tin",
        //     link: "/toolfacebook/nhan-tin",
        //   },
        //   {
        //     blank: "",
        //     label: "Tham gia nhóm",
        //     link: "/toolfacebook/tham-gia-nhom/HomePage",
        //   },
        // ],
        content: "Tool facebook",
      },

    {
      img_link: "/crm/i_cds365.svg",
      link: "https://hungha365.com/",
      children: [],
      content: "",
    },
  ];
  
  
  checkReceiver &&
    userType <= 2 &&
    sidebar_button_group_company.splice(
      1,
      0,
      {
        img_link: "/crm/nav_setting.svg",
        link: `#`,
        children: [
          {
            blank: "",
            label: "Đề xuất",
            link: "/word",
          },
          {
            blank: "",
            label: "Danh sách vi phạm",
            link: "/word/list",
          },
        ],
        content: "Từ khóa nhạy cảm",
      },
      {
        img_link: "/crm/nav_setting.svg",
        link: "#",
        children: [
          {
            blank: "",
            label: "Xét duyệt",
            link: "/contact/set-role",
          },
          {
            blank: "",
            label: "AutoCall",
            link: "/contact/phone",
          },
          {
            blank: "",
            label: "AutoEmail",
            link: "/contact/email",
          },
          {
            blank: "",
            label: "AutoZalo",
            link: "/contact/zalo",
          },
        ],
        content: "Auto",
      }
    );


  const [infoRole, setInfoRole] = useState([]);

  const handleGetThongTinQuyen = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/role/show-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenBase}`,
          },

          body: JSON.stringify({
            id_user: "10000168",
          }),
        }
      );
      const data = await res.json();
      if (data && data?.data) {
        setInfoRole(data?.data?.roles);
      }
    } catch (error) { }
  };
  useEffect(() => {
    handleGetThongTinQuyen();
  }, []);
  return (
    <>
      <div className={style.sidebar_content}>
        {(accessAcountRole.role === "company"
          ? sidebar_button_group_company
          : sidebar_button_group
        )?.map((items: any, i) => {
          return (
          <>
            {/* {items?.role === "seen" ? ( */}
            <div className={style.item_parent} key={i}>
              {items && items.children && items.children.length > 0 ? (
                <>
                  <div
                    onClick={() => handleOpenChild(items.content)}
                    className={style.item_link}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={items.img_link}
                      className={style.img_link}
                      alt="icon"
                    />
                    <div
                      className={`${style.title} ${!isOpen ? null : "none"}`}
                    >
                      {items.content}
                    </div>
                  </div>
                  {isOpenChild(items.content) && (
                    <ul className={style.navbar_treeview}>
                      {items.children.length > 0 &&
                        items?.children.map((child, index) => (
                          <li key={index}>
                            <Link
                              target={child.blank}
                              href={child.link}
                              className={style.navbar__item_link}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={items.link}
                  className={style.item_link}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={items.img_link}
                    className={style.img_link}
                    alt="icon"
                  />
                  <div className={`${style.title} ${!isOpen ? null : "none"}`}>
                    {items.content}
                  </div>
                </Link>
              )}
            </div>
            {/* ) : ( */}
            {/* <></> */}
            {/* )} */}
          </>
        )})}
      </div>
      <button
        ref={btnResize as any}
        type="button"
        className={style.btn_zoom}
        onClick={handleResizeSIdeBar}
      >
        <img src="/crm/navBarZoom.svg" alt="btn" />
      </button>
    </>
  );
}
