import React, { useState, useEffect, useRef } from "react";

export default function TextEditorTLKDDes({ title = null, className,  infoCus ,refDes,setrefDes}: any) {

  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("../../ckeditor5"),
    };
    setEditorLoaded(true);  
  }, []);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    // data chứa nội dung thay đổi của trình soạn thảo
    setrefDes(data)
  };
  return (
    <div
      className={`text_editor_${className}`}
      style={{ padding: "4.5px", display: "block" }}
    >
      <label className="title_label">{title}</label>
      {editorLoaded ? (
        <CKEditor    onChange={handleEditorChange}
        data={infoCus?.description?.detail?infoCus?.description?.detail:""} editor={ClassicEditor} />
      ) : (
        "loading..."
      )}
    </div>
  );
}
