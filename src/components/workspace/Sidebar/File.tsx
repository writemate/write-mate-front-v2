'use client';
import { useContext } from "react";
import { useKebab } from "@/hooks/workspace/sidebar/useKebab";
import { TFileWithOptions } from "@/utils/APIs/types";
import FileIcon from "@/assets/workspace/sideBar/file.svg";
import Pin from "@/assets/workspace/sideBar/pin.svg";
import { SidebarContext } from "@/stores/sidebarContext";
import SeletedFile from "@/assets/workspace/sideBar/selectedFile.svg";
import { FileContainer, FileName, KebabWrapper, Kebab, KebabContainer, KebabItem, TopDropLine, BottomDropLine } from "@/styles/workspace/SideBar.styles";
import { useDrag } from "@/hooks/workspace/sidebar/useDrag";

export default function File({ file, nestedLevel = 0, type }: { file: TFileWithOptions, nestedLevel?: number, type: "plot" | "script" }) {
  
  const { workspace_id, onChange, onBlur, onKeyDown, changeName, deleteFolderOrFile, setMainPlot  } = useContext(SidebarContext);
  const { isKebabOpen, openKebab, closeKebab } = useKebab();
  const { isDragOverAfter, isDragOverBefore, onDragStart, onDragOver, onDragLeave, onDrop} = useDrag(file);

  return (
    <FileContainer 
      $isFolder={false} $nestedLevel={nestedLevel} $isSelect={file.isSelect} $isEditing={file.isEditing}
      onDragStart={onDragStart} onDragOver={onDragOver} onDragLeave={onDragLeave} draggable={true} onDrop={onDrop}
    >
      <TopDropLine $nestedLevel={nestedLevel} $active={isDragOverBefore} />
      {file.isSelect && <SeletedFile />}
      {!file.isSelect && <FileIcon />}
      {!file.isEditing && <FileName href={`/${workspace_id}/${type}/${file._id}`}>{file.file_name}</FileName>}
      {file.isEditing &&
        <input type="text" value={file.file_name} 
          onChange={onChange(file)} onBlur={onBlur(file)} onKeyDown={onKeyDown(file)}
          autoFocus/>
      }
      {file.isPinned && <Pin />}
      <KebabWrapper tabIndex={0} onBlur={closeKebab}>
        <Kebab onClick={openKebab} />
        {isKebabOpen && <KebabContainer onClick={closeKebab}>
          <KebabItem onClick={changeName(file)}>이름 변경</KebabItem>
          {!file.isPinned && type==="plot" && <KebabItem onClick={setMainPlot(file)}>메인플롯으로 지정</KebabItem>}
          <KebabItem>복제하기</KebabItem>
          {!file.isPinned && <KebabItem onClick={deleteFolderOrFile(file)}>삭제하기</KebabItem>}
        </KebabContainer>}
      </KebabWrapper>
      <BottomDropLine $nestedLevel={nestedLevel} $active={isDragOverAfter} />
    </FileContainer>
  );
}
