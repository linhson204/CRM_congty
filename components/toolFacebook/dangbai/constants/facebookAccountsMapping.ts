// Mapping dữ liệu tĩnh Facebook accounts theo userID
// Mỗi userID sẽ có danh sách các Facebook accounts mà họ quản lý

export interface FacebookAccount {
  userNameFb: string;
  userLinkFb: string;
  facebookId: string;
  username: string;
  password: string;
  note?: string;
}

export const USER_FACEBOOK_MAPPING: { [key: string]: FacebookAccount[] } = {
  "22773024": [
    {
      userNameFb: "Hoàng Hiếu",
      userLinkFb: "",
      note: "Anh Huy",
      facebookId: "B22809021",
      username: "966026485",
      password: "hieu18",
    },
    {
      userNameFb: "Trịnh Hữu",
      userLinkFb: "",
      note: "Hải Yến",
      facebookId: "B22894754",
      username: "tranmanhhung172004@gmail.com",
      password: "859112122",
    },
    {
      userNameFb: "Phương Lê",
      userLinkFb: "",
      note: "C. Phượng",
      facebookId: "B22615815",
      username: "leephuongg02@gmail.com",
      password: "Hhp123456",
    },
    {
      userNameFb: "Ngọc Bảo",
      userLinkFb: "",
      note: "Phạm Linh Chi",
      facebookId: "B22891672",
      username: "359615945",
      password: "timviec365",
    },
    {
      userNameFb: "Phương Nhi",
      userLinkFb: "",
      note: "Tăng Triệu Long",
      facebookId: "B22865616",
      username: "983407428",
      password: "hhp123988@",
    },
    {
      userNameFb: "Nhi Nguyễn",
      userLinkFb: "",
      note: "Nguyễn Phương Linh",
      facebookId: "B22866068",
      username: "pampanna23062@gmail.com",
      password: "pampam2368",
    },
    {
      userNameFb: "Mai Mei",
      userLinkFb: "",
      note: "Vũ Đức Mạnh",
      facebookId: "B22868965",
      username: "linh61.tv365@gmail.com",
      password: "abc13579",
    },
    {
      userNameFb: "Trần Việt Hưng",
      userLinkFb: "",
      note: "Nguyễn Thị Thu Trà",
      facebookId: "B22846622",
      username: "hr.ctcpxdanphat@gmail.com",
      password: "hhp123@..",
    },
    {
      userNameFb: "Châu Dương Tử",
      userLinkFb: "",
      note: "Nguyễn Thị Ngọc Ánh",
      facebookId: "B22846624",
      username: "tu.dxt512@gmail.com",
      password: "Thanhtu2004",
    },
    {
      userNameFb: "Cường Nguyễn",
      userLinkFb: "",
      note: "Lưu Anh Đức",
      facebookId: "B22775957",
      username: "hieuzxcv23@gmail.com",
      password: "654321aA@",
    },
    {
      userNameFb: "Nguyễn Dương",
      userLinkFb: "",
      note: "Nguyễn Minh Hiếu",
      facebookId: "B22846658",
      username: "334304530",
      password: "Hhp123456",
    },
    {
      userNameFb: "Bùi Ngọc",
      userLinkFb: "",
      note: "Nguyễn Linh Sơn",
      facebookId: "B22858640",
      username: "944242725",
      password: "123456dung",
    },
    {
      userNameFb: "Nguyễn Lai",
      userLinkFb: "",
      note: "Đoàn Anh Vũ",
      facebookId: "B22865594",
      username: "978382842",
      password: "hhp123456",
    },
    {
      userNameFb: "Long Hoang",
      userLinkFb: "",
      facebookId: "B22865602",
      note: "Đỗ Xuân Thanh Tú",
      username: "978585641",
      password: "hlonghhp1234",
    },
    {
      userNameFb: "Tiến Thành",
      userLinkFb: "",
      note: "Lại Thị Nhàn",
      facebookId: "B22789191",
      username: "972381905",
      password: "Hhp123456",
    },
  ],
  "22614471": [
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "",
      note: "Anh Cả",
      facebookId: "B22616984",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Anh Kim",
      userLinkFb: "",
      facebookId: "B22623688",
      note: "Chị Nhạn",
      username: "964532571",
      password: "timviec365@/",
    },
    {
      userNameFb: "Thanh Nguyễn",
      userLinkFb: "",
      note: "Hoàng Linh",
      facebookId: "B22616467",
      username: "902859182",
      password: "TatcataiT1",
    },
    {
      userNameFb: "Trang Minh",
      userLinkFb: "",
      note: "A Hán",
      facebookId: "B22773024",
      username: "nguonlucviet365@gmail.com",
      password: "hh1234568$",
    },
    {
      userNameFb: "Thu Hoài",
      userLinkFb: "",
      note: "Nguyễn Thu Trang",
      facebookId: "B22613816",
      username: "tranthuytimviec365.06@gmail.com",
      password: "thu1810",
    },
    {
      userNameFb: "Ngọc Nguyễn",
      userLinkFb: "",
      note: "Phạm Đức Huy",
      facebookId: "B22858638",
      username: "anhngoc042003@gmail.com",
      password: "mai1234",
    },
    {
      userNameFb: "Tú Uyên",
      userLinkFb: "",
      note: "Nguyễn Huyền Ngọc",
      facebookId: "B22791406",
      username: "356468640",
      password: "timviec365.vn",
    },
    {
      userNameFb: "Vân Vũ",
      userLinkFb: "",
      note: "Nguyễn Thị Bình",
      facebookId: "B22615336",
      username: "meoso2310@gmail.com",
      password: "123456aA@",
    },
  ],
  "22615815": [
    {
      userNameFb: "Gia Giang",
      userLinkFb: "",
      note: "Chị Liên",
      facebookId: "B22614471",
      username: "901763358",
      password: "tuyendung123",
    },
    {
      userNameFb: "Phương Nam",
      userLinkFb: "",
      note: "Lê Văn Quang Trung",
      facebookId: "B22865595",
      username: "382785319",
      password: "hhp123988",
    },
    {
      userNameFb: "Anh Linh",
      userLinkFb: "",
      facebookId: "B22889226",
      note: "Ngọc Hà",
      username: "702097535",
      password: "hang123583@#",
    },
    {
      userNameFb: "Quỳnh Quỳnh",
      userLinkFb: "",
      note: "Ngô Dung",
      facebookId: "B22615833",
      username: "394497296",
      password: "timviec365",
    },
    {
      userNameFb: "Bàng Tiến Thành",
      userLinkFb: "",
      note: "Lưu Thị Thư",
      facebookId: "B22833463",
      username: "bttshirayukihime@gmail.com",
      password: "HusterShira3012",
    },
    {
      userNameFb: "Mộc Hạ",
      userLinkFb: "",
      note: "Bích Ngọc",
      facebookId: "B22814414",
      username: "vuly50833@gmail.com",
      password: "Eoldtadckcttg1234",
    },
    {
      userNameFb: "Minh Anh",
      userLinkFb: "",
      note: "Lê Thùy Dung",
      facebookId: "B22613811",
      username: "969824645",
      password: "timviec365@/",
    },
    {
      userNameFb: "Vũ Thị Trinh",
      userLinkFb: "",
      note: "Nguyễn Thị Linh Chi",
      facebookId: "B22617734",
      username: "888908140",
      password: "Vuvantruong11072003",
    },
    {
      userNameFb: "Hà Hưng",
      userLinkFb: "",
      note: "Bàng Tiến Thành",
      facebookId: "B22856008",
      username: "399008219",
      password: "hhp1176411",
    },
    {
      userNameFb: "Trần Nguyên",
      userLinkFb: "",
      note: "Hoàng Thị Ngọc Mai",
      facebookId: "B22889521",
      username: "342765068",
      password: "Tran130613@",
    },
    {
      userNameFb: "Nguyễn Văn An",
      userLinkFb: "",
      note: "Trần Mạnh Duy",
      facebookId: "B22615347",
      username: "leg37259@gmail.com",
      password: "Cyclic20042004",
    },
    {
      userNameFb: "Hàn Thiên My",
      userLinkFb: "",
      note: "Nguyễn Mạnh Hùng",
      facebookId: "B22839858",
      username: "linhnguyenphg04@gmail.com",
      password: "buncute123",
    },
    {
      userNameFb: "Linh Nhi",
      userLinkFb: "",
      note: "Đinh Đức Hiếu",
      facebookId: "B22862103",
      username: "383757614",
      password: "hhp1234568@",
    },
    {
      userNameFb: "Phương Bình",
      userLinkFb: "",
      note: "Nguyễn Hoàng Long",
      facebookId: "B22865598",
      username: "971335869",
      password: "timviec365@",
    },
    {
      userNameFb: "Trang Trịnh",
      userLinkFb: "",
      note: "Lê Thị Thùy",
      facebookId: "B22636101",
      username: "852039719",
      password: "hhp123456@",
    },
  ],
  "22858640": [
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "https://www.facebook.com/gian.vu.792551",
      facebookId: "B22623688",
      note: "Anh Cả",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Tiến Thành",
      userLinkFb: "",
      facebookId: "B22789191",
      note: "Lại Thị Nhàn",
      username: "972381905",
      password: "Hhp123456",
    },
  ],
};

// Helper function để lấy Facebook accounts theo userID
export const getFacebookAccountsByUserID = (
  userID: string
): FacebookAccount[] => {
  console.log(` Getting Facebook accounts for userID: ${userID}`);

  const userAccounts =
    USER_FACEBOOK_MAPPING[userID] || USER_FACEBOOK_MAPPING["default"];

  console.log(
    ` Found ${userAccounts.length} accounts:`,
    userAccounts.map((acc) => acc.userNameFb)
  );

  return userAccounts;
};
