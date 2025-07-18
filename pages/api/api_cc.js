import axios from 'axios'

export default async function handler(req, res) {
  const body = req.body
  console.log(body.image)
  try {
    const resp = await axios.post(
      'http://43.239.223.147:5001/verify_web_company',
      [
        {
          company_id: body?.company_id,
          image: body?.image,
        },
      ],
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(resp)
    res.status(200).send({
      data: resp?.data,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error,
    })
  }
}
