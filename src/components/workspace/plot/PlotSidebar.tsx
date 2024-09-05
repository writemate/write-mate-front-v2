'use client';
import usePlotSidebar from "@/hooks/workspace/sidebar/usePlotSidebar";
import FolderIcon from "@/assets/workspace/sideBar/addFolder.svg";
import FileIcon from "@/assets/workspace/sideBar/addFile.svg";
import { SidebarContainer, SidebarTitleContainer, SidebarTitle, SidebarIconContainer, FileListContainer } from "@/styles/workspace/SideBar.styles";
import { Folder, File } from "@/components/workspace/SideBar";

export default function PlotSidebar() {
    const { rootFolder, isLoading, error, clearSelect, createFolder, createFile, ...hookValues } = usePlotSidebar();
    return (
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
            <FileListContainer>
                {rootFolder && rootFolder.files.map((file) => {
                    if (file.isFolder) {
                        return <Folder key={file.folder_name} folder={file} {...hookValues} />;
                    }
                    return <File key={file.file_name} file={file} />;
                })}
            </FileListContainer>
        </SidebarContainer>
    );
}
