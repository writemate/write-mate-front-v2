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
import { workspaceCategory } from "@/utils/APIs/types";

export const Kebab = ({
  workId,
  titleInputRef,
}: {
  workId: string;
  titleInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const { workCategory } = useContext(WorkCategoryContext);
  const useKebabValue = useKebab(workId);
  const { isKebabOpen, onClickKebab, menuRef, onBlurKebab } = useKebabValue;

  return (
    <KebabContext.Provider value={useKebabValue}>
      <div tabIndex={0} onBlur={onBlurKebab}>
        <KebabButton $isOpen={isKebabOpen} onClick={onClickKebab} />
        {isKebabOpen && (
          <KebabContainer ref={menuRef}>
            {workCategory === "ongoing" && (
              <>
                <ChangeTitle titleInputRef={titleInputRef} />
                <ChangeCover />
                <ChangeCategory
                  toBeCategory={"completed"}
                  message={"완결으로 변경"}
                />
                <ChangeCategory2Trash workId={workId} />
              </>
            )}
            {workCategory === "completed" && (
              <>
                <ChangeTitle titleInputRef={titleInputRef} />
                <ChangeCover />
                <ChangeCategory
                  toBeCategory={"ongoing"}
                  message={"집필중으로 변경"}
                />
                <ChangeCategory2Trash workId={workId} />
              </>
            )}
            {workCategory === "trash" && (
              <>
                <ChangeCategory
                  toBeCategory={"ongoing"}
                  message={"집필중으로 변경"}
                />
                <ChangeCategory
                  toBeCategory={"completed"}
                  message={"완결으로 변경"}
                />
                <DeletePermanently workId={workId} />
              </>
            )}
          </KebabContainer>
        )}
      </div>
    </KebabContext.Provider>
  );
};

export const ChangeTitle = ({
  titleInputRef,
}: {
  titleInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const { onClickChangeTitle } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeTitle(titleInputRef)}>
      작품명 변경
    </KebabItem>
  );
};

export const ChangeCategory = ({
  toBeCategory,
  message,
}: {
  toBeCategory: keyof typeof workspaceCategory;
  message: string;
}) => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory(toBeCategory)}>
      {message}
    </KebabItem>
  );
};

export const ChangeCategory2Trash = ({ workId }: { workId: string }) => {
  const { onClickMoveToTrash } =
    useContext(DashboardContext).removeConfirmationModal;
  return (
    <KebabItem
      $isMajor={true}
      $isLast={true}
      onClick={onClickMoveToTrash(workId)}
    >
      휴지통으로 이동
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

export const DeletePermanently = ({ workId }: { workId: string }) => {
  const { onClickDeleteWork } =
    useContext(DashboardContext).removeConfirmationModal;

  return (
    <KebabItem
      $isMajor={true}
      $isLast={true}
      onClick={onClickDeleteWork(workId)}
    >
      영구 삭제
    </KebabItem>
  );
};
