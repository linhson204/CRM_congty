import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Seo(props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex,nofollow"></meta>

        <title>{props.title}</title>
        {props.seo === "true" && (
          <>
            <meta name="description" content={props.des} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.des} />
            <meta property="og:title" content={props.title} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:description" content={props.des} />
            <meta property="og:url" content={props.url} />
            <meta
              property="og:image"
              content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
            />
            <link rel="canonical" href={props.url} />
          </>
        )}
        <link
          rel="preload"
          href="../fonts/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="../fonts/Roboto-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="../fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="/css/dat.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href={
            router.pathname?.includes("phan-mem-nhan-su/")
              ? ""
              : "/css/style.css"
          }
        />
        <link rel="stylesheet" type="text/css" href="/css/login_qr.css" />
        {router.pathname?.includes('van-thu-luu-tru') && (
          <>
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Phần mềm văn thư lưu trữ 365",
                  "description": "Văn thư lưu trữ 365 - Phần mềm văn thư lưu trữ miễn phí, tốt nhất hiện nay...",
                  "url": "https://vanthu.timviec365.vn/",
                  "additionalType": ["https://vi.wikipedia.org/wiki/Nh%C3%A2n_vi%C3%AAn_v%C4%83n_th%C6%B0"]
                }
              `}
            </script>
            <meta name="google-site-verification" content="tkR0DL2EWeg8OJfQypncyEWVoR3Mvl-Vbk4yl-8q1sQ" />
            <script async>
              {`
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NXVQCHN');
              `}
            </script>
          </>
        )}
      </Head>
    </>
  );
}
