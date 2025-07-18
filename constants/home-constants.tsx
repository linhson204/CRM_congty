export const LIST_ACTIONS = [
  {
    key: '0',
    title: 'Chấm công',
    steps: [
      {
        title: 'Cài đặt bảo mật: Wifi, vị trí, giới hạn IP chấm công',
        url: 'cham-cong/cai-dat-bao-mat',
        required: true,
      },
      {
        title: 'Cài đặt lịch làm việc của tháng',
        url: 'cham-cong/cai-dat-lich-lam-viec',
        required: true,
      },
      {
        title: 'Cài đặt quản lý ca làm việc',
        url: 'quan-ly-cong-ty/quan-ly-ca',
        required: true,
      },
      {
        title: 'Cài đặt công chuẩn của tháng',
        url: 'cham-cong/cai-dat-cong-chuan',
        required: true,
      },
      {
        title: 'Cho phép cập nhật lại khuôn mặt',
        url: 'cham-cong/nhap-lai-khuon-mat',
        required: false,
      },
      {
        title: 'Duyệt theo thiết bị mới khi chấm công',
        url: 'cham-cong/duyet-thiet-bi',
        required: false,
      },
      {
        title: 'Xuất công',
        url: 'cham-cong/xuat-cong',
        required: false,
      },
      {
        title: 'Chấm công',
        url: 'cham-cong/cham-cong-cong-ty',
        required: false,
      },
    ],
  },
  {
    key: '1',
    title: 'Quản lý công ty',
    steps: [
      {
        title: 'Cài đặt quản lý công ty con',
        url: 'quan-ly-cong-ty/quan-ly-cong-ty-con',
        required: true,
      },
      {
        title: 'Cài đặt quản lý phòng ban',
        url: 'quan-ly-cong-ty/quan-ly-phong-ban',
        required: true,
      },
      {
        title: 'Cài đặt thêm nhân viên mới',
        url: 'quan-ly-cong-ty/cai-dat-them-nhan-vien-moi',
        required: true,
      },
      {
        title: 'Danh sách ứng viên',
        url: 'quan-ly-cong-ty/danh-sach-ung-vien',
        required: false,
      },
      {
        title: 'Nâng cao',
        url: '',
        required: false,
      },
    ],
  },
  {
    key: '2',
    title: 'Đề xuất',
    steps: [
      {
        title: 'Cài đặt loại hình duyệt phép',
        url: 'de-xuat/cai-dat-loai-hinh-duyet-phep',
        required: true,
      },
      {
        title: 'Cài đặt thời gian duyệt đề xuất',
        url: 'de-xuat/cai-dat-thoi-gian-duyet-de-xuat',
        required: true,
      },
      {
        title: 'Tạm ứng tiền',
        url: 'de-xuat/tam-ung-tien',
        required: false,
      },
      {
        title: 'Sơ đồ tổ chức',
        url: 'de-xuat/so-do-to-chuc',
        required: false,
      },
      {
        title: 'Nâng cao',
        url: '',
        required: false,
      },
    ],
  },
  {
    key: '3',
    title: 'Cài đặt lương',
    steps: [
      {
        title: 'Cài đặt nhập lương cơ bản',
        url: 'cai-dat-luong/nhap-luong-co-ban',
        required: true,
      },
      {
        title: 'Cài đặt thiết lập đi muộn - về sớm',
        url: 'cai-dat-luong/di-muon-ve-som',
        required: true,
      },
      {
        title: 'Cài đặt bảo hiểm',
        url: 'cai-dat-luong/cai-dat-bao-hiem',
        required: true,
      },
      {
        title: 'Cài đặt phúc lợi',
        url: 'cai-dat-luong/cai-dat-phuc-loi',
        required: true,
      },
      {
        title: 'Cài đặt phụ cấp khác',
        url: 'cai-dat-luong/cai-dat-phu-cap-khac',
        required: true,
      },
      {
        title: 'Cài đặt thuế',
        url: 'cai-dat-luong/cai-dat-thue',
        required: true,
      },
      {
        title: 'Cộng công',
        url: 'cai-dat-luong/cong-cong',
        required: false,
      },
      {
        title: 'Thưởng/phạt',
        url: 'cai-dat-luong/thuong-phat',
        required: false,
      },
      {
        title: 'Xuất lương',
        url: 'cai-dat-luong/nhap-luong-co-ban',
        required: false,
      },
      {
        title: 'Nâng cao',
        url: '',
        required: false,
      },
    ],
  },
]

export const LIST_ACTIONS_EMP = [
  {
    key: '0',
    title: 'Chấm công bằng QR',
    steps: [
      {
        title: 'Chamcong365',
        icon: '/ql_chamcong.png',
        url: 'cham-cong-bang-QR/cham-cong-365',
      },
      {
        title: 'Chat365',
        icon: '/ql_chat.png',
        url: 'cham-cong-bang-QR/chat-365',
      },
      {
        title: 'PC365 NHAN VIEN',
        icon: '/ql_pcnv.png',
        url: 'cham-cong-bang-QR/pc-365',
      },
    ],
  },
  {
    key: '1',
    title: 'Chấm công bằng nhận diện khuôn mặt',
    steps: [
      {
        title: 'Chamcong365',
        icon: '/ql_chamcong.png',
        url: 'cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365',
      },
      {
        title: 'Chat365',
        icon: '/ql_chat.png',
        url: 'cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365',
      },
      {
        title: 'PC365 NHAN VIEN',
        icon: '/ql_pcnv.png',
        url: 'cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien',
      },
    ],
  },
  {
    key: '2',
    title: 'Chấm công bằng tài khoản công ty',
    steps: [
      {
        title: 'Chấm công bằng tài khoản công ty',
        icon: '',
        url: '/cham-cong-nhan-vien/cc-bang-tai-khoan-cong-ty',
      },
    ],
  },

  {
    key: '3',
    title: 'Tạo đề xuất',
    steps: [
      {
        title: 'Loại đề xuất',
        icon: '',
        url: 'tao-de-xuat/loai-de-xuat',
      },
    ],
  },
  {
    key: '4',
    title: 'Cập nhật dữ liệu khuôn mặt (chấm công)',
    steps: [
      {
        title: 'Cập nhật dữ liệu khuôn mặt',
        icon: '',
        url: 'cap-nhat-du-lieu-khuon-mat',
      },
    ],
  },
  {
    key: '5',
    title: 'Lịch sử',
    steps: [
      {
        title: 'Chấm công',
        icon: '',
        url: 'lich-su/cham-cong',
      },
      {
        title: 'Lương hiện tại',
        icon: '',
        url: 'lich-su/luong-hien-tai',
      },
    ],
  },
  {
    key: '5',
    title: 'Cập nhật khuôn mặt',
    steps: [
      {
        title: 'Cập nhật dữ liệu khuôn mặt',
        icon: '',
        url: 'cap-nhat-du-lieu-khuon-mat',
      },
    ],
  },
]

export const ID_HUNGHA = 22495550