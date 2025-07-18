import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Form } from 'antd'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function ClassicCKEditor({
  data,
  onChange,
  required,
  title,
  name,
  form,
}: {
  data: string
  onChange: (event: any, editor: any) => void
  required: boolean
  title: string
  name: string
  form?: any
}) {
  return (
    <Form.Item
      required={required}
      // label={hasLabel && <p>{title}</p>}
      // labelCol={{ span: 24 }}
      name={name}>
      <CKEditor
        config={{}}
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
          console.log('ClassicCKEditor is ready to use!', editor)
        }}
        onChange={(event, editor: typeof ClassicEditor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
          form && form.setFieldValue(name, data)
          onChange(event, editor)
          form?.setFieldValue(name, editor.getData())
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
    </Form.Item>
  )
}
