'use client';
import { useContext } from "react";
import { useKebab } from "@/hooks/workspace/sidebar/useKebab";
import { TFolderWithOptions } from "@/utils/APIs/types";
import OpendDropButton from "@/assets/workspace/sideBar/opendDropButton.svg";
import CloseDropButton from "@/assets/workspace/sideBar/closedDropButton.svg";
import FolderIcon from "@/assets/workspace/sideBar/folder.svg";
import SeletedFolder from "@/assets/workspace/sideBar/selectedFolder.svg";
import { SidebarContext } from "@/stores/sidebarContext";
import { FileListContainer, FolderContainer, FileContainer, FolderName,
  KebabWrapper, Kebab, KebabContainer, KebabItem, TopDropLine } from "@/styles/workspace/SideBar.styles";
import { useDrag } from "@/hooks/workspace/sidebar/useDrag";
import File from "@/components/workspace/Sidebar/File";

export default function Folder({ folder, nestedLevel = 0}:
  { folder: TFolderWithOptions; nestedLevel?: number; }) {

  const { toggleFolder, openFolder, onChange, onBlur, onKeyDown, changeName, deleteFolderOrFile } = useContext(SidebarContext);
  const { isKebabOpen, openKebab, closeKebab } = useKebab();
  const { isDragOverAfter, isDragOverBefore, onDragStart, onDragOver, onDragLeave, onDrop} = useDrag(folder);
  
  return (
    <FolderContainer>
      <FileContainer
        onClick={openFolder(folder)} $isFolder={true} $nestedLevel={nestedLevel} $isSelect={folder.isSelect} $dragOver={isDragOverAfter} $isEditing={folder.isEditing}
        onDragStart={onDragStart} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} draggable={true}
      >
        <TopDropLine $nestedLevel={nestedLevel} $active={isDragOverBefore} />
        {folder.isOpen && <OpendDropButton onClick={toggleFolder(folder)} />}
        {!folder.isOpen && <CloseDropButton onClick={toggleFolder(folder)} />}
        {folder.isSelect && <SeletedFolder />}
        {!folder.isSelect && <FolderIcon />}
        {!folder.isEditing&&<FolderName>{folder.folder_name}</FolderName>}
        {folder.isEditing&&
          <input type="text" value={folder.folder_name}
            onChange={onChange(folder)} onBlur={onBlur(folder)} onKeyDown={onKeyDown(folder)}
            autoFocus/>
        }
        <KebabWrapper tabIndex={0} onBlur={closeKebab}>
          <Kebab onClick={openKebab} />
          {isKebabOpen && <KebabContainer onClick={closeKebab}>
            <KebabItem onClick={changeName(folder)}>이름 변경</KebabItem>
            <KebabItem>복제하기</KebabItem>
            <KebabItem onClick={deleteFolderOrFile(folder)}>삭제하기</KebabItem>
          </KebabContainer>}
        </KebabWrapper>
      </FileContainer>
      <FileListContainer>
        {folder.isOpen&&folder.files.map((subFile, i) => {
          if (subFile.isFolder) {
            return <Folder key={i + 1} folder={subFile} nestedLevel={nestedLevel + 1}/>;
          }
          return <File key={i + 1} file={subFile} nestedLevel={nestedLevel + 1} />;
        })}
      </FileListContainer>
    </FolderContainer>
  );
}