'use client'
import Link from "next/link";
import { TFolderWithOpenOption, TFile } from "@/utils/APIs/types";
import OpendDropButton from "@/assets/workspace/sideBar/opendDropButton.svg";
import CloseDropButton from "@/assets/workspace/sideBar/closedDropButton.svg";
import FileIcon from "@/assets/workspace/sideBar/file.svg";
import FolderIcon from "@/assets/workspace/sideBar/folder.svg";
import Pin from "@/assets/workspace/sideBar/pin.svg";
import { FolderContainer, FileListContainer, FileContainer, FileName, Kebab } from "@/styles/workspace/SideBar.styles";

interface IFolder {
  folder: TFolderWithOpenOption;
  nestedLevel?: number;
  toggleFolder: (folder: TFolderWithOpenOption) => () => void;
  openFolder: (folder: TFolderWithOpenOption) => () => void;
}

export function Folder({ folder, nestedLevel = 0, toggleFolder, openFolder }: IFolder) {
  return (
    <FolderContainer>
      <FileContainer onClick={openFolder(folder)} $isFolder={true}>
        {folder.isOpen && <OpendDropButton onClick={toggleFolder(folder)}/>}
        {!folder.isOpen && <CloseDropButton onClick={toggleFolder(folder)}/>}
        <FolderIcon />
        <FileName>
          {folder.folder_name}
        </FileName>
        <Kebab />
      </FileContainer>
      <FileListContainer>
        {folder.files.map((subFile, i) => {
          if (subFile.isFolder) {
            return <Folder key={i + 1} folder={subFile} nestedLevel={nestedLevel + 1} toggleFolder={toggleFolder} openFolder={openFolder} />;
          }
          else {
            return <File key={i + 1} file={subFile} nestedLevel={nestedLevel + 1} />;
          }
        })}
      </FileListContainer>
    </FolderContainer>
  );
}

export function File({ file, nestedLevel = 0 }: { file: TFile, nestedLevel?: number }) {
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
