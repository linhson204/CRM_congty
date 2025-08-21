// Mapping dữ liệu tĩnh Facebook accounts theo userID
// Mỗi userID sẽ có danh sách các Facebook accounts mà họ quản lý

export interface FacebookAccount {
  userNameFb: string;
  userLinkFb: string;
  facebookId: string;
  username: string;
  password: string;
}

export const USER_FACEBOOK_MAPPING: { [key: string]: FacebookAccount[] } = {
  "22773024": [
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "https://www.facebook.com/gian.vu.792551",
      facebookId: "B22616984",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Gia Giang",
      userLinkFb: "",
      facebookId: "B22614471",
      username: "901763358",
      password: "tuyendung123",
    },
    {
      userNameFb: "Kim Anh",
      userLinkFb: "",
      facebookId: "B22623688",
      username: "0964532571",
      password: "timviec365@/",
    },
    {
      userNameFb: "Thanh Nguyễn",
      userLinkFb: "",
      facebookId: "B22616467",
      username: "0902859182",
      password: "TatcalataiT1",
    },
    {
      userNameFb: "Anh Linh",
      userLinkFb: "",
      facebookId: "B22889226",
      username: "0702097535",
      password: "hang123583@#",
    },
    {
      userNameFb: "Quỳnh Quỳnh",
      userLinkFb: "",
      facebookId: "B22615833",
      username: "0394497296",
      password: "timviec365",
    },
    {
      userNameFb: "Trang Minh",
      userLinkFb: "",
      facebookId: "B22773024",
      username: "nguonlucviet365@gmail.com",
      password: "hh1234568$",
    },
    {
      userNameFb: "Trịnh Hữu",
      userLinkFb: "",
      facebookId: "B22894754",
      username: "tranmanhhung172004@gmail.com",
      password: "0859112122",
    },
    {
      userNameFb: "Phương Lê",
      userLinkFb: "",
      facebookId: "B22615815",
      username: "leephuongg02@gmail.com",
      password: "Hhp123456",
    },
    {
      userNameFb: "Bàng Tiến Thành",
      userLinkFb: "",
      facebookId: "B22833463",
      username: "bttshirayukihime@gmail.com",
      password: "HusterShira3012",
    },
    {
      userNameFb: "Mộc Hạ",
      userLinkFb: "",
      facebookId: "B22814414",
      username: "vuly50833@gmail.com",
      password: "Eoldtadckcttg1234",
    },
  ],
  "22614471": [
    {
      userNameFb: "Hoàng Hiếu",
      userLinkFb: "https://facebook.com/admin.recruitment",
      facebookId: "B22735395",
      username: "0966026485",
      password: "hieu18",
    },
    {
      userNameFb: "Phương Nam",
      userLinkFb: "https://facebook.com/hr.manager",
      facebookId: "B22636101",
      username: "0382785319",
      password: "hhp123988",
    },
  ],
  "22858640": [
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "https://www.facebook.com/gian.vu.792551",
      facebookId: "B22623688",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Tiến Thành",
      userLinkFb: "",
      facebookId: "B22789191",
      username: "",
      password: "",
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
