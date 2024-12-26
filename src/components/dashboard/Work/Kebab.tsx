"use client";
import { KebabButton } from "@/styles/dashboard/Work/WorkList";
import { KebabContainer } from "@/styles/dashboard/Work/Kebab";
import { useContext } from "react";
import { KebabContext, useKebab } from "@/hooks/dashboard/work/kebab";
import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";
import {
  ChangeTitle,
  ChangeCover,
  ChangeCategory2Ongoing,
  ChangeCategory2Trash,
  ChangeCategory2Completed,
  DeletePermanently,
} from "./KebabItem";

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
