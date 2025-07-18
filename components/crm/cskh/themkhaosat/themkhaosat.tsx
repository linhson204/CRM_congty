import React, { useState } from "react";
import styles from "../csks.module.css";
import Options from "./options/options";
import { Button, Input } from "antd";
import Themmoi_Options from "./options/themmoi/themmoi";
import Options1 from "./options/options1/options1";
import Themmoi_Image from "./options/options2/options-image";
import Themphan_Options from "./options/themphan/themphan";
import AddVideo from "./options/options4/options-video";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {};

const Themkhaosat = (props: Props) => {
  const router = useRouter();
  const [themmoi, setThemmoi] = useState<boolean>(false);
  const [countThemmoi, setCountThemmoi] = useState(0);
  const [themvideo, setThemvideo] = useState<boolean>(false);
  const [countThemvideo, setCountThemvideo] = useState(0);
  const [themphan, setThemphan] = useState<boolean>(false);
  const [countThemphan, setCountThemphan] = useState(0);
  const [options1, setOptions1] = useState(false);
  const [countOP1, setCountOP1] = useState(0);
  const [options2, setOptions2] = useState(false);
  const [countOP2, setCountOP2] = useState(0);
  //Addvideo
  const handleThemvideo = () => {
    setThemvideo(true);
    setCountThemvideo(countThemvideo + 1);
  };
  const handleDletevideo = () => {
    setCountThemvideo(countThemvideo - 1);
  };
  const Themvideo = () => {
    let VD = [];
    for (let i = 0; i < countThemvideo; i++) {
      VD.push(
        <div style={{ paddingBottom: 30 }}>
          <div className={styles.home_themkhaosat}>
            <AddVideo
              handleThemvideo={handleThemvideo}
              handleDletevideo={handleDletevideo}
            />
          </div>
        </div>
      );
    }
    return <div style={{ width: "100%" }}>{VD}</div>;
  };
  //them phan
  const handleThemPhan = () => {
    setThemphan(true);
    setCountThemphan(countThemphan + 1);
  };
  const handleDleteThePhan = () => {
    setCountThemphan(countThemphan - 1);
  };
  const Themphan = () => {
    let TP = [];
    for (let i = 0; i < countThemphan; i++) {
      TP.push(
        <div style={{ paddingBottom: 30 }}>
          <div className={styles.home_themkhaosat}>
            <Themphan_Options
              handleThemPhan={handleThemPhan}
              handleDleteThePhan={handleDleteThePhan}
            />
          </div>
        </div>
      );
    }
    return <div style={{ width: "100%" }}>{TP}</div>;
  };

  //Thêm moi
  const handleThemmoi = () => {
    setThemmoi(true);
    setCountThemmoi(countThemmoi + 1);
  };
  const handleDleteThemmoi = () => {
    setCountThemmoi(countThemmoi - 1);
  };
  const Themmoi = () => {
    let TM = [];
    for (let i = 0; i < countThemmoi; i++) {
      TM.push(
        <div style={{ paddingBottom: 30 }}>
          <div className={styles.home_themkhaosat}>
            <Themmoi_Options
              handleThemmoi={handleThemmoi}
              handleDleteThemmoi={handleDleteThemmoi}
            />
          </div>
        </div>
      );
    }
    return <div style={{ width: "100%" }}>{TM}</div>;
  };
  //
  const handleThemmoiOP1 = () => {
    setOptions1(true);
    setCountOP1(countOP1 + 1);
  };
  const handleDleteOP1 = () => {
    setCountOP1(countOP1 - 1);
  };
  const ThemOption1 = () => {
    let Op1 = [];
    for (let i = 0; i < countOP1; i++) {
      Op1.push(
        <div key={i} style={{ paddingBottom: 30 }}>
          <div className={styles.home_themkhaosat}>
            <Options1
              handleThemmoiOP1={handleThemmoiOP1}
              handleDleteOP1={handleDleteOP1}
            />
          </div>
        </div>
      );
    }
    return <div style={{ width: "100%" }}>{Op1}</div>;
  };
  //
  //Thêm ảnh
  const handleThemImage = () => {
    setOptions2(true);
    setCountOP2(countOP2 + 1);
  };
  const handleDleteImage = () => {
    setCountOP2(countOP2 - 1);
  };
  const ThemmoiImage = () => {
    let Image = [];
    for (let i = 0; i < countOP2; i++) {
      Image.push(
        <div style={{ paddingBottom: 30 }}>
          <div className={styles.home_themkhaosat}>
            <Themmoi_Image
              handleThemImage={handleThemImage}
              handleDleteImage={handleDleteImage}
            />
          </div>
        </div>
      );
    }
    return <div style={{ width: "100%" }}>{Image}</div>;
  };
  return (
    <div>
      <div className={styles.home_themkhaosat}>
        <fieldset className={styles.left_home_themkhaosat}>
          <div>
            <Input
              type="text"
              placeholder={"Nhập tiêu đề"}
              className={styles.inputtitle}
            />
          </div>
          <div style={{ paddingTop: 20 }}>
            <Input
              type="text"
        
              placeholder={"Mô tả"}
              className={styles.inputtitle2}
            />
          </div>
        </fieldset>
        <div className={styles.right_home_themkhaosat}>
          <Options
            handleThemmoi={handleThemmoi}
            handleThemmoiOP1={handleThemmoiOP1}
            handleThemImage={handleThemImage}
            handleThemPhan={handleThemPhan}
            handleThemvideo={handleThemvideo}
          />
        </div>
      </div>
      {themmoi && <div className={styles.home_themkhaosat}>{Themmoi()}</div>}
      {options1 && (
        <div className={styles.home_themkhaosat}>{ThemOption1()}</div>
      )}
      {options2 && (
        <div className={styles.home_themkhaosat}>{ThemmoiImage()}</div>
      )}

      {themphan && <div className={styles.home_themkhaosat}>{Themphan()}</div>}
      {themvideo && (
        <div className={styles.home_themkhaosat}>{Themvideo()}</div>
      )}
      <div className={styles.btn_footer_themmoi}>
        <Button
          onClick={() => router.push("/khao-sat")}
          style={{ border: "1px solid red", color: "red" }}
        >
          Hủy
        </Button>
        <div>&nbsp; &nbsp; &nbsp;</div>
        <Button
          onClick={() => {
            alert("Thêm khảo sát thành công"), router.push("/khao-sat");
          }}
          style={{ border: "1px solid #4C5BD4", color: "#4C5BD4" }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};
export default Themkhaosat;
