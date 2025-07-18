import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";
export const getDataListProcessTrain = async (page: any, pageSize: any,name: any) => {
      const isToken = getToken(COOKIE_KEY)
    const url = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const response = await axios.post(
          `${url}api/hr/training/listProcessTrain?page` + page + `pageSize` + pageSize + `name` + name ,
          {page, pageSize, name},
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
    
        return response.data;
      } catch (err) {

      }
}

export const addDataListProcessTrain = async (formData: any) => {
    const {name , description } = formData
      const isToken = getToken(COOKIE_KEY)
    const url = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const response = await axios.post(
          `${url}api/hr/training/process`,
          {name, description},
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
    
        return response;
      } catch (err) {

      }
}


export const deleteDataTrainingPosition = async (processTrainId: number) => {
  const isToken = getToken(COOKIE_KEY)
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.post(
      `${url}api/hr/training/softDeleteProcess`,
      {processTrainId},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );

    return response;
  } catch (err) {

  }
  }

  export const DataDetailProcess= async (processTrainId: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
    try {
      const response = await axios.post(
        `${url}api/hr/training/detailProcess`,
        { processTrainId },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      
    }
  };

    export const GetDataDetailProcess= async (processTrainId: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)

    try {
      const response = await axios.post(
        `${url}api/hr/training/detailProcess`,
        { processTrainId },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      
    }
  };

  export const addDetailTrainingStage = async (trainingProcessId: string, formData: any) => {
    const {name, objectTraining, content } = formData
    const url = process.env.NEXT_PUBLIC_BASE_URL;
     const isToken = getToken(COOKIE_KEY)
    try {
      const response = await axios.post(
        `${url}api/hr/training/stage`,
        {name, objectTraining,content, trainingProcessId },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      
    }
  };

  export const editDetailTrainingStage = async (stageProcessTrainingId: string, formData: any) => {
    const {name, objectTraining, content } = formData
    const url = process.env.NEXT_PUBLIC_BASE_URL;
     const isToken = getToken(COOKIE_KEY)
    try {
      const response = await axios.post(
        `${url}api/hr/training/updateStage`,
        {name, objectTraining,content, stageProcessTrainingId },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      
    }
  };

  export const deleteDetailTrainingStage = async (stageProcessTrainingId: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
     const isToken = getToken(COOKIE_KEY)
    try {
      const response = await axios.post(
        `${url}api/hr/training/softDeleteStage`,
        {stageProcessTrainingId },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      
    }
  };
