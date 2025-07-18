import Zalo from "@/components/crm/marketing/zalo/zalo";
import Head from "next/head";
import io from "socket.io-client";

import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie';


const getUserFromToken = () => {
  const decodedToken = jwt_decode(Cookies.get('token_base365'));
  return decodedToken['data'] || null;
};



export default function Home() {
  // const [user, setUser] = useState(getUserFromToken);
  // const socket = io.connect("http://103.138.113.76:2908", {
  //   secure: false,
  //   enabledTransports: ["http"],
  //   transports: ["websocket", "polling"],
  // });
  // console.log('------------------------');
  // console.log(user);
  // console.log('------------------------');


  // useEffect(() => {
  //   console.log(user);

  //   if (user) {

  //     console.log('bắt đầu emit với id chat', user._id);
  //     // socket.emit("join", { id_chat: user._id })
  //     // socket.emit("login", { id_chat: user._id })
  //     // socket.on('qr_image', (data) => {  
  //     //   console.log('server trả về', data);
  //     // });
  //   }

  // }, []);

  useEffect(() => {
    const socket = io('https://hungha365.com/socket', {
      secure: true,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Kết nối thành công với server WebSocket thông qua proxy');
    });

    socket.on('connect_error', (err) => {
      console.error('Lỗi kết nối WebSocket:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Danh sách Zalo</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <Zalo />
    </>
  );
}
