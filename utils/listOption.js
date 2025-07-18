export const getVocative = [
  { value: 1, label: "Anh" },
  { value: 2, label: "Chị" },
  { value: 3, label: "Ông" },
  { value: 4, label: "Bà" },
];
export const renderVocative = (id) => {
  const option = {
    1: "Anh",
    2: "Chị",
    3: "Ông",
    4: "Bà",
  };
  if (!option[id]) {
    return "Chưa cập nhập";
  }
  return option[id];
};
export const getPotentialPosition = [
  { value: 1, label: "Chủ tịch" },
  { value: 2, label: "Phó chủ tịch" },
  { value: 3, label: "Tổng giám đốc" },
  { value: 4, label: "Phó tổng giám đốc" },
  { value: 5, label: "Giám đốc" },
  { value: 6, label: "kế toán trưởng" },
  { value: 7, label: "Trưởng phòng" },
  { value: 8, label: "Trợ lý" },
  { value: 9, label: "Nhân viên" },
];
export const renderPotentialPosition = (id) => {
  const option = {
    1: "Chủ tịch",
    2: "Phó chủ tịch",
    3: "Tổng giám đốc",
    4: "Phó tổng giám đốc",
    5: "Giám đốc",
    6: "kế toán trưởng",
    7: "Trưởng phòng",
    8: "Trợ lý",
    9: "Nhân viên",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};

export const getPotentialDepartment = [
  { value: 1, label: "Ban giám đốc" },
  { value: 2, label: "Phòng tài chính" },
  { value: 3, label: "Phòng nhân sự " },
  { value: 4, label: "Phòng marketing" },
  { value: 5, label: "Phòng CSKH" },
  { value: 6, label: "Phòng hành chính tổng hợp" },
  { value: 7, label: "Phòng kỹ thuật" },
  { value: 8, label: "Phòng kinh doanh" },
];
export const renderPotentialDepartment = (id) => {
  const option = {
    1: "Ban giám đốc",
    2: "Phòng tài chính",
    3: "Phòng nhân sự ",
    4: "Phòng marketing",
    5: "Phòng CSKH",
    6: "Phòng hành chính tổng hợp",
    7: "Phòng kỹ thuật",
    8: "Phòng kinh doanh",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};

export const getPotentialResource = [
  { value: 1, label: "Facebook" },
  { value: 2, label: "Zalo" },
  { value: 3, label: "Website" },
  { value: 4, label: "Dữ liệu bên thứ 3" },
  { value: 5, label: "Khách hàng giới thiệu" },
  { value: 6, label: "Giới thiệu" },
  { value: 7, label: "Chăm sóc khách hàng" },
  { value: 8, label: "Email" },
];

export const renderPotentialResource = (id) => {
  const option = {
    1: "Facebook",
    2: "Zalo",
    3: "Website",
    4: "Dữ liệu bên thứ 3",
    5: "Khách hàng giới thiệu",
    6: "Giới thiệu",
    7: "Chăm sóc khách hàng",
    8: "Email",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};

export const getPotentialType = [
  { value: 1, label: "Khách hàng bán lẻ " },
  { value: 2, label: "Khách hàng dự án" },
];
export const renderPotentialType = (id) => {
  const option = {
    1: "Khách hàng bán lẻ",
    2: "Khách hàng dự án",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};
//Bản chất -add
export const getCategory = [
  { value: 1, label: "Hàng hóa" },
  { value: 2, label: "Thành phẩm" },
  { value: 3, label: "Bán thành phẩm" },
  { value: 4, label: "Nguyên vật liệu" },
  { value: 5, label: "Dịch vụ" },
  { value: 6, label: "Công cụ dịch vụ" },
];

export const renderCategory = (id) => {
  const option = {
    1: "Hàng hóa",
    2: "Thành phẩm",
    3: "Bán thành phẩm",
    4: "Nguyên vật liệu",
    5: "Dịch vụ",
    6: "Công cụ dịch vụ",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};
export const getListDate = [
  { value: 1, label: "Ngày" },
  { value: 2, label: "Tháng" },
  { value: 3, label: "Năm" },
];
export const renderListDate = (id) => {
  const option = {
    0: "Không có dữ liệu",
    1: "Ngày",
    2: "Tháng",
    3: "Năm",
  };
  if (!option[id]) {
    return "";
  }
  return option[id];
};
export const getPotentialSocial = [
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "Zalo", label: "Zalo" },
  { value: "Telegram", label: "Telegram" },
  { value: "Twitter", label: "Twitter" },
  { value: "Tiktok", label: "Tiktok" },
  { value: "Skype", label: "Skype" },
  { value: "Youtube", label: "Youtube" },
  { value: "Linkedn", label: "Linkedn" },
];

export const getPotentiaGender = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
];
export const renderListGender = (id) => {
  const option = {
    1: "Nam",
    2: "Nữ",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};

export const LIST_BANK = [
  { value: 323, label: "Ngân hàng An Bình (ABBank)" },
  { value: 307, label: "Ngân hàng Á Châu (ACB)" },
  { value: 204, label: "Ngân hàng NN & PTNT VN (Agribank, VBARD)" },
  { value: 359, label: "Ngân hàng TMCP Bảo Việt (Baoviet Bank)" },
  { value: 202, label: "Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)" },
  { value: 661, label: "Ngân hàng TNHH MTV CIMB Việt Nam (CIMB)" },
  { value: 304, label: "Ngân hàng Đông Á (Dong A Bank, DAB)" },
  { value: 305, label: "Ngân hàng Xuất nhập khẩu Việt Nam (Eximbank, EIB)" },
  { value: 320, label: "Ngân hàng Dầu khí Toàn cầu (GP Bank)" },
  { value: 321, label: "Ngân hàng Phát triển TP HCM (HDBank)" },
  { value: 603, label: "Ngân hàng Hong Leong Viet Nam (HLO)" },
  { value: 502, label: "Indovina Bank (IVB)" },
  { value: 353, label: "Ngân hàng Kiên Long (Kienlongbank)" },
  {
    value: 357,
    label: "Ngan hàng TMCP Bưu điện Liên Việt (Lienvietbank, LPB)",
  },
  { value: 302, label: "Ngân hàng Hàng Hải Việt Nam (Maritime Bank, MSB)" },
  { value: 311, label: "Ngân hàng Quân Đội (MB)" },
  { value: 306, label: "Ngân hàng Nam Á (Nam A Bank, NAB)" },
  { value: 313, label: "Ngân hàng Bắc Á (NASBank, NASB)" },
  { value: 352, label: "Ngân hàng Quoc Dan (NCB)" },
  { value: 319, label: "Ngân hàng Đại Dương (Ocean Bank)" },
  {
    value: 333,
    label: "Ngân hàng Phương Đông (Oricombank, OCB, PhuongDong Bank)",
  },
  { value: 341, label: "Ngân hàng Xăng dầu Petrolimex (PG Bank)" },
  { value: 360, label: "NH TMCP Đại Chúng Viet Nam (PVcombank)" },
  { value: 303, label: "Ngân hàng Sài Gòn Thương Tín (Sacombank)" },
  { value: 308, label: "Ngân hàng Sài Gòn Công Thương (Saigonbank)" },
  { value: 334, label: "Ngân hàng TMCP Sài Gòn (SCB)" },
  { value: 317, label: "Ngân hàng TMCP Đông Nam Á (SeABank)" },
  { value: 348, label: "Ngân hàng Sài Gòn - Hà Nội (SHB)" },
  { value: 616, label: "Ngân hàng TNHH MTV Shinhan Việt Nam (Shinhan Bank)" },
  { value: 310, label: "Ngân hàng Kỹ thương Việt Nam (Techcombank, TCB)" },
  { value: 618, label: "United Oversea Bank (UOB)" },
  { value: 314, label: "Ngân hàng Quốc tế (VIBank, VIB)" },
  { value: 501, label: "Ngân hàng VID Public (VID public)" },
  { value: 355, label: "Ngân hàng Việt Á (VietA Bank, VAB)" },
  { value: 356, label: "Ngân hàng Việt Nam Thương Tín (Vietbank)" },
  { value: 327, label: "NHTMCP Bản Việt (VietCapital Bank)" },
  { value: 203, label: "Ngân hàng TMCP Ngoại Thương (Vietcombank, VCB)" },
  { value: 201, label: "Ngân hàng công thương Việt Nam (Vietinbank)" },
  {
    value: 309,
    label: "Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng (VPBank)",
  },
  { value: 505, label: "Ngân hàng Liên doanh Việt Nga (VRB)" },
  { value: 624, label: "WOORI BANK Hà Nội (WHHN)" },
];
export const renderBank = (id) => {
  const option = {
    323: "Ngân hàng An Bình (ABBank)",
    307: "Ngân hàng Á Châu (ACB)",
    204: "Ngân hàng NN & PTNT VN (Agribank, VBARD)",
    359: "Ngân hàng TMCP Bảo Việt (Baoviet Bank)",
    202: "Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)",
    661: "Ngân hàng TNHH MTV CIMB Việt Nam (CIMB)",
    304: "Ngân hàng Đông Á (Dong A Bank, DAB)",
    305: "Ngân hàng Xuất nhập khẩu Việt Nam (Eximbank, EIB)",
    320: "Ngân hàng Dầu khí Toàn cầu (GP Bank)",
    321: "Ngân hàng Phát triển TP HCM (HDBank)",
    603: "Ngân hàng Hong Leong Viet Nam (HLO)",
    502: "Indovina Bank (IVB)",
    353: "Ngân hàng Kiên Long (Kienlongbank)",
    357: "Ngan hàng TMCP Bưu điện Liên Việt (Lienvietbank, LPB)",
    302: "Ngân hàng Hàng Hải Việt Nam (Maritime Bank, MSB)",
    311: "Ngân hàng Quân Đội (MB)",
    306: "Ngân hàng Nam Á (Nam A Bank, NAB)",
    313: "Ngân hàng Bắc Á (NASBank, NASB)",
    352: "Ngân hàng Quoc Dan (NCB)",
    319: "Ngân hàng Đại Dương (Ocean Bank)",
    333: "Ngân hàng Phương Đông (Oricombank, OCB, PhuongDong Bank)",
    341: "Ngân hàng Xăng dầu Petrolimex (PG Bank)",
    360: "NH TMCP Đại Chúng Viet Nam (PVcombank)",
    303: "Ngân hàng Sài Gòn Thương Tín (Sacombank)",
    308: "Ngân hàng Sài Gòn Công Thương (Saigonbank)",
    334: "Ngân hàng TMCP Sài Gòn (SCB)",
    317: "Ngân hàng TMCP Đông Nam Á (SeABank)",
    348: "Ngân hàng Sài Gòn - Hà Nội (SHB)",
    616: "Ngân hàng TNHH MTV Shinhan Việt Nam (Shinhan Bank)",
    310: "Ngân hàng Kỹ thương Việt Nam (Techcombank, TCB)",
    618: "United Oversea Bank (UOB)",
    314: "Ngân hàng Quốc tế (VIBank, VIB)",
    501: "Ngân hàng VID Public (VID public)",
    355: "Ngân hàng Việt Á (VietA Bank, VAB)",
    356: "Ngân hàng Việt Nam Thương Tín (Vietbank)",
    327: "NHTMCP Bản Việt (VietCapital Bank)",
    203: "Ngân hàng TMCP Ngoại Thương (Vietcombank, VCB)",
    201: "Ngân hàng công thương Việt Nam (Vietinbank)",
    309: "Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng (VPBank)",
    505: "Ngân hàng Liên doanh Việt Nga (VRB)",
    624: "WOORI BANK Hà Nội (WHHN)",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};
export const LIST_BUSINESS_TYPE = [
  { value: 1, label: "Công ty TNHH" },
  { value: 2, label: "Công ty Cổ phần " },
  { value: 3, label: "Công ty có vốn đầu tư nước ngoài" },
  { value: 4, label: "Doanh nghiệp tư nhân" },
  { value: 5, label: "Tổ chức chính phủ" },
  { value: 6, label: "Cửa hàng, trung tâm" },
  { value: 7, label: "Hợp tác xã" },
  { value: 8, label: "Công ty hợp danh" },
  { value: 9, label: "Đơn vị HCSN cấp trung ương" },
  { value: 10, label: "Đơn vị HCSN cấp Quận/Huyện" },
  { value: 11, label: "Khác" },
];
export const renderBusinessType = (id) => {
  const option = {
    1: "Công ty TNHH",
    2: "Công ty Cổ phần ",
    3: "Công ty có vốn đầu tư nước ngoài",
    4: "Doanh nghiệp tư nhân",
    5: "Tổ chức chính phủ",
    6: "Cửa hàng, trung tâm",
    7: "Hợp tác xã",
    8: "Công ty hợp danh",
    9: "Đơn vị HCSN cấp trung ương",
    10: "Đơn vị HCSN cấp Quận/Huyện",
    11: "Khác",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};

export const LIST_SECTOR = [
  { value: 1, label: "Thương mại" },
  { value: 2, label: "Dịch vụ" },
  { value: 3, label: "Sản xuất" },
  { value: 4, label: "Xây lắp" },
  { value: 5, label: "Công nghệ nhẹ" },
];
export const renderSector = (id) => {
  const handleId = id?.split(",");
  const option = {
    1: "Thương mại",
    2: "Dịch vụ",
    3: "Sản xuất",
    4: "Xây lắp",
    5: "Công nghệ nhẹ",
  };
  if (handleId?.length == 0) {
    return "Không có dữ liệu";
  }
  // if (!option[id]) {
  //   return "Không có dữ liệu";
  // }
  return handleId?.map((item) => option[item]).join(", ");
};
export const LIST_PROFESSION = [
  { value: 1, label: "Kinh doanh thực phẩm", valueSector: 1 },
  { value: 2, label: "Kinh doanh hóa chất", valueSector: 1 },
  { value: 3, label: "Kinh doanh hóa mỹ phẩm", valueSector: 1 },
  { value: 4, label: "Kinh doanh ô tô, xe máy", valueSector: 1 },
  { value: 5, label: "Kinh doanh thiết bị máy tính văn phòng", valueSector: 1 },
  { value: 6, label: "Kinh doanh thiết bị y tế", valueSector: 1 },
  { value: 7, label: "Kinh doanh điện tử điện lạnh", valueSector: 1 },
  {
    value: 8,
    label: "Kinh doanh máy móc, thiết bị công nghiệp",
    valueSector: 1,
  },
  { value: 9, label: "Kinh doanh gỗ, thiết bị nội thất", valueSector: 1 },
  { value: 10, label: "Kinh doanh nhôm kính", valueSector: 1 },
  { value: 11, label: "Kinh doanh vật liệu xây dựng", valueSector: 1 },
  { value: 12, label: "Kinh doanh văn phòng phẩm, sách", valueSector: 1 },
  { value: 13, label: "Kinh doanh gas", valueSector: 1 },
  { value: 14, label: "Kinh doanh kinh doanh bất động sản", valueSector: 1 },
  { value: 15, label: "Kinh doanh xăng dầu", valueSector: 1 },
  { value: 16, label: "Kinh doanh hàng gia dụng", valueSector: 1 },
  { value: 17, label: "Kinh doanh nông lâm sản", valueSector: 1 },
  { value: 18, label: "Kinh doanh vật tư nông nghiệp", valueSector: 1 },
  { value: 19, label: "Kinh doanh vàng bạc đá quý ", valueSector: 1 },
  { value: 20, label: "Kinh doanh dược phẩm", valueSector: 1 },
  {
    value: 21,
    label:
      "Kinh doanh mặt hàng đồ uống (rượu, bia, nước giải khát, nước tinh khiết, nước đóng chai,…)",
    valueSector: 1,
  },
  { value: 22, label: "Kinh doanh sắt, thép", valueSector: 1 },
  { value: 23, label: "Kinh doanh mặt hàng giày da, may mặc ", valueSector: 1 },
  { value: 24, label: "Nhà phân phối", valueSector: 1 },
  { value: 25, label: "Kinh doanh thương mại khác", valueSector: 1 },
  { value: 26, label: "Dịch vụ du lịch ", valueSector: 2 },
  { value: 27, label: "Dịch vụ vận tải ", valueSector: 2 },
  {
    value: 28,
    label: "Dịch vụ truyền thông, quảng cáo, tổ chức sự kiện",
    valueSector: 2,
  },
  { value: 29, label: "Dịch vụ nhà hàng, khách sạn ", valueSector: 2 },
  { value: 30, label: "Dịch vụ tư vấn thiết kế xây dựng ", valueSector: 2 },
  { value: 31, label: "Dịch vụ vệ sinh môi trường đô thị ", valueSector: 2 },
  { value: 32, label: "Dịch vụ cho thuê bảo vệ, vệ sĩ ", valueSector: 2 },
  {
    value: 33,
    label: "Dịch vụ cung ứng lao động và việc làm ",
    valueSector: 2,
  },
  { value: 34, label: "Dịch vụ giáo dục và đào tạo ", valueSector: 2 },
  { value: 35, label: "Dịch vụ cung ứng phần mềm ", valueSector: 2 },
  { value: 36, label: "Dịch vụ tư vấn tài chính", valueSector: 2 },
  { value: 37, label: "Văn phòng luật sư", valueSector: 2 },
  { value: 38, label: "Dịch vụ cho thuê kho bãi ", valueSector: 2 },
  { value: 39, label: "Logistics", valueSector: 2 },
  { value: 40, label: "Đại lý vé máy bay ", valueSector: 2 },
  { value: 41, label: "Dịch vụ chăm sóc sắc đẹp ", valueSector: 2 },
  { value: 42, label: "Dịch vụ hiếu hỉ", valueSector: 2 },
  {
    value: 43,
    label: "Dịch vụ sửa chữa, bảo dưỡng và lắp đặt máy móc thiết bị",
    valueSector: 2,
  },
  { value: 44, label: "Dịch vụ y tế", valueSector: 2 },
  { value: 45, label: "Dịch vụ môi giới, đấu giá", valueSector: 2 },
  { value: 46, label: "Dịch vụ khác", valueSector: 2 },
  { value: 47, label: "Sản xuất chế biến thực phẩm", valueSector: 3 },
  { value: 48, label: "Sản xuất hóa mỹ phẩm, dược phẩm", valueSector: 3 },
  { value: 49, label: "Khai thác, chế biến than, đá", valueSector: 3 },
  {
    value: 50,
    label: "Sản xuất giày da, hàng may mặc, hàng gia dụng",
    valueSector: 3,
  },
  {
    value: 51,
    label: "Chế biến gỗ và sản xuất các sản phẩm từ gỗ, tre, nứa,…",
    valueSector: 3,
  },
  { value: 52, label: "In ấn, xuất bản ", valueSector: 3 },
  {
    value: 53,
    label:
      "Sản xuất sản phẩm từ nhựa, cao su, giấySản xuất sản phẩm từ nhựa, cao su, giấy",
    valueSector: 3,
  },
  {
    value: 54,
    label: "Sản xuất sản phẩm kim loại và sản phẩm từ kim loại đúc sẵn ",
    valueSector: 3,
  },
  { value: 55, label: "Sản xuất sản phẩm kim khí điện máy", valueSector: 3 },
  { value: 56, label: "Sản xuất chế biến thủy hải sản", valueSector: 3 },
  {
    value: 57,
    label:
      "Sản xuất đồ uống đóng chai (rượu, bia, nước giải khát, nước tinh khiết)",
    valueSector: 3,
  },
  { value: 58, label: "Sản xuất bao bì ", valueSector: 3 },
  { value: 59, label: "Khai khoáng ", valueSector: 3 },
  { value: 60, label: "Sản xuất thuốc lá", valueSector: 3 },
  { value: 61, label: "Sản xuất máy móc thiết bị", valueSector: 3 },
  { value: 62, label: "Sản xuất phim ảnh, băng đĩa nhạc", valueSector: 3 },
  { value: 63, label: "Sản xuất, gia công phần mềm", valueSector: 3 },
  { value: 64, label: "Trồng rừng", valueSector: 3 },
  { value: 65, label: "Sản xuất gạch, xi măng", valueSector: 3 },
  { value: 66, label: "Sản xuất khác", valueSector: 3 },
];
export const renderProfession = (id) => {
  const handleId = id?.split(",")?.map((item) => Number(item));

  const option = {
    1: "Kinh doanh thực phẩm",
    2: "Kinh doanh hóa chất",
    3: "Kinh doanh hóa mỹ phẩm",
    4: "Kinh doanh ô tô, xe máy",
    5: "Kinh doanh thiết bị máy tính văn phòng",
    6: "Kinh doanh thiết bị y tế",
    7: "Kinh doanh điện tử điện lạnh",
    8: "Kinh doanh máy móc, thiết bị công nghiệp",
    9: "Kinh doanh gỗ, thiết bị nội thất",
    10: "Kinh doanh nhôm kính",
    11: "Kinh doanh vật liệu xây dựng",
    12: "Kinh doanh văn phòng phẩm, sách",
    13: "Kinh doanh gas",
    14: "Kinh doanh kinh doanh bất động sản",
    15: "Kinh doanh xăng dầu",
    16: "Kinh doanh hàng gia dụng",
    17: "Kinh doanh nông lâm sản",
    18: "Kinh doanh vật tư nông nghiệp",
    19: "Kinh doanh vàng bạc đá quý ",
    20: "Kinh doanh dược phẩm",
    21: "Kinh doanh mặt hàng đồ uống (rượu, bia, nước giải khát, nước tinh khiết, nước đóng chai,…)",
    22: "Kinh doanh sắt, thép",
    23: "Kinh doanh mặt hàng giày da, may mặc ",
    24: "Nhà phân phối",
    25: "Kinh doanh thương mại khác",
    26: "Dịch vụ du lịch ",
    27: "Dịch vụ vận tải ",
    28: "Dịch vụ truyền thông, quảng cáo, tổ chức sự kiện",
    29: "Dịch vụ nhà hàng, khách sạn ",
    30: "Dịch vụ tư vấn thiết kế xây dựng ",
    31: "Dịch vụ vệ sinh môi trường đô thị ",
    32: "Dịch vụ cho thuê bảo vệ, vệ sĩ ",
    33: "Dịch vụ cung ứng lao động và việc làm ",
    34: "Dịch vụ giáo dục và đào tạo ",
    35: "Dịch vụ cung ứng phần mềm ",
    36: "Dịch vụ tư vấn tài chính",
    37: "Văn phòng luật sư",
    38: "Dịch vụ cho thuê kho bãi ",
    39: "Logistics",
    40: "Đại lý vé máy bay ",
    41: "Dịch vụ chăm sóc sắc đẹp ",
    42: "Dịch vụ hiếu hỉ",
    43: "Dịch vụ sửa chữa, bảo dưỡng và lắp đặt máy móc thiết bị",
    44: "Dịch vụ y tế",
    45: "Dịch vụ môi giới, đấu giá",
    46: "Dịch vụ khác",
    47: "Sản xuất chế biến thực phẩm",
    48: "Sản xuất hóa mỹ phẩm, dược phẩm",
    49: "Khai thác, chế biến than, đá",
    50: "Sản xuất giày da, hàng may mặc, hàng gia dụng",
    51: "Chế biến gỗ và sản xuất các sản phẩm từ gỗ, tre, nứa,…",
    52: "In ấn, xuất bản ",
    53: "Sản xuất sản phẩm từ nhựa, cao su, giấySản xuất sản phẩm từ nhựa, cao su, giấy",
    54: "Sản xuất sản phẩm kim loại và sản phẩm từ kim loại đúc sẵn ",
    55: "Sản xuất sản phẩm kim khí điện máy",
    56: "Sản xuất chế biến thủy hải sản",
    57: "Sản xuất đồ uống đóng chai (rượu, bia, nước giải khát, nước tinh khiết)",
    58: "Sản xuất bao bì ",
    59: "Khai khoáng ",
    60: "Sản xuất thuốc lá",
    61: "Sản xuất máy móc thiết bị",
    62: "Sản xuất phim ảnh, băng đĩa nhạc",
    63: "Sản xuất, gia công phần mềm",
    64: "Trồng rừng",
    65: "Sản xuất gạch, xi măng",
    66: "Sản xuất khác",
  };

  if (handleId?.length == 0) {
    return "Không có dữ liệu";
  }
  return handleId?.map((item) => option[item]).join(", ");
};
export const LIST_REVENUE = [
  { value: 0, label: "Không chọn" },
  { value: 1, label: "Dưới 1 tỷ" },
  { value: 2, label: "1 tỷ đến 10 tỷ" },
  { value: 3, label: "10 tỷ - 50 tỷ" },
  { value: 4, label: "trên 50 tỷ" },
];
export const renderRevenue = (id) => {
  const option = {
    0: "Không chọn",
    1: "Dưới 1 tỷ",
    2: "1 tỷ đến 10 tỷ",
    3: "10 tỷ - 50 tỷ",
    4: "trên 50 tỷ",
  };
  if (!option[id]) {
    return "Không có dữ liệu";
  }
  return option[id];
};
export const LIST_APPOINTMENT_STATUS = [
  { value: 2, label: "Chờ thực hiện" },
  { value: 3, label: "Chưa liên hệ được" },
  { value: 1, label: "Hoàn thành" },
  { value: 5, label: "Hoàn thành muộn" },
  { value: 4, label: "Hủy" },
];
export const LIST_APPOINTMENT_STATUS_COMPLETE = [
  { value: 3, label: "Chưa liên hệ được" },
  { value: 1, label: "Hoàn thành" },
  { value: 5, label: "Hoàn thành muộn" },
];
export const renderAppointmentStatus = (id) => {
  const option = {
    1: <span style={{ color: "#34B632" }}>Hoàn thành</span>,
    2: <span style={{ color: "#4C5BD4" }}>Chờ thực hiện</span>,
    3: <span style={{ color: "#2A38A2" }}>Chưa liên hệ được</span>,
    4: <span style={{ color: "red" }}>Hủy</span>,
    5: <span>Hoàn thành muộn</span>,
  };
  if (!option[id]) {
    return "Chưa cập nhập";
  }
  return option[id];
};
