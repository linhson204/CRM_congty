import axios from 'axios'

export default async function handler(req, res) {
  const body = req.body
  try {
    const company_id = body.company_id
    const user_id = body.user_id
    const isAndroid = body.isAndroid
    const image = body.image
    if (company_id && user_id && image) {
      // const listImg = listImgs?.split(',')
      const fd = new FormData()
      fd.append('company_id', company_id)
      fd.append('user_id', user_id)
      fd.append('isAndroid', isAndroid)
      fd.append('image', image)

      const data = await axios.post(
        'http://43.239.223.147:5001/v2/face_register_app',
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (data?.data?.data?.result) {
        res.status(200).send({
          data: true,
          message: 'Cập nhật khuôn mặt thành công',
        })
      } else {
        res.status(500).send({
          message: 'Có lỗi khi cập nhật khuôn mặt',
        })
      }
    } else {
      res.status(500).send({
        message: 'Thieu truong',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error,
    })
  }
}
