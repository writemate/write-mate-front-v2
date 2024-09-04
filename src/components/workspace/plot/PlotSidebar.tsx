'use client';
import { SidebarContainer } from "@/styles/workspace";
import usePlotSidebar from "@/hooks/workspace/sidebar/usePlotSidebar";
import Link from "next/link";
import { Folder, File } from "@/components/workspace/SideBar";

export default function PlotSidebar() {
    const { rootFolder, isLoading, error, handleToggleFolder } = usePlotSidebar();
    return (
        <SidebarContainer>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {rootFolder && rootFolder.map((file) => {
                if (file.isFolder) {
                    return <Folder key={file.folder_name} folder={file} handleToggleFolder={handleToggleFolder} />;
                }
                return <File key={file.file_name} file={file} />;
            })}
        </SidebarContainer>
    );
}
