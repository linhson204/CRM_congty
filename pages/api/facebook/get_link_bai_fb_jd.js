import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  const { fromDate, toDate } = req.body;

  const formData = new FormData();
  formData.append("fromDate", String(fromDate));
  formData.append("toDate", String(toDate));
  try {
    const response = await axios.post(
      `http://43.239.223.188:3004/api/work247/tool/getLinkJdUpFbStoredFromAi`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000,
      }
    );

    if (response?.data) {
      return res.status(200).send({
        data: response.data,
      });
    }
  } catch (error) {
    console.error(error); // More detailed error logging
    return res.status(500).send({
      message: error?.response?.data?.message || error.message,
    });
  }
}
