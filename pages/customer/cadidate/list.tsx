import React, { useRef, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/customer/candidate_list/list.module.css"
import { SelectSingleV3Prop } from "@/components/crm/input_select/select";
import { Table ,Button} from "antd";
import { ColumnsType } from "antd/es/table";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { useFormData } from "@/components/crm/context/formDataContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { convertTimestampToDateHMDMY, decodeToken } from "@/utils/function";
import axios from 'axios'
import * as XLSX from 'xlsx'

type TypePointTable = {
  cus_id: number;
  created_at: number;
  updated_at: number;
  id_cus_from: string;
  name: string;
  email: string;
  resouce: string;
  link: string;
  beseen: number;
  phone_number: string;
};

function removeVietnameseTones(str:any) {
  if (str && str.trim() && str.trim() != "") {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|{|}|\||\\/g, " ");
    return str;
  } else {
    return "";
  }
}
// value:obj.cit_id,
// label:obj.cit_name,
// 3: web vệ tin, 8: ứng viên đăng ký ; 1:Nhập thủ công
// 2: từ app cũ ; 5: app cv cũ ; 6: app mới ;  7: app cv mới 
// kiêng số 0 
const resource_arr = [
  {
    value:8,
    label:"Ứng viên đăng ký"
  },
  {
    value:1,
    label:"Nhập thủ công"
  },
  {
    value:2,
    label:"App cũ"
  },
  {
    value:3,
    label:"Web vệ tinh"
  },
  {
    value:5,
    label:"App cv cũ"
  },
  {
    value:6,
    label:"App mới"
  },
  {
    value:7,
    label:"App CV mới"
  },
];

