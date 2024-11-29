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
        isEditing: false,
      });
    }),
  };
};

export const recursiveUnselect = (folder: TFolderWithOptions|TFileWithOptions) => {
  if(!folder.isFolder) return;
  folder.isSelect = false;
  folder.files.forEach((file) => {
    recursiveUnselect(file);
  });
};

export const isExistSelect = (folder: TFolderWithOptions): boolean => {
  if(folder.isSelect) return true;
  return folder.files.reduce((acc, file) => {
    if(acc) return acc;
    if(!file.isFolder) return false;
    return isExistSelect(file);
  }, false);
}

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

export const isExistEditing = (folder: TFolderWithOptions): boolean => {
  if(folder.isEditing) return true;
  return folder.files.reduce((acc, file) => {
    if(acc) return acc;
    if(file.isFolder) return isExistEditing(file);
    return file.isEditing;
  }, false);
}
