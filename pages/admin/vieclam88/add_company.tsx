
import Head from "next/head";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useContext, useEffect, useRef } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import { parse } from 'cookie'
import axios from 'axios'
import { useHeader } from "@/components/crm/hooks/useHeader";
function Home({link}) {
  
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle }: any =useHeader();
    useEffect(() => {
      setHeaderTitle("Thêm mới NTD - Vieclam88");
    }, [setHeaderTitle, , ]);

    useEffect(() => {
        if (isOpen) {
          mainRef.current?.classList.add("content_resize");
        } else {
          mainRef.current?.classList.remove("content_resize");
        }
      }, [isOpen]);

 if(link) return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thêm mới NTD - Vieclam88</title>
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

      
        <div ref={mainRef} className={styleHome.main}>
        <iframe style={{
        width:"100%",
        height: "100vh"
      }} src={link}></iframe>
        </div>
    </>
  );
  else return null
}


export async function getServerSideProps(context: any) {
    let link = "null"
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies.token_base365


    try {
        const response = await axios.post(`https://api.timviec365.vn/api/crm/vetinh/infoUserAdmin`, {
          site : 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if(response?.data?.idQLC)   link = `https://vieclam88.vn/admin/modules/company_kd/add.php?emp_id=${response?.data?.idQLC}&password=${response?.data?.password}` 
    } catch (error: any) {

    }
    return {
        props: {
            link
        },
    }
}


export default Home
