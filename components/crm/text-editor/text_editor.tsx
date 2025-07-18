import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";

export default function TextEditor({
  title = null,
  className,
  cusId,
  setEditorContent,
  des,
  setDes,
}: any) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const sanitizedData = sanitizeContent(data);
    setEditorContent(sanitizedData);
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
      {editorLoaded ? (
        <CKEditor
          data={des}
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
