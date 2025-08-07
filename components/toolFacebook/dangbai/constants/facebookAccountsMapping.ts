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
      facebookId: "B22858640",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Giản Vũ - Page 2",
      userLinkFb: "https://www.facebook.com/gian.vu.page2",
      facebookId: "B22858641",
      username: "gianvu.page2@gmail.com",
      password: "lvqh1234",
    },
  ],
  "22614471": [
    {
      userNameFb: "Admin Recruitment",
      userLinkFb: "https://facebook.com/admin.recruitment",
      facebookId: "B22614471",
      username: "admin.recruitment@email.com",
      password: "password123",
    },
    {
      userNameFb: "HR Manager",
      userLinkFb: "https://facebook.com/hr.manager",
      facebookId: "B22614472",
      username: "hr.manager@email.com",
      password: "password456",
    },
  ],
  // Thêm mapping cho các userID khác ở đây
  // Ví dụ:
  // "12345678": [
  //   {
  //     userNameFb: "Tên Facebook Account",
  //     userLinkFb: "https://www.facebook.com/link",
  //     facebookId: "B12345678",
  //     username: "email@example.com",
  //     password: "password123",
  //   }
  // ],

  // Default account cho những user chưa có mapping
  default: [
    {
      userNameFb: "Default Account",
      userLinkFb: "https://facebook.com/default",
      facebookId: "B00000000",
      username: "default@email.com",
      password: "default123",
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
