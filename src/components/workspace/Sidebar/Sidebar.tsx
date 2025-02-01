"use client";
import useSidebar from "@/hooks/workspace/sidebar/useSidebar";
import { useRootDrag } from "@/hooks/workspace/sidebar/useDrag";
import FolderIcon from "@/assets/workspace/sideBar/addFolder.svg";
import FileIcon from "@/assets/workspace/sideBar/addFile.svg";
import SavingIcon from "@/assets/icons/saving.svg";
import {
  SidebarContainer,
  SidebarTitleContainer,
  SidebarTitle,
  SidebarIconContainer,
  SidebarContentsContainer,
  DropLine,
} from "@/styles/workspace/SideBar.styles";
import Folder from "@/components/workspace/Sidebar/Folder";
import File from "@/components/workspace/Sidebar/File";
import { SidebarContext } from "@/stores/sidebarContext";
import { SaveStatus } from "@/styles/workspace/Header.styles";
import { useContext } from "react";
import { WorkspaceLayoutContext } from "@/hooks/workspace/useWorkspaceLayout";

export default function Sidebar({ type }: { type: "plot" | "script" }) {
  const { sidebarRef } = useContext(WorkspaceLayoutContext);
  const hookValues = useSidebar(type);
  const {
    isLoading,
    error,
    rootFolder,
    createFolder,
    createFile,
    clearSelect,
    isCreatingDuplicate,
    isCreatingFile,
  } = hookValues;
  const { isDragOver, onDragOver, onDragLeave, onDrop } =
    useRootDrag(hookValues);

  return (
    <SidebarContext.Provider value={hookValues}>
      <SidebarContainer onClick={clearSelect} ref={sidebarRef}>
        <SidebarTitleContainer>
          <SidebarTitle>{type === "plot" ? "플롯" : "원고"}</SidebarTitle>
          <SaveStatus style={{ marginLeft: "10px" }}>
            {isCreatingDuplicate && "복제 중"}
            {isCreatingFile && "생성 중"}
          </SaveStatus>
          {(isCreatingDuplicate || isCreatingFile) && (
            <SavingIcon style={{ width: "18px" }} />
          )}
          <SidebarIconContainer>
            <FolderIcon
              onClick={createFolder}
              style={{ width: "36px", height: "36px" }}
            />
            <FileIcon
              onClick={createFile}
              style={{ width: "36px", height: "36px" }}
            />
          </SidebarIconContainer>
        </SidebarTitleContainer>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        <SidebarContentsContainer
          onClick={clearSelect}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {rootFolder &&
            rootFolder.files.map((file, i) => {
              if (file.isFolder) {
                return <Folder key={i + 1} folder={file} type={type} />;
              }
              return <File key={i + 1} file={file} type={type} />;
            })}
          <DropLine $active={isDragOver} />
        </SidebarContentsContainer>
      </SidebarContainer>
    </SidebarContext.Provider>
  );
}
