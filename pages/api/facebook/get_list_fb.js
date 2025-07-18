import axios from 'axios';

export default async function handler( req, res) {
    console.log('data', req.body);
  try {
    const response = await axios.post(`http://103.138.113.142:5140/get_list_fb`, {
        ID_chat: String(req.body.ID_chat)
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 30000,
    })
   
   if(response?.data) {
    return res.status(200).send({
        data: response?.data
      })
   }  
} catch (error) {
    return res.status(500).send({
        message: error?.message,
      })
}
}