import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  const { id, idQLC, note } = req.body;

  // Tạo dữ liệu dưới dạng form-data
  const formData = new FormData();
  formData.append("id", String(id));
  formData.append("idQLC", String(idQLC));
  formData.append("note", String(note));
  // formData.append("tinhthanh", String(tinhthanh));
  // formData.append("startTime", Number(startTime));
  // formData.append("endTime", Number(endTime));

  try {
    const response = await axios.post(
      `http://43.239.223.188:3004/api/work247/tool/editLinkCandiFromFbNote`,
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
        data: response?.data,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error?.message,
    });
  }
}
