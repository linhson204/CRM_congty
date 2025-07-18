import axios from "axios"
import FormData from "form-data"

export default async function handler(req, res) {
    try {
        const {
            id,
            idQLC,
        } = req.body

        const formData = new FormData()
        formData.append("id", Number(id))
        formData.append('idQLC', Number(idQLC))
        // formData.append('page', Number(page))
        // formData.append('perPage', Number(perPage))

        const response = await axios.post(
            'https://job247.vn/api/socket/crm/readWarning',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                timeout: 30000,
            }
        )
        // console.log("🚀 ~ handler ~ response:", response)
        const data = response.data?.data
        if (data?.result) {
            return res.status(200).send({
                list: data?.list || [],
                totalUnread: data?.totalUnread || 0
            })
        } 

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(error?.code || 500).send({
            message: error?.error?.message,
        });
    }
}