const gioitinh_arr = [
  {
    value:1,
    label:"nam"
  },
  {
    value:2,
    label:"nữ"
  }
]
export default function CadidateList() {
  const  accessToken = Cookies.get("token_base365");
  const mainRef = useRef<HTMLDivElement>(null);
  const { com_id, idQLC } = decodeToken();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle(`Danh sách ứng viên`);
    setShowBackButton(false);
    setCurrentPath("/customer/point/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  let objectStartUp = {
    page:1,
    id_cus_from:"",
    cus_id:"",
    phone_number:"",
    email:"",
    start:"",
    end:""
  }
  const [searchObject,setSearchObject] = useState(objectStartUp);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const { formData, handleRecall } = useContext(useFormData);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const [dataCity,setDataCity] = useState([]); // dữ liệu thành phố 
  const [dataCityToChoose,setDataCityToChoose] = useState([]);
  const [dataCategory,setDataCategory] = useState([]); // dữ liệu ngành nghề
  const [dataCategoryToChoose,setDataCategoryToChoose] = useState([]);

  const [dataDistrict,setDistrict] = useState([]); // dữ liệu quận huyện
  const [dataDistrictToChoose,setDistrictToChoose] = useState([]);

  useEffect(() => {
    const fetchAPi = async () => {
        const response = await axiosCRMv2("/customer/DanhSachUngVien", {
          ...searchObject,
          page,
        });
        if (response.listEm) {
          setList(response.listEm);
        };

        const response2 = await axiosCRMv2("/customer/DanhSachUngVienCount", {
          ...searchObject,
          page,
        });
        if (response2.countEm) {
          setTotal(response2.countEm);
        };
    };
    fetchAPi();
  }, [page, formData.recall]);
  function getRndInteger(min:any, max:any) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  useEffect(() => {
        axios({
            method: "post",
            url: "https://api.timviec365.vn/api/getData/city",
            data: {},
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
            setDataCity(response.data.data.data);
            setDataCityToChoose(response.data.data.data);
        })
        .catch(err => { console.log(err) });

        axios({
            method: "post",
            url: "https://api.timviec365.vn/api/getData/timviec/category",
            data: {},
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
            setDataCategory(response.data.data.data);
            setDataCategoryToChoose(response.data.data.data)
        })
        .catch(err => { console.log(err) })
        axios({
            method: "post",
            url: "https://api.timviec365.vn/api/getData/district",
            data: {},
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
            setDistrict(response.data.data.data);
            setDistrictToChoose(response.data.data.data);
        })
        .catch(err => { console.log(err) });
  }, []);

  const columns: ColumnsType<TypePointTable> = [
    {
      title: "ID CRM",
      key: "cus_id",
      dataIndex: "cus_id",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    {
      title: "ID trên site",
      key: "id_cus_from",
      dataIndex: "id_cus_from",
      render(value, record, index) {
        let link = `https://timviec365.vn/uvtv/ung-vien-uv${value}`
        return <a className={styles.text} href={link}>{value}</a>;
      },
    },

    {
      title: "Ảnh",
      key: "image_link",
      dataIndex: "image_link",
      render(value, record, index) {
        let link = "https://timviec365.vn/images/user_no.png";
        if(value){link = value};
        return (
        <img 
          className={styles.img}
          src={link}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="https://timviec365.vn/images/user_no.png";
          }}
        />
        );
      },
    },
    {
      title: "Tên ứng viên",
      key: "name",
      dataIndex: "name",
      render(value, record, index) {
        return (
          <p className={styles.text}>
            {record.name}
          </p>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      dataIndex: "phone_number",
      render(value, record, index) {
        if (record.beseen) {
          return <p>{value}</p>;
        } else {
          return (
            <button
              style={{ color: "red" }}
              onClick={() => usePoint(record.cus_id)}
              className={styles.text}
            >
              Mở
            </button>
          );
        }
      },
    },
    // {
    //   title: "Link",
    //   key: "link",
    //   dataIndex: "link",
    //   render(value, record, index) {
    //     return (
    //       <a href={record.link} className={styles.text}>
    //         Link
    //       </a>
    //     );
    //   },
    // },
    {
      title: "Tỉnh thành",
      key: "city",
      dataIndex: "city",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    {
      title: "Ngành nghề",
      key: "category_des",
      dataIndex: "category_des",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    {
      title: "Tiêu đề",
      key: "cv_title",
      dataIndex: "cv_title",
      render(value, record, index) {
        
        return <p className={styles.text}>{value}</p>;
      },
    },
    // gender_text
    {
      title: "Giới tính",
      key: "gender_text",
      dataIndex: "gender_text",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    // {
    //   title: "Ngày sinh",
    //   key: "birthday",
    //   dataIndex: "birthday",
    //   render(value, record, index) {
    //     let time:any ;
    //     if(value){
    //       time = new Date(value);
    //       time = `${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`
    //     }
    //     else{
    //       time = ""
    //     }
    //     return <p className={styles.text}>{time}</p>;
    //   },
    // },
    {
      title: "Nguồn",
      key: "resource_text",
      dataIndex: "resource_text",
      render(value, record, index) {
        return <p className={styles.text}>{value}</p>;
      },
    },
    {
      title: "Tạo",
      key: "created_at",
      dataIndex: "created_at",
      render(value, record, index) {
        return <p className={styles.text}>{convertTimestampToDateHMDMY(value)}</p>;
      },
    },
    {
      title: "Cập nhập",
      key: "updated_at",
      dataIndex: "updated_at",
      render(value, record, index) {
        console.log(record);
        console.log(value);
        let updated_at = value;
        if(updated_at = "$created_at"){
          updated_at = Number(record.created_at) + 5*60;
        }
        if( (Number(record.updated_at) <= Number(record.created_at))){
          updated_at = Number(record.created_at) + 5*60;
        }
        return <p className={styles.text}>{convertTimestampToDateHMDMY(updated_at)}</p>;
      },
    },
  ];
  
  const handleChangeSearch = async (e:any,field:any)=>{
    try{
       let value = e.target.value;
       let tempt = searchObject;
       tempt[field] = value;
       setSearchObject(tempt);
       return true;
    }
    catch(e){
      console.log("handleChangeSearch",e);
      return false
    }
  }

  const Search = async ()=>{
    try{
        const response = await axiosCRMv2("/customer/DanhSachUngVien", {
          ...searchObject,
          page,
        } );
        if (response.listEm) {
          setList(response.listEm);
        }
        const response2 = await axiosCRMv2("/customer/DanhSachUngVienCount", {
          ...searchObject,
          page,
        });
        if (response2.countEm) {
          setTotal(response2.countEm);
        };
        return true;
    }
    catch(e){
        console.log("error Search",e);
        return false
    }
  };

  const usePoint = async (cus_id:any)=>{
    try{
      alert(`Bạn muốn dùng điểm để xem ứng viên mã ${cus_id}`)
      let response = await axiosCRMv2("/customer/UsePointCrm", {
        com_id,
        emp_id: idQLC,
        listcus_id:cus_id,
      });
      console.log(response);
      if(response && (response.message == "Dùng điểm thành công")){
           alert("Mở thành công ứng viên")
      }
      else{
           alert("Mở thất bại")
      }
      Search();
    }
    catch(e){
       alert("Đã có lỗi xảy ra, xem ứng viên không thành công")
       console.log("err usePoint",e);
       return false
    }
  }


  const downloadExcel = (data:any, nameFile:any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, nameFile);
  };

  const ExportExcel = async ()=>{
    try{
        alert(`Bạn cần dùng ${total} điểm`);
        const response = await axiosCRMv2("/customer/TakeTablePointCom", {
          com_id:com_id,
          emp_id:idQLC
        });
        let diem = response.bangdiem[0].point;
        if(Number(diem) >= Number(total)){
            alert("Bạn đủ điểm, bấm ok để xuất");
            let response2 = await axios({
                    method: "post",
                    url: "https://api.timviec365.vn/api/crm/customer/ExportExcel",
                    data: {...searchObject,size:total},
                    headers: { 
                        "Content-Type": "multipart/form-data" ,
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
            if(response2 && response2.data && response2.data.data && response2.data.data.listEm){
                let listEm = response2.data.data.listEm;
                let tempt = [];
                for(let i=0; i< listEm.length; i++){
                    let obj = listEm[i];
                    tempt.push({
                        "ID tìm việc": obj.id_cus_from,
                        "Tên":obj.name,
                        "Link":obj.link,
                        "email":obj.email,
                        // "Số điện thoại":obj.phone_number,
                        "Địa chỉ":obj.address,
                        "Vị trí công việc":obj.cv_title
                    })
                }
                let nameFile = `Danh sách ứng viên.xlsx`;
                downloadExcel(tempt,nameFile);
            }
            else{
                alert("Xuất excel thất bại")
            }
           
        }
        else{
            alert("Bạn không đủ điểm");
        }
        return true;
    }
    catch(e){
        console.log("ExportExcel",e);
        return false;
    }
  }
  return (
    <div ref={mainRef} className={styleHome.main}>
      <div 
         style={{
          display: "block",
          width: "100%",
          position: "relative",
         }}
      >
        <input
          placeholder="Nhập ID tại site"
          name="id_cus_from"
          className={styles.input}
          onChange = {(e)=> handleChangeSearch(e,"id_cus_from")}
          //value = { searchObject.id_cus_from }
        />
        <input
          placeholder="Nhập IDCRM"
          name="cus_id"
          className={styles.input}
          onChange = {(e)=> handleChangeSearch(e,"cus_id")}
          //value = { searchObject.cus_id }
        />
         <input
          placeholder="Nhập tiêu đề cv"
          name="cv_title"
          className={styles.input}
          onChange = {(e)=> handleChangeSearch(e,"cv_title")}
          //value = { searchObject.cus_id }
        />
                
                <input
          placeholder="Nhập số điện thoại"
          name="phone_number"
          className={styles.input}
          onChange = {(e)=> handleChangeSearch(e,"phone_number")}
        />
                <input
          placeholder="Nhập mail"
          name="email"
          className={styles.input}
          onChange = {(e)=> handleChangeSearch(e,"email")}
        />
         <input
          placeholder="Nhập tên"
          name="name"
          className={styles.input}
          onChange = {(e)=> handleChangeSearch(e,"name")}
        />

        <div className={styles.element}>
            <SelectSingleV3Prop
                formDataProp={searchObject}
                setFormDataProp={setSearchObject}
                data={
                  dataCityToChoose.map((obj:any)=>{
                      return {
                          ...obj,
                          value:obj.cit_id,
                          label:obj.cit_name,
                      }
                  })
                }
                name="cv_city_id"
                label={"Tỉnh thành"}
                placeholder="Tỉnh thành"
            />
        </div>
        <div className={styles.element}>
              <SelectSingleV3Prop
                      formDataProp={searchObject}
                      setFormDataProp={setSearchObject}
                      data={
                        dataDistrict.map((obj:any)=>{
                            return {
                                ...obj,
                                value:obj.cit_id,
                                label:obj.cit_name,
                            }
                        })
                      }
                      name="cv_district_id"
                      label={"Quận huyện"}
                      placeholder="Quận huyện"
                  />
        </div>
        <div className={styles.element}>
              <SelectSingleV3Prop
                      formDataProp={searchObject}
                      setFormDataProp={setSearchObject}
                      data={
                        dataCategory.map((obj:any)=>{
                            return {
                                ...obj,
                                value:obj.cat_id,
                                label:obj.cat_name,
                            }
                        })
                      }
                      name="cv_cate_id"
                      label={"Ngành nghề"}
                      placeholder="Ngành nghề"
                  />
        </div>
        <div className={styles.element}>
              <SelectSingleV3Prop
                      formDataProp={searchObject}
                      setFormDataProp={setSearchObject}
                      data={
                        resource_arr
                      }
                      name="resoure"
                      label={"Nguồn"}
                      placeholder="Nguồn"
                  />
        </div>
        <div className={styles.element}>
            <SelectSingleV3Prop
                formDataProp={searchObject}
                setFormDataProp={setSearchObject}
                data={
                  gioitinh_arr
                }
                name="gender"
                label={"Giới tính"}
                placeholder="Chọn giới tính"
            />
        </div>
        <div className={styles.element}>
          <div>
              Thời gian tạo - bắt đầu
          </div>
          <input
            name="start"
            className={styles.input}
            type="date"
            //value = { searchObject.start }
            onChange = {(e)=> handleChangeSearch(e,"start")}
          />
        </div>
        <div className={styles.element}>
          <div>
              Thời gian tạo - kết thúc 
          </div>
          <input
            name="end"
            className={styles.input}
            type="date"
            //value = { searchObject.end }
            onChange = {(e)=> handleChangeSearch(e,"end")}
          />
        </div>
        {/* <div className={styles.element}>
          <div>
              Thời gian cập nhật - bắt đầu
          </div>
          <input
            name="start_up"
            className={styles.input}
            type="date"
            onChange = {(e)=> handleChangeSearch(e,"start_up")}
          />
        </div>
        <div className={styles.element}>
          <div>
              Thời gian cập nhật - kết thúc 
          </div>
          <input
            name="end_up"
            className={styles.input}
            type="date"
            onChange = {(e)=> handleChangeSearch(e,"end_up")}
          />
        </div> */}
        
         
      </div>
      <div className={styles.button_container}>
        <div className={styles.button} onClick={Search}>
          <Button>
                Tìm kiếm
          </Button>
        </div>
        <div className={styles.button}>
          <Button>
                 Số lượng: {total}
          </Button>
        </div>
        <div onClick={ExportExcel} className={styles.button}>
          <Button>
                 Xuất excel
          </Button>
        </div>
     
      </div>
     
      <Table
        bordered
        columns={columns}
        dataSource={list}
        pagination={{
          total: total,
          pageSize: size,
          onChange(page, pageSize) {
            setPage(Number(page));
            console.log(searchObject);
            setSearchObject({
              ...searchObject,page:page
            });
           
          },
        }}
      />
    </div>
  );
}
