'use client'
import Link from "next/link";
import { TFolderWithOptions, TFileWithOptions } from "@/utils/APIs/types";
import OpendDropButton from "@/assets/workspace/sideBar/opendDropButton.svg";
import CloseDropButton from "@/assets/workspace/sideBar/closedDropButton.svg";
import FileIcon from "@/assets/workspace/sideBar/file.svg";
import FolderIcon from "@/assets/workspace/sideBar/folder.svg";
import Pin from "@/assets/workspace/sideBar/pin.svg";
import SeletedFolder from "@/assets/workspace/sideBar/selectedFolder.svg";
import SeletedFile from "@/assets/workspace/sideBar/selectedFile.svg";
import { FileListContainer, FileContainer, FileName, Kebab } from "@/styles/workspace/SideBar.styles";

interface IFolder {
  folder: TFolderWithOptions;
  nestedLevel?: number;
  toggleFolder: (folder: TFolderWithOptions) => (e: React.MouseEvent) => void;
  openFolder: (folder: TFolderWithOptions) => () => void;
  onChange: (folderOrfile: TFolderWithOptions | TFileWithOptions) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (folderOrfile: TFolderWithOptions | TFileWithOptions) => () => void;
}

export function Folder({ folder, nestedLevel = 0, toggleFolder, openFolder, onChange, onBlur }: IFolder) {
  return (
    <FileListContainer>
      <FileContainer onClick={openFolder(folder)} $isFolder={true} $nestedLevel={nestedLevel} $isSelect={folder.isSelect}>
        {folder.isOpen && <OpendDropButton onClick={toggleFolder(folder)} />}
        {!folder.isOpen && <CloseDropButton onClick={toggleFolder(folder)} />}
        {folder.isSelect && <SeletedFolder />}
        {!folder.isSelect && <FolderIcon />}
        {!folder.isEditing&&<FileName>{folder.folder_name}</FileName>}
        {folder.isEditing&&<input type="text" value={folder.folder_name} onChange={onChange(folder)} onBlur={onBlur(folder)} autoFocus/>}
        <Kebab />
      </FileContainer>
      <FileListContainer>
        {folder.isOpen&&folder.files.map((subFile, i) => {
          if (subFile.isFolder) {
            return <Folder key={i + 1} folder={subFile} nestedLevel={nestedLevel + 1} toggleFolder={toggleFolder} openFolder={openFolder} onChange={onChange} onBlur={onBlur} />;
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
  return (
    <FileContainer $isFolder={false} $nestedLevel={nestedLevel}>
      <FileIcon />
      <FileName>
        {file.file_name}
      </FileName>
      {file.isPinned&&<Pin />}
      <Kebab />
    </FileContainer>
  );
}
