import { TFolder, TFolderWithOptions } from '@/utils/APIs/types';

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

export const recursiveFolderUnselect = (folder: TFolderWithOptions) => {
  folder.isSelect = false;
  folder.files.forEach((file) => {
    if (file.isFolder) {
      recursiveFolderUnselect(file);
    }
  });
};

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
