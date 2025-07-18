import React, { useState, useEffect, useRef } from "react";

export default function TextEditorGr({
  title = null,
  className,
  editorContent,
  setEditorValue,
  setEditorContent
}: any) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  // const [editorContent, setEditorContent] = useState("");
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    // editor.setData(setEditorContent)
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
          data={editorContent}
          onChange={(event: any, editor: any) => {
            const content = editor.getData();
            if (typeof setEditorValue !== undefined) {
              setEditorValue(content);
            }
          }}
          editor={ClassicEditor}
        />
      ) : (
        "loading..."
      )}
    </div>
  );
}
