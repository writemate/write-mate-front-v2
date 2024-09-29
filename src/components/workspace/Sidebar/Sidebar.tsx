'use client';
import useSidebar from "@/hooks/workspace/sidebar/useSidebar";
import { useRootDrag } from "@/hooks/workspace/sidebar/useDrag";
import FolderIcon from "@/assets/workspace/sideBar/addFolder.svg";
import FileIcon from "@/assets/workspace/sideBar/addFile.svg";
import { SidebarContainer, SidebarTitleContainer, SidebarTitle, SidebarIconContainer, SidebarContentsContainer, DropLine } from "@/styles/workspace/SideBar.styles";
import Folder from "@/components/workspace/Sidebar/Folder";
import File from "@/components/workspace/Sidebar/File";
import { SidebarContext } from "@/stores/sidebarContext";

export default function Sidebar() {
  const hookValues = useSidebar();
  const { isLoading, error, rootFolder, createFolder, createFile, clearSelect } = hookValues;
  const { isDragOver, onDragOver, onDragLeave, onDrop } = useRootDrag(hookValues);
  return (
    <SidebarContext.Provider value={hookValues}>
      <SidebarContainer onClick={clearSelect}>
        <SidebarTitleContainer>
          <SidebarTitle>플롯</SidebarTitle>
          <SidebarIconContainer>
            <FolderIcon onClick={createFolder} />
            <FileIcon onClick={createFile} />
          </SidebarIconContainer>
        </SidebarTitleContainer>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        <SidebarContentsContainer onClick={clearSelect} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
          {rootFolder && rootFolder.files.map((file) => {
            if (file.isFolder) {
              return <Folder key={file.folder_name} folder={file}/>;
            }
            return <File key={file.file_name} file={file} />;
          })}
          
          <DropLine $active={isDragOver} />
        </SidebarContentsContainer>
      </SidebarContainer>
    </SidebarContext.Provider>
  );
}
