import { Redo, ToolbarContainer, Undo } from "@/styles/workspace/Script.styles";

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

  const fontSize = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "30px",
    "36px",
  ];

  return (
    <ToolbarContainer id="toolbar">
      {/* 되돌리기, 다시하기 */}
      <Undo onClick={handleUndo} />
      <Redo onClick={handleRedo} />
      <div className="ql-line" />

      {/* 폰트 */}
      <select className="ql-font" defaultValue={"nanum-myeongjo"}>
        <option value="nanum-gothic">나눔 고딕</option>
        <option value="nanum-myeongjo">나눔 명조</option>
      </select>

      {/* 헤더 크기 */}
      <select className="ql-size" defaultValue={"16px"}>
        {fontSize.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      <div className="ql-line" />

      {/* 글꼴 스타일 */}
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      {/* 블록 요소 */}
      <button className="ql-blockquote"></button>
      <div className="ql-line" />
      {/* 색상 및 배경 */}
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <div className="ql-line" />
      {/* 링크, 이미지, 비디오, 수식 */}
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
      <div className="ql-line" />
      {/* 리스트 */}
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-list" value="check"></button>
      <div className="ql-line" />
      {/* 들여쓰기/내어쓰기 */}
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <div className="ql-line" />
      {/* 텍스트 방향 */}
      <button className="ql-direction" value="rtl"></button>
      {/* 정렬 */}
      <select className="ql-align"></select>
    </ToolbarContainer>
  );
}
