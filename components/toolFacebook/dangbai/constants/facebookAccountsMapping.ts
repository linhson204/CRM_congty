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
  "22858640": [
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "https://www.facebook.com/gian.vu.792551",
      facebookId: "B22623688",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
  ],
  "22614471": [
    {
      userNameFb: "Hoàng Hiếu",
      userLinkFb: "https://facebook.com/admin.recruitment",
      facebookId: "B22614471",
      username: "0966026485",
      password: "hieu18",
    },
    {
      userNameFb: "Gia Giang",
      userLinkFb: "https://facebook.com/hr.manager",
      facebookId: "B22614472",
      username: "901763358",
      password: "tuyendung123",
    },
    {
      userNameFb: "Phương Nam",
      userLinkFb: "https://facebook.com/hr.manager",
      facebookId: "B22614472",
      username: "0382785319",
      password: "hhp123988",
    },
  ],
  "22865595": [
    {
      userNameFb: "Phương Nam",
      userLinkFb: "https://facebook.com/hr.manager",
      facebookId: "B22865595",
      username: "0382785319",
      password: "hhp123988",
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
