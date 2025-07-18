import {
    convertSelectedTimeToTimestamp,
    convertStringToTimestamp,
  } from "@/utils/function";
  import { ChangeEvent, createContext, useState } from "react";
  
  export const useFormData = createContext<any>(false);
  
  export const FormDataContext: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [formData, setFormData] = useState<any>({ recall: false });
  
    const hanldeClearRecall = () => {
      setFormData({
        ...(typeof formData.recall !== "undefined"
          ? { recall: !formData.recall }
          : { recall: true }),
      });
    };
    const handleRecall = () => {
      setFormData({
        ...formData,
        ...(typeof formData.recall !== "undefined"
          ? { recall: !formData.recall }
          : { recall: true }),
      });
    };
    const handleChangeData = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value, type } = e.target;
      // console.log('change data context',name, value, type);
      switch (type) {
        case "date":
        case "datetime-local":
          setFormData({
            ...formData,
            // [name]: convertStringToTimestamp(value),
            [name]: value,
          });
          // console.log(formData);
          return;
        case "time":
          setFormData({
            ...formData,
            [name]: convertSelectedTimeToTimestamp(value),
          });
          return;
        default:
          setFormData({
            ...formData,
            [name]: value,
          });
          return;
      }
    };
    const handleChangeAndRecall = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
        ...(typeof formData.recall !== "undefined"
          ? { recall: !formData.recall }
          : { recall: true }),
      });
    };
    return (
      <useFormData.Provider
        value={
          {
            formData,
            setFormData,
            handleChangeData,
            handleRecall,
            handleChangeAndRecall,
            hanldeClearRecall,
          } as any
        }
      >
        {children}
      </useFormData.Provider>
    );
  };
  