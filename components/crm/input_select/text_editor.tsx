import React, { useState, useEffect, useRef, useContext } from "react";
import DOMPurify from "dompurify";
import { useFormData } from "../context/formDataContext";

export default function TextEditorV2({ label = null, name }: any) {
  const editorRef = useRef<any>();
  const { formData, setFormData } = useContext(useFormData);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const sanitizedData = sanitizeContent(data);
    setFormData({
      ...formData,
      [name]: sanitizedData,
    });
  };

  const sanitizeContent = (content) => {
    const cleanContent = content.replace("&nbsp;", " "); // Loại bỏ các thẻ <p> trống và &nbsp;
    const sanitizedContent = DOMPurify.sanitize(cleanContent, {
      ALLOWED_TAGS: [], // Để loại bỏ tất cả các thẻ
      ALLOWED_ATTR: [], // Để loại bỏ tất cả các thuộc tính
    });
    return sanitizedContent;
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("../../ckeditor5"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div
      className={`text_editor_${name}`}
      style={{ padding: "4.5px", display: "block" }}
    >
      <label className="title_label">{label}</label>
      {editorLoaded ? (
        <CKEditor
          // data={formData[name] && formData[name]}
          onChange={handleEditorChange}
          editor={ClassicEditor}
          config={
            {
              // ...
              // Your other config options
              // ...
            }
          }
        />
      ) : (
        "loading..."
      )}
    </div>
  );
}
