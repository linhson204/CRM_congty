import React, { useEffect, useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";
import AddContractrModal from "../modal_add_contract";
import CancelModal from "../../price_policy/price_policy_steps/cancel_modal";
import ModalCompleteStep from "../../price_policy/price_policy_steps/complete_modal";
import axios from "axios";
import { index, json } from "d3";
import CreatFieldModal from "./creat_field_mdal";
import CreatFieldDefaultModal from "./creat_field_default";
import ContractValueInputSearch from "./contract_value_input_search";
import { imageBase64 } from "./imgBase64";
import { setTextRange } from "typescript";
import { base_url } from "../../service/function";
import { el } from "date-fns/locale";
import EditFieldModal from "./editField_mdal";
import ModalSaveContractAdd from "../../price_policy/price_policy_steps/save_contract_mdal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  fetchData: any;
}
interface TableAddContractProps {
  setCheckFile;
}

const TableAddContract: React.FC<TableAddContractProps> = ({}: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [idFile, setIdFile] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [path_dowload, setpath_dowload] = useState<any>("");
  const [text_change, settext_change] = useState<any>("");
  const [imgUrls, setImgaUrls] = useState([]);
  const [ismodal1Open, setIsmodal1Open] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [imageData, setImageData] = useState<any>();
  const [inputSearch, setInputSearch] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [posEdit, setPosEdit] = useState<any>([]);
  const initialCheckStates = Array(0).fill(false); // Thay số 0 bằng số lượng checkbox tùy theo gtri tìm kiếm
  const [checkedStates, setCheckedStates] =
    useState<boolean[]>(initialCheckStates);
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newValues, setNewValues] = useState<
    {
      default_field: any;
      index: number[];
      originalValue: string;
      newValue: string;
    }[]
  >([]); // Set value moi, value cu va index
  const targetScrollRef = useRef<HTMLDivElement>(null);
  const [isOpenEditField, setIsOpenEditField] = useState(false);

  const axios = require("axios");
  // const fs = require("fs");
  const FormData = require("form-data");
  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  const Cookies = require("js-cookie");

  const [formData, setFormData] = useState<any>({
    _id: "",
    name: "",
    pathFile: "",
    com_id: "",
    ep_id: "",
    id_file: "",
    created_at: "",
    user_created: "",
    id_customer: "",
    update_at: "",
    status: "",
    is_delete: "",
    new_field: "",
    old_field: "",
    index_field: "",
    default_field: "",
    path_dowload: "",
    id_form_contract: "",
  });

  const scrollToTarget = () => {
    const targetElement = document.getElementById("setting");

    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleEditField = async (event, item, index) => {
    setIsEdit(true);
    setInputSearch(item?.originalValue);
    settext_change(item?.originalValue);
    scrollToTarget();
    setPosEdit(index);

    // Search Again
    const formData = new FormData();
    formData.append("text_change", item?.originalValue);
    formData.append("input_file", path_dowload);

    setCheckedStates(Array(0).fill(false));
    const token = Cookies.get("token_base365");
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.timviec365.vn/api/crm/contractAI/search",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dat = await response.data;
      setLoading(false);
      // setImgaUrls(dat?.data?.result?.input_file)
      const countWord = dat?.data?.result?.number_text;
      const newStates = Array(countWord).fill(false);
      for (const pos of item?.index) {
        if (pos >= 0 && pos < checkedStates.length) {
          newStates[pos] = true;
        }
      }
      setCheckedStates(newStates);

      if (countWord > 0) {
        setImgaUrls(dat?.data?.result?.image);
      }
    } catch (error) {
      console.error("Error------:", error.message);
    }
    // ------

    // setCheckedStates(newStates);
  };

  const token = Cookies.get("token_base365");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setFileUpload(file?.name);
    setCheckedStates(Array(0).fill(false));
    setNewValues([]);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        const token = Cookies.get("token_base365");
        const res = await fetch(
          "https://api.timviec365.vn/api/crm/contractAI/read_file",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setLoading(false);
          setImgaUrls(data?.data?.result?.image);
          setpath_dowload(data?.data?.result?.path);
          setIdFile(data?.data?.result?.sess_id);
        } else {
          throw new Error("Request failed with status: " + res.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  //  TÌM KIẾM

  const handleFind = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const text_change = event.target.value;
    settext_change(inputSearch);
    event.preventDefault();

    if (inputSearch) {
      setIsEdit(false);
      const formData = new FormData();
      formData.append("text_change", inputSearch);
      formData.append("input_file", path_dowload);

      setCheckedStates(Array(0).fill(false));
      const token = Cookies.get("token_base365");
      try {
        setLoading(true);
        const response = await axios.post(
          "https://api.timviec365.vn/api/crm/contractAI/search",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dat = await response.data;
        setLoading(false);
        // setImgaUrls(dat?.data?.result?.input_file)
        const countWord = dat?.data?.result?.number_text;
        setCheckedStates(Array(countWord).fill(false));
        if (countWord > 0) {
          setImgaUrls(dat?.data?.result?.image);
        }
      } catch (error) {
        console.error("Error------:", error.message);
      }
    }
  };

  const handleShowModal = () => {
    const selectedIndices = checkedStates.reduce(
      (indices, isChecked, index) =>
        isChecked ? [...indices, index] : indices,
      []
    );

    if (selectedIndices.length === 0) {
      alert("Hãy chọn ít nhất 1 trường thông tin để thiết lập");
    } else {
      // Mở modal hiển thị vị trí các checkbox được chọn
      setIsCreatField(true);
    }
  };

  const handleShowModalDefaultField = () => {
    const selectedIndices = checkedStates.reduce(
      (indices, isChecked, index) =>
        isChecked ? [...indices, index] : indices,
      []
    );

    if (selectedIndices.length === 0) {
      alert("Hãy chọn ít nhất 1 trường thông tin để thiết lập");
    } else {
      // Mở modal hiển thị vị trí các checkbox được chọn
      setIsCreatFieldDefault(true);
    }
  };

  const dispatchShowModalEditField = () => {
    const selectedIndices = checkedStates.reduce(
      (indices, isChecked, index) =>
        isChecked ? [...indices, index] : indices,
      []
    );

    if (selectedIndices.length === 0) {
      alert("Hãy chọn ít nhất 1 trường thông tin để thiết lập");
    } else {
      // Mở modal hiển thị vị trí các checkbox được chọn
      setIsOpenEditField(true);
    }
  };

  const handleShowEditFieldModal = () => {
    dispatchShowModalEditField();
  };

  const handleCreateFieldBtn = () => {
    handleShowModal();
  };

  const handleSetDefaultField = () => {
    handleShowModalDefaultField();
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  function checkValuesExist(arrA, arrB) {
    for (const valueA of arrA) {
      for (const itemB of arrB) {
        if (itemB.index.includes(valueA)) {
          return true;
        }
      }
    }
    return false;
  }

  const checkWords = (arr, text) => {
    const index = arr.findIndex((item) => item.originalValue === text);
    return index;
  };

  const handleReplaceValues = (newValue: string, defaultValue = "") => {
    const indexSelect = checkedStates
      .map((value, index) => (value ? index : null))
      .filter((index) => index !== null);
    const editedItem = checkValuesExist(indexSelect, newValues);
    const checkWord = checkWords(newValues, text_change);

    const mergedIndexes = [];

    for (let i = 0; i < newValues.length; i++) {
      if (newValues[i].originalValue === text_change) {
        mergedIndexes.push(...newValues[i].index);
      }
    }

    const arrCheck = indexSelect.filter((item) => mergedIndexes.includes(item));

    if (!editedItem || checkWord === -1 || arrCheck.length < 1) {
      const updatedValues = [
        ...newValues,
        {
          index: indexSelect,
          originalValue: text_change,
          newValue,
          default_field: defaultValue,
        },
      ];
      setNewValues(updatedValues);
    } else {
      alert(`Từ khóa đã được thiết lập, vui lòng kiểm tra lại`);
    }

    setCheckedStates(Array(checkedStates.length).fill(false));
  };

  const handleEditValue = (newValue: string, pos: any, defaultValue = null) => {
    const indexSelect = checkedStates
      .map((value, index) => (value ? index : null))
      .filter((index) => index !== null);
    let updatedValues = newValues[pos];
    const result: number[] = indexSelect.filter(
      (item) => !updatedValues?.index?.includes(item)
    );
    const editedItem = checkValuesExist(result, newValues);

    const mergedIndexes = [];

    for (let i = 0; i < newValues.length; i++) {
      if (newValues[i].originalValue === text_change) {
        mergedIndexes.push(...newValues[i].index);
      }
    }

    const arrCheck = result.filter((item) => mergedIndexes.includes(item));

    if (!editedItem || arrCheck?.length < 1) {
      const newResultEdit = {
        index: indexSelect,
        originalValue: text_change,
        default_field: defaultValue,
        newValue,
      };
      const newData = [...newValues];
      newData?.splice(pos, 1, newResultEdit);
      setNewValues(newData);
      setIsEdit(false);
    } else {
      alert(`Từ khóa đã được thiết lập, vui lòng kiểm tra lại`);
    }

    setCheckedStates(Array(checkedStates.length).fill(false));
  };

  const handleDelEditField = (item) => {
    const result = confirm("Bạn có chắc chắn muốn xóa trường này ???");
    const index = newValues.findIndex((el) => el === item);
    const newArr = [...newValues];
    if (result) {
      newArr.splice(index, 1);
      setNewValues(newArr);
    } else {
      // alert("Ko");
    }
  };
  const handleSave = async () => {
    const list_details = newValues.map((item) => ({
      new_field: item?.newValue || "",
      old_field: item?.originalValue || "",
      index_field: item?.index?.join(",") || "",
      default_field: item?.default_field,
    }));

    const bodyData = {
      filename: fileUpload,
      path_file: path_dowload,
      id_file: idFile,
      list_detail: list_details,
    };

    try {
      const response = await fetch(
        "https://api.timviec365.vn/api/crm/contract/add",
        {
          method: "POST",
          body: JSON.stringify(bodyData),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const displayIndex = (item: any) => {
    const newIndex = item.index.map((id) => id + 1);

    return `Từ tìm kiếm: ${
      item?.originalValue
    }, tại các vị trí: ${newIndex.join(", ")}`;
  };

  const [isCreatField, setIsCreatField] = useState(false);

  const [isCreatFieldDefault, setIsCreatFieldDefault] = useState(false);

  return (
    <>
      <div className={styles.main__body}>
        <>
          <div
            id="drop-zone"
            className={`${styles["drop-zone"]} ${styles.row}`}
          >
            <div className={styles.col_md_6}>
              <div className={styles.title}>
                Tải lên hợp đồng <span className={styles.color_sup}>*</span>
              </div>
              <div>
                <label
                  className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                  onClick={handleClickSelectFileUpdload}
                >
                  Chọn hợp đồng từ máy tính của bạn
                  <img src="/crm/taihopdong.svg" alt="upload" />
                  <input
                    type="file"
                    id="fileInput"
                    className={styles.upload}
                    name="file"
                    multiple
                    // ref={inputFileRef}
                    onChange={(event) => handleUpload(event)}
                    // value={path_dowload}
                  />
                </label>
              </div>
            </div>

            <>
              {imgUrls && imgUrls?.length > 0 && (
                <>
                  <div className={styles.col_md_6}>
                    <div className={styles.title}>
                      Tìm kiếm thông tin cần thay đổi trong hợp đồng
                    </div>
                    <form
                      onSubmit={(e: any) => handleFind(e)}
                      className={styles.divSearch}
                    >
                      <input
                        value={inputSearch}
                        className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                        onChange={(event) => setInputSearch(event.target.value)}
                        placeholder="Nhập nội dung cần thay đổi"
                      />
                      {/* <button
                    className={styles.search}
                    onChange={() =>
                      fetchData(
                        "http://43.239.223.117:4000/search",
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyIsImFsaWFzIjoiY29uZy10eS10ZXN0LTEiLCJwaG9uZSI6IjA5NjUyMzQ2NjUiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOm51bGwsInR5cGUiOjEsInBhc3N3b3JkIjoiMDk4NTI1MWYzZDEzMDc2YmVlYzY5YWNhNzc4ZWEzMWYiLCJjaXR5IjoyLCJkaXN0cmljdCI6MjgyLCJhZGRyZXNzIjoia20gMTAgLSBUcuG6p24gUGjDuiAtIEjDoCDEkMO0bmcsIEhOIiwib3RwIjoiODA1MjM5IiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjoxLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInVwZGF0ZWRBdCI6MSwibGFzdEFjdGl2ZWRBdCI6bnVsbCwidGltZV9sb2dpbiI6MTY5MTQ2NDAxOSwicm9sZSI6MCwibGF0aXR1ZGUiOiIyMC45ODkwMzEzIiwibG9uZ3RpdHVkZSI6IjEwNS44MzEyNTg4IiwiaWRRTEMiOjE3NjMsImlkVGltVmllYzM2NSI6MjAyNTg1LCJpZFJhb05oYW5oMzY1IjowLCJjaGF0MzY1X3NlY3JldCI6IjJaMW5zNmtjVDUiLCJjaGF0MzY1X2lkIjowLCJzY2FuX2Jhc2UzNjUiOjAsImNoZWNrX2NoYXQiOjAsInNoYXJlUGVybWlzc2lvbklkIjpbXSwiaW5Gb3JQZXJzb24iOm51bGwsImluRm9yQ29tcGFueSI6eyJzY2FuIjowLCJ1c2Nfa2QiOjQxLCJ1c2Nfa2RfZmlyc3QiOjAsImRlc2NyaXB0aW9uIjoiZOG7i2NoIHbhu6UiLCJjb21fc2l6ZSI6MiwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik5ndXllbiBWYW4gQ3VvbmciLCJ1c2NfbmFtZV9hZGQiOiIxIFRy4bqnbiBOZ3V5w6puIMSQw6FuLCBLaHUgxJHDtCB0aOG7iyDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWkiLCJ1c2NfbmFtZV9waG9uZSI6IjA5NjUzMjQ2NzQiLCJ1c2NfbmFtZV9lbWFpbCI6InRoaWVucXVhbkBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MDg4MTg4MCwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MCwidXNjX3NpemUiOjIsInVzY193ZWJzaXRlIjoidGltdmllYzM2NS52biIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjEsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4yMzEiLCJ1c2NfbG9jIjoxLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6InZpZGVvX2Nwbjg0NDE4NjE2NzM0MzMyNTkubXA0LHZpZGVvX2Nwbjg0NDE4NjE2NzM1Mjc0MDMubXA0LHZpZGVvX2Nwbl8wXzE2OTAzNjQyNDgubXA0IiwidXNjX3ZpZGVvX3R5cGUiOjIsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MTY5MDk2NzMzMywidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MSwidXNjX3N0YXIiOjEsInVzY192aXAiOjMsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiI8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDU5NTg3Ljk0NTgzMTExOTgxITJkMTA1LjgwMTk0Mzk1NjIxMzgyITNkMjEuMDIyODE2MTM1NzMzMTM3ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzMTM1YWI5YmQ5ODYxY2ExJTNBMHhlNzg4N2Y3YjcyY2ExN2E5ITJ6U01PZ0lFN2h1NWxwTENCSWI4T2diaUJMYWVHNnYyMHNJRWpEb0NCTzRidVphU3dnVm1uaHU0ZDBJRTVoYlEhNWUwITNtMiExc3ZpITJzITR2MTYwMTM0NTI1NDk1MyE1bTIhMXN2aSEyc1wiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MDtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI-PC9pZnJhbWU-IiwidXNjX2RnYyI6IlszLDAsMSwxLFwibGlrdWp5dHJcIl0iLCJ1c2NfZGd0diI6Ils1LDEsXCJ0ZXN0XCIsXCJ0ZXN0XCJdIiwidXNjX2RnX3RpbWUiOjE2OTA1MTQzNjMsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJk4buLY2ggduG7pSIsInVzY196YWxvIjpudWxsLCJ1c2NfY2MzNjUiOjAsInVzY19jcm0iOjAsInVzY19pbWFnZXMiOm51bGwsInVzY19hY3RpdmVfaW1nIjowLCJ1c2NfZm91bmRlZF90aW1lIjowLCJ1c2NfYnJhbmNoZXMiOltdfSwiY2RzIjp7ImNvbV9yb2xlX2lkIjowLCJjb21fcGFyZW50X2lkIjpudWxsLCJ0eXBlX3RpbWVrZWVwaW5nIjoiMSwyLDMsNCw1LDgsOSIsImlkX3dheV90aW1la2VlcGluZyI6IjEiLCJjb21fcXJfbG9nbyI6bnVsbCwiZW5hYmxlX3NjYW5fcXIiOjAsImNvbV92aXAiOjAsImNvbV9lcF92aXAiOjUsImNvbV92aXBfdGltZSI6MCwiZXBfY3JtIjowLCJlcF9zdHQiOjF9LCJfaWQiOiI2NGQxYjY1M2NlZDljMjdmNWI5NWI2YzQifSwiaW5mb3JSTjM2NSI6bnVsbCwiY29uZmlnQ2hhdCI6eyJub3RpZmljYXRpb25BY2NlcHRPZmZlciI6MSwibm90aWZpY2F0aW9uQWxsb2NhdGlvblJlY2FsbCI6MSwibm90aWZpY2F0aW9uQ2hhbmdlU2FsYXJ5IjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVJhb05oYW5oIjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVRpbVZpZWMiOjEsIm5vdGlmaWNhdGlvbkRlY2lsaW5lT2ZmZXIiOjEsIm5vdGlmaWNhdGlvbk1pc3NNZXNzYWdlIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUGluIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUmVjcnVpdCI6MSwibm90aWZpY2F0aW9uTlREUG9pbnQiOjEsIm5vdGlmaWNhdGlvblNlbmRDYW5kaWRhdGUiOjEsIm5vdGlmaWNhdGlvblRhZyI6MSwicmVtb3ZlU3VnZ2VzIjpbXSwidXNlck5hbWVOb1ZuIjoiIiwiZG91YmxlVmVyaWZ5IjowLCJhY3RpdmUiOjAsInN0YXR1cyI6IiIsImFjY2VwdE1lc3NTdHJhbmdlciI6MCwiSGlzdG9yeUFjY2VzcyI6W119LCJzY2FuIjowfSwiaWF0IjoxNjkyMjM5MzgyLCJleHAiOjE2OTIzMjU3ODJ9.jVyBEHo81tIVE0DBC70tMuyH35ijQKjH_JbZD8pq0aM",
                        "POST",
                        { text_change: `${text_change}` }
                      )
                    }
                  >
                    Tìm kiếm
                  </button> */}
                    </form>
                  </div>
                  <div
                    ref={targetScrollRef}
                    id="setting"
                    className={styles.col_md_6}
                    style={{ width: "100%" }}
                  >
                    <div className={styles.fm_fd}>
                      <label className={styles.label_thietlap}>
                        Thiết lập thông tin cần thay đổi trong hợp đồng
                      </label>

                      <div className={styles.param}>
                        {text_change !== "" &&
                          checkedStates.map((isChecked, index) => (
                            <div key={index} style={{ marginRight: "5px" }}>
                              <label>
                                <input
                                  style={{ marginLeft: "3px" }}
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleCheckboxChange(index)}
                                />
                                {text_change} <span>(</span>
                                {index + 1}
                                <span>)</span>
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className={styles.btn_form_contract}>
                      {isEdit ? (
                        <>
                          <button
                            onClick={() => setIsEdit(false)}
                            type="button"
                            className={styles.xoatruong}
                          >
                            Hủy
                          </button>
                          <button
                            onClick={handleShowEditFieldModal}
                            type="button"
                            className={styles.taotruong}
                          >
                            <img
                              src="https://crm.timviec365.vn/assets/img/suatruong.svg"
                              alt="button"
                            />
                            Sửa trường
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleCreateFieldBtn()}
                            data-toggle="modal"
                            data-target="#modalCreate"
                            className={styles.taotruong}
                          >
                            <img src="/crm/plus_icon_field.svg" alt="button" />
                            Tạo trường
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={handleSetDefaultField}
                        className={styles.tieptuc}
                      >
                        Chỉnh sửa bằng trường mặc định
                      </button>

                      {/* <button
                   type="button"
                   // onclick="prev()"
                   className="quaylai l-15 hidden"
                 >
                   <img src="/assets/img/quaylai.svg" alt="button" /> Quay lại
                 </button>
                 <button
                   type="button"
                   // onclick="next()"
                   className="tieptuc l-15 hidden"
                 >
                   Tiếp tục <img src="/assets/img/tieptuc.svg" alt="button" />
                 </button> */}
                      <CreatFieldModal
                        isModalCancel={isCreatField}
                        setIsModalCancel={setIsCreatField}
                        handleReplaceValues={handleReplaceValues}
                        // index={checkedStates.findIndex((isChecked) => isChecked)}
                      />
                      <EditFieldModal
                        isModalCancel={isOpenEditField}
                        setIsModalCancel={setIsOpenEditField}
                        handleReplaceValues={handleEditValue}
                        value={newValues[posEdit]?.newValue}
                        index={posEdit}
                        checkDefaultVal={newValues[posEdit]?.default_field}
                      />
                      <CreatFieldDefaultModal
                        isModalCancel={isCreatFieldDefault}
                        setIsModalCancel={setIsCreatFieldDefault}
                        handleReplaceValues={handleReplaceValues}
                        type={isEdit}
                        pos={posEdit}
                        handleEdit={handleEditValue}
                      />
                    </div>
                  </div>
                </>
              )}
            </>

            {/* /////////////////////////////////////////////////////////////// */}

            {/* ///////////////////////////////////////////////////////////// */}
          </div>
        </>
      </div>

      {loading && (
        <div>
          <div>
            <div className={styles.head_contract}>
              <h4>Thông tin hợp đồng</h4>
            </div>
          </div>
          <div className={styles["frm-2"]}>
            {/* {imgUrls?.map((url, index: number) => ( */}
            <img
              style={{ objectFit: "contain" }}
              alt="hd"
              src="/crm/loading_file.gif"
            />
            {/* ))} */}
          </div>
        </div>
      )}

      {/* Thong tin hop dong */}
      {imgUrls && imgUrls?.length > 0 && !loading && (
        <div>
          <div>
            <div className={styles.head_contract}>
              <h4>Thông tin hợp đồng</h4>
            </div>
          </div>
          <div className={styles["frm-2"]}>
            {imgUrls?.map((url, index: number) => (
              <img alt="hd" src={`${url}`} key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Edit field contract */}
      {newValues && newValues?.length > 0 && (
        <div className={styles.field_config}>
          <div className={styles.footer_contract}>
            <h4>Các trường đã thiết lập</h4>
          </div>
          <div className={`${styles["frm-3"]}`}>
            {newValues?.map((item: any, index: number) => (
              <div
                key={index}
                className={`${styles["fm-bd"]} ${styles["fm_bt"]} ${styles["fm-fd"]} ${styles.opacity}`}
                id="field_config_1"
              >
                <div className={styles["error-name"]}>
                  <label className={styles.field_new}>{item?.newValue}</label>
                  <div className={styles.function}>
                    <button
                      className={styles.h_edit_cus}
                      onClick={(e) => {
                        handleEditField(e, item, index);
                      }}
                      disabled={scrolling}
                    >
                      <img src="/crm/blue_edit_cus.svg" alt="sửa" /> Sửa |
                    </button>
                    <button
                      onClick={() => handleDelEditField(item)}
                      className={styles.h_delete_cus}
                    >
                      <img src="/crm/red_delete_cus.svg" alt="Xóa" /> Xóa
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  className={`${styles["form-control"]} ${styles.text}`}
                  value={displayIndex(item)}
                  readOnly
                  placeholder="Nhập nội dung"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Footer Buttons */}
      {imgUrls && imgUrls?.length > 0 && (
        <div className={styles.btn_submit}>
          <button
            className={styles.sub1}
            type="button"
            onClick={() => setIsModalCancel(true)}
          >
            Hủy
          </button>
          <button
            className={styles.sub2}
            type="submit"
            onClick={async () => (await handleSave(), setIsmodal1Open(true))}
          >
            Lưu
          </button>
          <ModalSaveContractAdd
            modal1Open={ismodal1Open}
            setModal1Open={setIsmodal1Open}
            title="Thêm mới Hợp đồng thành công!"
            handleSave={handleSave}
          />
          <CancelModal
            isModalCancel={isModalCancel}
            setIsModalCancel={setIsModalCancel}
            content={
              "Bạn có chắc chắn muốn hủy thêm mới hợp đồng, mọi thông tin bạn nhập sẽ không được lưu lại?"
            }
            title={"Xác nhận hủy thêm mới hợp đồng"}
          />
        </div>
      )}
    </>
  );
};

export default TableAddContract;
