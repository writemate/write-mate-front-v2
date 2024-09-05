'use client'
import Link from "next/link";
import { useContext } from "react";
import { TFolderWithOptions, TFileWithOptions } from "@/utils/APIs/types";
import OpendDropButton from "@/assets/workspace/sideBar/opendDropButton.svg";
import CloseDropButton from "@/assets/workspace/sideBar/closedDropButton.svg";
import FileIcon from "@/assets/workspace/sideBar/file.svg";
import FolderIcon from "@/assets/workspace/sideBar/folder.svg";
import Pin from "@/assets/workspace/sideBar/pin.svg";
import SeletedFolder from "@/assets/workspace/sideBar/selectedFolder.svg";
import { SidebarContext } from "@/stores/sidebarContext";
import SeletedFile from "@/assets/workspace/sideBar/selectedFile.svg";
import { FileListContainer, FileContainer, FileName, Kebab } from "@/styles/workspace/SideBar.styles";


export function Folder({ folder, nestedLevel = 0}:
  { folder: TFolderWithOptions; nestedLevel?: number; }) {

  const { toggleFolder, openFolder, onChange, onBlur, onKeyDown } = useContext(SidebarContext);
  return (
    <FileListContainer>
      <FileContainer onClick={openFolder(folder)} $isFolder={true} $nestedLevel={nestedLevel} $isSelect={folder.isSelect}>
        {folder.isOpen && <OpendDropButton onClick={toggleFolder(folder)} />}
        {!folder.isOpen && <CloseDropButton onClick={toggleFolder(folder)} />}
        {folder.isSelect && <SeletedFolder />}
        {!folder.isSelect && <FolderIcon />}
        {!folder.isEditing&&<FileName>{folder.folder_name}</FileName>}
        {folder.isEditing&&
          <input type="text" value={folder.folder_name}
            onChange={onChange(folder)} onBlur={onBlur(folder)} onKeyDown={onKeyDown(folder)}
            autoFocus/>
        }
        <Kebab />
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
    </FileListContainer>
  );
}

export function File({ file, nestedLevel = 0 }: { file: TFileWithOptions, nestedLevel?: number }) {
  
  const { onChange, onBlur, onKeyDown } = useContext(SidebarContext);
  return (
    <FileContainer $isFolder={false} $nestedLevel={nestedLevel}>
      <FileIcon />
      {!file.isEditing && <FileName>{file.file_name}</FileName>}
      {file.isEditing &&
        <input type="text" value={file.file_name} 
          onChange={onChange(file)} onBlur={onBlur(file)} onKeyDown={onKeyDown(file)}
          autoFocus/>
      }
      {file.isPinned && <Pin />}
      <Kebab />
    </FileContainer>
  );
}
