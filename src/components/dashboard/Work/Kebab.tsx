"use client";
import {
  ChangeCoverInput,
  KebabButton,
} from "@/styles/dashboard/Work/WorkList";
import { KebabContainer, KebabItem } from "@/styles/dashboard/Work/Kebab";
import { useContext } from "react";
import { KebabContext, useKebab } from "@/hooks/dashboard/work/useKebab";
import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { WarningModal } from "./WarningModal";

export const Kebab = ({
  workId,
  titleInputRef,
}: {
  workId: string;
  titleInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const { workCategory } = useContext(WorkCategoryContext);
  const useKebabValue = useKebab(workId, titleInputRef);
  const { isKebabOpen, onClickKebab, menuRef, onBlurKebab } = useKebabValue;

  return (
    <KebabContext.Provider value={useKebabValue}>
      <div tabIndex={0} onBlur={onBlurKebab}>
        <KebabButton $isOpen={isKebabOpen} onClick={onClickKebab} />
        {isKebabOpen && (
          <KebabContainer ref={menuRef}>
            {workCategory === "ongoing" && (
              <>
                <ChangeTitle />
                <ChangeCover />
                <ChangeCategory2Ongoing />
                <ChangeCategory2Trash />
              </>
            )}
            {workCategory === "completed" && (
              <>
                <ChangeTitle />
                <ChangeCover />
                <ChangeCategory2Ongoing />
                <ChangeCategory2Trash />
              </>
            )}
            {workCategory === "trash" && (
              <>
                <ChangeCategory2Ongoing />
                <ChangeCategory2Completed />
                <DeletePermanently />
              </>
            )}
          </KebabContainer>
        )}
      </div>
    </KebabContext.Provider>
  );
};

export const ChangeTitle = () => {
  const { onClickChangeTitle } = useContext(KebabContext);

  return <KebabItem onClick={onClickChangeTitle}>작품명 변경</KebabItem>;
};

export const ChangeCategory2Ongoing = () => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory("ongoing")}>
      집필중으로 변경
    </KebabItem>
  );
};
export const ChangeCategory2Completed = () => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory("completed")}>
      완결로 변경
    </KebabItem>
  );
};

export const ChangeCover = () => {
  const { imageInputRef, onClickChangeCover, onChangeCoverImage } =
    useContext(KebabContext);

  return (
    <>
      <ChangeCoverInput
        type="file"
        accept="image/*"
        onChange={onChangeCoverImage}
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={imageInputRef}
      />
      <KebabItem onClick={onClickChangeCover}>표지 이미지 변경</KebabItem>
    </>
  );
};

export const ChangeCategory2Trash = () => {
  // 휴지통으로 이동 버튼 + 버튼 누르면 모달 보임
  const {
    isOpenDeleteModal,
    closeModal,
    onClickOpenModal,
    onClickCancel,
    onClickChangeCategory,
  } = useContext(KebabContext);

  return (
    <>
      <KebabItem $isMajor={true} $isLast={true} onClick={onClickOpenModal}>
        휴지통으로 이동
      </KebabItem>
      {isOpenDeleteModal && (
        <WarningModal
          closeModal={closeModal}
          onClickConfirm={onClickChangeCategory("trash")}
          onClickCancel={onClickCancel}
          message={"작품을 휴지통으로 이동하시겠습니까?"}
          ConfirmButtonName={"이동"}
        />
      )}
    </>
  );
};

export const DeletePermanently = () => {
  // 영구 삭제 버튼 + 버튼 누르면 뜰 모달. 모달에서 버튼 누르면 삭제
  const { isOpenDeleteModal, onClickOpenModal, closeModal, onDeleteWork } =
    useContext(KebabContext);

  return (
    <>
      <KebabItem $isMajor={true} $isLast={true} onClick={onClickOpenModal}>
        영구 삭제
      </KebabItem>
      {isOpenDeleteModal && (
        <WarningModal
          closeModal={closeModal}
          onClickConfirm={onDeleteWork()}
          onClickCancel={closeModal}
          message={"작품을 영구 삭제하시겠습니까?"}
          ConfirmButtonName={"삭제"}
        />
      )}
    </>
  );
};
