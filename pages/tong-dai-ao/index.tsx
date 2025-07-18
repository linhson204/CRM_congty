import React from "react";
import HeaderHomePage from "@/components/bang-gia-tong-dai/header_bgtd";
import Footer from "@/components/crm/login/Footer";

import Head from "next/head";
import BangGiaTongDai from "@/components/bang-gia-tong-dai";
import TableBangGiaTongDai from "@/components/bang-gia-tong-dai/table";
import CardTongDai from "@/components/bang-gia-tong-dai/card";
import Question from "@/components/bang-gia-tong-dai/question";
export default function BangGiaTD() {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width"
                    initial-scale="1"
                />
                <meta name="robots" content="noindex,nofollow" />
                <link
                    rel="canonical"
                    href="https://hungha365.com/crm/bang-gia-tong-dai"
                />
                <link
                    rel="icon"
                    href="https://hungha365.com/favicon/HH365.ico"
                    sizes="any"
                />
                <meta
                    name="google-site-verification"
                    content="q4vBfRDO92RvPdYuA-xEEalSufKbzQiQQYpUBGTOqC4"
                />
                <title>
                    Bảng Giá Tổng Đài Đa Kênh Thông Minh - Ưu Đãi Hấp Dẫn
                </title>
                <meta
                    name="description"
                    content="Bảng giá tổng đài đa kênh thông minh: Giải pháp ưu việt cho việc quản lý doanh nghiệp. Tối ưu hóa giao tiếp, tăng hiệu suất làm việc và nâng cao trải nghiệm khách hàng. Tìm hiểu ngay sau đây."
                />
                <meta
                    property="og:url"
                    content="https://hungha365.com/crm/bang-gia-tong-dai"
                />

                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Bảng Giá Tổng Đài Đa Kênh Thông Minh - Ưu Đãi Hấp Dẫn"
                />
                <meta
                    property="og:description"
                    content="Bảng giá tổng đài đa kênh thông minh: Giải pháp ưu việt cho việc quản lý doanh nghiệp. Tối ưu hóa giao tiếp, tăng hiệu suất làm việc và nâng cao trải nghiệm khách hàng. Tìm hiểu ngay sau đây."
                />
                <meta
                    property="og:image"
                    content="https://hungha365.com/img/HH365.svg"
                />

                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content="Bảng giá tổng đài đa kênh thông minh: Giải pháp ưu việt cho việc quản lý doanh nghiệp. Tối ưu hóa giao tiếp, tăng hiệu suất làm việc và nâng cao trải nghiệm khách hàng. Tìm hiểu ngay sau đây."
                />
                <meta
                    name="twitter:title"
                    content="Bảng Giá Tổng Đài Đa Kênh Thông Minh - Ưu Đãi Hấp Dẫn"
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL3KDJW5');
`,
                    }}
                ></script>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-6LT1XMTDC3"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6LT1XMTDC3');
`,
                    }}
                ></script>

                {/* CSS */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
                ></script>
            </Head>
            <HeaderHomePage />
            <div
                style={{
                    paddingTop: "60px",
                }}
            >
                <BangGiaTongDai />
                <TableBangGiaTongDai />
                <CardTongDai />
                <Question />
                <Footer />
            </div>
        </>
    );
}
