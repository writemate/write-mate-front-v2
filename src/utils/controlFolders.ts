import { TFileWithOptions, TFolder, TFolderWithOptions } from '@/utils/APIs/types';

export const recursiveFolderAddOptions = (folder: TFolder): TFolderWithOptions => {
  return {
    ...folder,
    isOpen: false,
    isSelect: false,
    isEditing: false,
    files: folder.files.map((file) => {
      if (file.isFolder) {
        return recursiveFolderAddOptions(file);
      }
      return ({
        ...file,
        isSelect: false,
        isEditing: false,
      });
    }),
  };
};

export const recursiveUnselect = (folder: TFolderWithOptions|TFileWithOptions) => {
  folder.isSelect = false;
  if(!folder.isFolder) return;
  folder.files.forEach((file) => {
    recursiveUnselect(file);
  });
};

export const currentFileSelect = (folderOrFile: TFolderWithOptions|TFileWithOptions, fileId: string) => {
  folderOrFile.isSelect = false;
  if(!folderOrFile.isFolder && folderOrFile._id === fileId){
    folderOrFile.isSelect = true;
  }
  if(!folderOrFile.isFolder) return;
  folderOrFile.files.forEach((file) => {
    currentFileSelect(file, fileId);
  });
};

export const recursiveFileUnpin = (folderOrFile: TFolderWithOptions|TFileWithOptions) => {
  if(!folderOrFile.isFolder){
    folderOrFile.isPinned = false;
    return;
  }
  folderOrFile.files.forEach((file) => {
    recursiveFileUnpin(file);
  });
}

export const recursiveFindParent = (folder: TFolderWithOptions, target: TFolderWithOptions|TFileWithOptions): TFolderWithOptions|null => {
  if(folder.files.includes(target)){
    return folder;
  }
  return folder.files.reduce((acc, file) => {
    if(acc) return acc;
    if(file.isFolder){
      return recursiveFindParent(file, target);
    }
    return null;
  }, null as TFolderWithOptions|null);
}

export const getSelectedFolder = (folder: TFolderWithOptions): TFolderWithOptions | null => {
  if (folder.isSelect) {
    return folder;
  }
  return folder.files.reduce((acc, file) => {
    if (acc) return acc;
    if (file.isFolder) {
      return getSelectedFolder(file);
    }
    return null;
  }, null as TFolderWithOptions | null);
};
