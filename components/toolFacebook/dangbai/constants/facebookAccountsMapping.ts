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
      facebookId: "B22809021",
      username: "966026485",
      password: "hieu18",
    },
    {
      userNameFb: "Trịnh Hữu",
      userLinkFb: "",
      facebookId: "B22894754",
      username: "tranmanhhung172004@gmail.com",
      password: "859112122",
    },
    {
      userNameFb: "Phương Lê",
      userLinkFb: "",
      facebookId: "B22615815",
      username: "leephuongg02@gmail.com",
      password: "Hhp123456",
    },
    {
      userNameFb: "Ngọc Bảo",
      userLinkFb: "",
      facebookId: "B22891672",
      username: "359615945",
      password: "timviec365",
    },
    {
      userNameFb: "Phương Nhi",
      userLinkFb: "",
      facebookId: "B22865616",
      username: "983407428",
      password: "hhp123988@",
    },
    {
      userNameFb: "Nhi Nguyễn",
      userLinkFb: "",
      facebookId: "B22866068",
      username: "pampanna23062@gmail.com",
      password: "pampam2368",
    },
    {
      userNameFb: "Mai Mei",
      userLinkFb: "",
      facebookId: "B22868965",
      username: "linh61.tv365@gmail.com",
      password: "abc13579",
    },
    {
      userNameFb: "Trần Việt Hưng",
      userLinkFb: "",
      facebookId: "B22846622",
      username: "hr.ctcpxdanphat@gmail.com",
      password: "hhp123@..",
    },
    {
      userNameFb: "Châu Dương Tử",
      userLinkFb: "",
      facebookId: "B22846624",
      username: "tu.dxt512@gmail.com",
      password: "Thanhtu2004",
    },
    {
      userNameFb: "Cường Nguyễn",
      userLinkFb: "",
      facebookId: "B22775957",
      username: "hieuzxcv23@gmail.com",
      password: "654321aA@",
    },
    {
      userNameFb: "Nguyễn Dương",
      userLinkFb: "",
      facebookId: "B22846658",
      username: "334304530",
      password: "Hhp123456",
    },
    {
      userNameFb: "Bùi Ngọc",
      userLinkFb: "",
      facebookId: "B22858640",
      username: "944242725",
      password: "123456dung",
    },
    {
      userNameFb: "Nguyễn Lai",
      userLinkFb: "",
      facebookId: "B22865594",
      username: "978382842",
      password: "hhp123456",
    },
    {
      userNameFb: "Long Hoang",
      userLinkFb: "",
      facebookId: "B22865602",
      username: "978585641",
      password: "hlonghhp1234",
    },
    {
      userNameFb: "Tiến Thành",
      userLinkFb: "",
      facebookId: "B22789191",
      username: "972381905",
      password: "Hhp123456",
    },
  ],
  "22614471": [
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "",
      facebookId: "B22616984",
      note: "Anh Cả",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Gia Giang",
      userLinkFb: "",
      facebookId: "B22614471",
      username: "901763358",
      password: "tuyendung123",
      note: "Chị Liên",
    },
    {
      userNameFb: "Kim Anh",
      userLinkFb: "",
      note: "Chị Nhạn",
      facebookId: "B22623688",
      username: "964532571",
      password: "timviec365@/",
    },
    {
      userNameFb: "Thanh Nguyễn",
      userLinkFb: "",
      note: "Hoàng Linh",
      facebookId: "B22616467",
      username: "0902859182",
      password: "TatcalataiT1",
    },
    {
      userNameFb: "Anh Linh",
      userLinkFb: "",
      note: "Ngọc Hà",
      facebookId: "B22889226",
      username: "0702097535",
      password: "hang123583@#",
    },
    {
      userNameFb: "Quỳnh Quỳnh",
      userLinkFb: "",
      note: "Ngô Dung",
      facebookId: "B22615833",
      username: "0394497296",
      password: "timviec365",
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
      note: "Hải Yến",
      facebookId: "B22894754",
      username: "tranmanhhung172004@gmail.com",
      password: "0859112122",
    },
    {
      userNameFb: "Ngọc Nguyễn",
      userLinkFb: "",
      note: "Chị Phượng",
      facebookId: "B22615815",
      username: "leephuongg02@gmail.com",
      password: "Hhp123456",
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
      userNameFb: "Hoàng Hiếu",
      userLinkFb: "",
      facebookId: "B22735395",
      note: "Anh Huy",
      username: "0966026485",
      password: "hieu18",
    },
    {
      userNameFb: "Phương Nam",
      userLinkFb: "",
      facebookId: "B22636101",
      note: "Lê Văn Quang Trung",
      username: "0382785319",
      password: "hhp123988",
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
