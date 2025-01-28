"use client";
import { useContext, useState } from "react";
import { useKebab } from "@/hooks/workspace/sidebar/useKebab";
import { TFileWithOptions } from "@/utils/APIs/types";
import FileIcon from "@/assets/workspace/sideBar/file.svg";
import Pin from "@/assets/workspace/sideBar/pin.svg";
import { SidebarContext } from "@/stores/sidebarContext";
import SeletedFile from "@/assets/workspace/sideBar/selectedFile.svg";
import {
  FileContainer,
  FileName,
  KebabWrapper,
  Kebab,
  KebabContainer,
  KebabItem,
  TopDropLine,
  BottomDropLine,
} from "@/styles/workspace/SideBar.styles";
import { useDrag } from "@/hooks/workspace/sidebar/useDrag";
import { useParams } from "next/navigation";
import { WarningModal } from "@/components/WarningModal";

export default function File({
  file,
  nestedLevel = 0,
  type,
}: {
  file: TFileWithOptions;
  nestedLevel?: number;
  type: "plot" | "script";
}) {
  const {
    workspace_id,
    onBlur,
    onKeyDown,
    changeName,
    deleteFolderOrFile,
    setMainPlot,
    isSelectedFolderExist,
    onClickFile,
    duplicateFile,
  } = useContext(SidebarContext);
  const { isKebabOpen, openKebab, closeKebab } = useKebab();
  const {
    isDragOverAfter,
    isDragOverBefore,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  } = useDrag(file);
  const { plot_id, script_id } = useParams<{
    plot_id?: string;
    script_id?: string;
  }>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const isSelect = (() => {
    if (file.isEditing) return true;
    if (isSelectedFolderExist) return false;
    if (type === "plot") return plot_id === file.id;
    return script_id === file.id;
  })();

  return (
    <FileContainer
      $nestedLevel={nestedLevel}
      $isSelect={isSelect}
      $isEditing={file.isEditing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      draggable={true}
      onDrop={onDrop}
      onClick={onClickFile}
      href={`/${workspace_id}/${type}/${file.id}`}
    >
      <TopDropLine $nestedLevel={nestedLevel} $active={isDragOverBefore} />
      {isSelect && <SeletedFile />}
      {!isSelect && <FileIcon />}
      {!file.isEditing && <FileName>{file.file_name}</FileName>}
      {file.isEditing && (
        <input
          type="text"
          defaultValue={file.file_name}
          onBlur={onBlur(file)}
          onKeyDown={onKeyDown(file)}
          autoFocus
        />
      )}
      {file.isPinned && <Pin />}
      <KebabWrapper tabIndex={0} onBlur={closeKebab}>
        <Kebab onClick={openKebab} />
        {isKebabOpen && (
          <KebabContainer onClick={closeKebab}>
            <KebabItem onClick={changeName(file)}>이름 변경</KebabItem>
            {!file.isPinned && type === "plot" && (
              <KebabItem onClick={setMainPlot(file)}>
                메인플롯으로 지정
              </KebabItem>
            )}
            <KebabItem onClick={duplicateFile(file)}>복제하기</KebabItem>
            {!file.isPinned && (
              <KebabItem onClick={openDeleteModal}>삭제하기</KebabItem>
            )}
          </KebabContainer>
        )}
      </KebabWrapper>
      <BottomDropLine $nestedLevel={nestedLevel} $active={isDragOverAfter} />
      {deleteModalOpen && (
        <WarningModal
          closeModal={closeDeleteModal}
          onClickConfirm={deleteFolderOrFile(file)}
          onClickCancel={closeDeleteModal}
          messageKey="fileDelete"
          ConfirmButtonName="삭제"
        />
      )}
    </FileContainer>
  );
}
