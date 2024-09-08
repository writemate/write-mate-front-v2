'use client';
import { useContext } from "react";
import { useKebab } from "@/hooks/workspace/sidebar/useKebab";
import { TFolderWithOptions, TFileWithOptions } from "@/utils/APIs/types";
import OpendDropButton from "@/assets/workspace/sideBar/opendDropButton.svg";
import CloseDropButton from "@/assets/workspace/sideBar/closedDropButton.svg";
import FileIcon from "@/assets/workspace/sideBar/file.svg";
import FolderIcon from "@/assets/workspace/sideBar/folder.svg";
import Pin from "@/assets/workspace/sideBar/pin.svg";
import SeletedFolder from "@/assets/workspace/sideBar/selectedFolder.svg";
import { SidebarContext } from "@/stores/sidebarContext";
import SeletedFile from "@/assets/workspace/sideBar/selectedFile.svg";
import { FileListContainer, FolderContainer, FileContainer,FolderName, FileName, KebabWrapper, Kebab, KebabContainer, KebabItem } from "@/styles/workspace/SideBar.styles";

export function Folder({ folder, nestedLevel = 0}:
  { folder: TFolderWithOptions; nestedLevel?: number; }) {

  const { toggleFolder, openFolder, onChange, onBlur, onKeyDown, changeName, deleteFolderOrFile } = useContext(SidebarContext);
  const { isKebabOpen, openKebab, closeKebab } = useKebab();
  
  return (
    <FolderContainer>
      <FileContainer onClick={openFolder(folder)} $isFolder={true} $nestedLevel={nestedLevel} $isSelect={folder.isSelect}>
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
          else {
            return <File key={i + 1} file={subFile} nestedLevel={nestedLevel + 1} />;
          }
        })}
      </FileListContainer>
    </FolderContainer>
  );
}

export function File({ file, nestedLevel = 0 }: { file: TFileWithOptions, nestedLevel?: number }) {
  
  const { workspace_id, onChange, onBlur, onKeyDown, changeName, deleteFolderOrFile, setMainPlot  } = useContext(SidebarContext);
  const { isKebabOpen, openKebab, closeKebab } = useKebab();

  return (
    <FileContainer $isFolder={false} $nestedLevel={nestedLevel} $isSelect={file.isSelect}>
      {file.isSelect && <SeletedFile />}
      {!file.isSelect && <FileIcon />}
      {!file.isEditing && <FileName href={`/${workspace_id}/plot/${file._id}`}>{file.file_name}</FileName>}
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
          {!file.isPinned && <KebabItem onClick={setMainPlot(file)}>메인플롯으로 지정</KebabItem>}
          <KebabItem>복제하기</KebabItem>
          {!file.isPinned && <KebabItem onClick={deleteFolderOrFile(file)}>삭제하기</KebabItem>}
          {file.isPinned && <KebabItem>메인플롯 삭제 불가</KebabItem>}
        </KebabContainer>}
      </KebabWrapper>
    </FileContainer>
  );
}
