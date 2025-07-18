import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";

export default function TextEditorND({
  title = null,
  className,
  infoCus,
  setContent,
  setDate,
  setrefCall,
  content_call,
  content
}: any) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [value, setvalue] = useState<any>()

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const sanitizedData = sanitizeContent(data);
    setrefCall(sanitizedData);
    setvalue("")
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
      className={`text_editor_${className}`}
      style={{ padding: "4.5px", display: "block" }}
    >
      <label className="title_label">{title}</label>
      {editorLoaded ? <CKEditor
      data={content}
       onChange={handleEditorChange}
      editor={ClassicEditor} /> : "loading..."}
    </div>
  );
}
