'use client'
import Link from "next/link";
import { TFolderWithOpenOption,TFile } from "@/utils/APIs/types";

export function Folder({ folder, handleToggleFolder }: { folder: TFolderWithOpenOption, handleToggleFolder: (folder: TFolderWithOpenOption) => void }) {
    return (
        <div>
            <div onClick={() => handleToggleFolder(folder)}>
                {folder.isOpen ? '▼' : '▶'} {folder.folder_name}
            </div>
            {folder.isOpen && folder.files.map((subFile,i) => {
              if(subFile.isFolder){
                return <Folder key={i+1} folder={subFile} handleToggleFolder={handleToggleFolder} />
              }
              else{
                return <File key={i+1} file={subFile} />
              }
            })}
        </div>
    );
}

export function File({ file }: { file: TFile }) {
    return (
        <div>
            <Link href={`/workspace/${file._id}`}>
                {file.file_name}
            </Link>
        </div>
    );
}
