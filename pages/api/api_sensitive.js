import axios from 'axios'

export default async function handler(req, res) {
  try {
    const resp = await axios.post(
      'http://43.239.223.5:5558/list_key',
      [
      ],
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return res.status(200).send({
      data:resp.data.list_key
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error,
    })
  }
}
