"use client";
import { ChangeCoverInput, WorkButtonKebab } from "@/styles/dashboard/Work/WorkList";
import { KebabContainer, KebabItem } from "@/styles/dashboard/Work/Kebab";
import KebabMenu from "@/assets/icons/KebabMenu.svg";
import { useContext } from "react";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import useWork from "@/hooks/dashboard/useWork";
import { TWork } from "@/utils/APIs/types";

export default function WorkList({ workValue, inputRef }: { workValue: TWork; inputRef: React.RefObject<HTMLInputElement> }) {
  const { menuRef, excludeButtonRef, ref, onClickChangeCover, onClickChangeTitle, onClickChangeCategory, onClickChangeCoverInput, onChangeCoverInput } =
    useWork(workValue.id);
  const { workCategory, isKebabMenuOpenWork, handleKebabMenuOpenWork } = useContext(DashboardContext).workstudioAndTrash;
  const { onClickMoveToTrash, onClickDeleteWork } = useContext(DashboardContext).removeConfirmationModal;

  function workstudioKebabMenu() {
    return (
      (workCategory === "ongoing" || workCategory === "completed") && (
        <KebabContainer ref={menuRef}>
          <KebabItem onClick={onClickChangeTitle(inputRef)}>작품명 변경</KebabItem>
          <ChangeCoverInput type="file" accept="image/*" onChange={onChangeCoverInput} onClick={onClickChangeCoverInput} ref={ref} />
          <KebabItem onClick={onClickChangeCover}>표지 이미지 변경</KebabItem>
          {workCategory == "ongoing" && <KebabItem onClick={onClickChangeCategory("completed")}>완결로 변경</KebabItem>}
          {workCategory == "completed" && <KebabItem onClick={onClickChangeCategory("ongoing")}>집필 중으로 변경</KebabItem>}
          <KebabItem $isMajor={true} $isLast={true} onClick={onClickMoveToTrash(workValue.id)}>
            휴지통으로 이동
          </KebabItem>
        </KebabContainer>
      )
    );
  }

  function trashKebabMenu() {
    return (
      workCategory === "trash" && (
        <KebabContainer ref={menuRef}>
          <KebabItem onClick={onClickChangeCategory("completed")}>완결로 복구</KebabItem>
          <KebabItem onClick={onClickChangeCategory("ongoing")}>집필 중으로 복구</KebabItem>
          <KebabItem $isMajor={true} $isLast={true} onClick={onClickDeleteWork(workValue.id)}>
            영구 삭제
          </KebabItem>
        </KebabContainer>
      )
    );
  }

  return (
    <>
      <WorkButtonKebab
        ref={excludeButtonRef}
        $isOpen={isKebabMenuOpenWork === workValue.id}
        onClick={(event) => {
          event.preventDefault();
          const newState = isKebabMenuOpenWork === workValue.id ? "" : workValue.id;
          handleKebabMenuOpenWork(newState);
        }}
      >
        <KebabMenu />
        {isKebabMenuOpenWork === workValue.id && workstudioKebabMenu()}
        {isKebabMenuOpenWork === workValue.id && workCategory == "trash" && trashKebabMenu()}
      </WorkButtonKebab>
    </>
  );
}
