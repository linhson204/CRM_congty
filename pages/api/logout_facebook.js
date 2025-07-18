import axios from 'axios';

export default async function handler( req, res) {
  try{
    const response = await axios.post(`http://103.138.113.142:5140/logout`, req.body, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 30000,
    })
   if(response.data) {
    res.status(200).send({
        data: response.data,
      })
   }  else {
    return res.status(500).send({
        message: error,
      })
   }
} catch (error) {
    return res.status(500).send({
        message: error,
      })
}
}