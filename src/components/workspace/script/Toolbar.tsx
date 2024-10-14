"use client";
import { ToolbarContainer, Undo, Redo } from "@/styles/workspace/Script.styles";
import "react-quill/dist/quill.snow.css";

export const fontSize = ["14px", "16px", "18px", "24px", "28px", "32px"];
export default function CustomToolbar({ editorRef }: { editorRef: any }) {
  const handleUndo = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.history.undo();
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.history.redo();
    }
  };
  return (
    <ToolbarContainer id="toolbar">
      {/* 되돌리기, 다시하기 */}
      <Undo onClick={handleUndo} />
      <Redo onClick={handleRedo} />
      <div className="ql-line"> </div>

      {/* 폰트 */}
      <select className="ql-font"></select>

      {/* 헤더 크기 */}
      <span className="ql-formats">
        <select className="ql-size">
          {fontSize.map((val) => (
            <option value={val} selected={val === "16px"}>
              {val.replace(/[^0-9]/g, "")}
            </option>
          ))}
        </select>
      </span>

      <div className="ql-line"> </div>

      {/* 글꼴 스타일 */}
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      {/* 블록 요소 */}
      <button className="ql-blockquote"></button>
      <div className="ql-line"> </div>
      {/* 색상 및 배경 */}
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <div className="ql-line"> </div>

      {/* 링크, 이미지, 비디오, 수식 */}
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
      <div className="ql-line"> </div>

      {/* 리스트 */}
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-list" value="check"></button>
      <div className="ql-line"> </div>

      {/* 들여쓰기/내어쓰기 */}
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <div className="ql-line"> </div>

      {/* 텍스트 방향 */}
      <button className="ql-direction" value="rtl"></button>
      {/* 정렬 */}
      <select className="ql-align"></select>
    </ToolbarContainer>
  );
}
