import axios from 'axios';

export default async function handler( req, res) {
    console.log("vào đây==================")
    console.log('data', req.body);
  try {
    const response = await axios.post(`http://103.138.113.142:5140/send_mess`, {
        id_user_login: String(req.body.idLogin),
        url_user_sended: String(req.body.linkFB),
        type : "file",
        url_file_sender : req.body.urlFileSender,
        file_data : req.body.fileData,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 30000,
    })
   
   if(response?.data) {
    return res.status(200).send({
        result : true
      })
   }  
} catch (error) {
    return res.status(500).send({
        message: error?.message,
      })
}
}