import React, { useState, useEffect, useRef } from "react";

export default function TextEditor({ title = null, className, content, listContent, setListContent, index }: any) {

    const editorRef = useRef<any>();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("../../../../ckeditor5"),
        };
        setEditorLoaded(true);
    }, []);
    const handleEditorChange = (event, editor) => {
        const arr = [...listContent]
        arr[index] = editor.getData()
        setListContent(arr)
    };
    return (
        <div
            className={`text_editor_${className}`}
            style={{ borderRadius: "8px", display: "block" }}
        >
            <label className="title_label">{title}</label>
            {editorLoaded ? (
                <CKEditor
                    data={content}
                    onChange={handleEditorChange}
                    editor={ClassicEditor}

                />
            ) : (
                "loading..."
            )}
        </div>
    );
}
