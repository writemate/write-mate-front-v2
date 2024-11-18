"use client";
import { ChangeCoverInput, WorkButtonKebab } from "@/styles/dashboard/WorkList";
import { KebabContainer, KebabItem } from "@/styles/dashboard/Kebab";
import KebabMenu from "@/assets/icons/KebabMenu.svg";
import { useContext, useEffect, useRef } from "react";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { useWork } from "@/hooks/dashboard/useWork";

export default function WorkList({
  workValue,
  inputRef,
}: {
  workValue: {
    id: string;
    title: string;
    cover: string;
    updatedAt: string;
  };
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const {
    menuRef,
    excludeButtonRef,
    onChangeCategory,
    onChangeCover,
    onDeleteWork,
  } = useWork(workValue.id);
  const {
    workCategory,
    isKebabMenuOpenWork,
    handleKebabMenuOpenWork,
    handleEditing,
    openDeleteModal,
    setOpenDeleteModal,
    isDeleting,
    setIsDeleting,
  } = useContext(DashboardContext);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      excludeButtonRef.current &&
      !excludeButtonRef.current.contains(event.target as Node)
    ) {
      handleKebabMenuOpenWork("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ref = useRef<HTMLInputElement>(null);
  const onClickChangeCover = () => {
    ref.current?.click();
  };

  return (
    <>
      <WorkButtonKebab
        ref={excludeButtonRef}
        $isOpen={isKebabMenuOpenWork === workValue.id}
        onClick={(event) => {
          event.preventDefault();
          const newState =
            isKebabMenuOpenWork === workValue.id ? "" : workValue.id;
          handleKebabMenuOpenWork(newState);
        }}
      >
        <KebabMenu />
        {isKebabMenuOpenWork === workValue.id &&
          (workCategory === "ongoing" || workCategory === "completed") && (
            <KebabContainer ref={menuRef}>
              <KebabItem
                onClick={(event) => {
                  event.preventDefault();
                  handleEditing(workValue.id);
                  console.log(inputRef.current);
                  inputRef.current?.focus();
                }}
              >
                작품명 변경
              </KebabItem>
              <ChangeCoverInput
                type="file"
                accept="image/*"
                onChange={(event) => {
                  event.stopPropagation();
                  onChangeCover(event);
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                ref={ref}
              />
              <KebabItem
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onClickChangeCover();
                }}
              >
                표지 이미지 변경
              </KebabItem>
              {workCategory == "ongoing" && (
                <KebabItem
                  onClick={(event) => {
                    event.preventDefault();
                    onChangeCategory("completed");
                  }}
                >
                  완결로 변경
                </KebabItem>
              )}
              {workCategory == "completed" && (
                <KebabItem
                  onClick={(event) => {
                    event.preventDefault();
                    onChangeCategory("ongoing");
                  }}
                >
                  집필 중으로 변경
                </KebabItem>
              )}
              <KebabItem
                $isMajor={true}
                $isLast={true}
                onClick={(event) => {
                  event.preventDefault();
                  setIsDeleting(workValue.id);
                  setOpenDeleteModal(true);
                }}
              >
                휴지통으로 이동
              </KebabItem>
            </KebabContainer>
          )}
        {isKebabMenuOpenWork === workValue.id && workCategory == "trash" && (
          <KebabContainer ref={menuRef}>
            <KebabItem
              onClick={(event) => {
                event.preventDefault();
                onChangeCategory("completed");
              }}
            >
              완결로 복구
            </KebabItem>
            <KebabItem
              onClick={(event) => {
                event.preventDefault();
                onChangeCategory("ongoing");
              }}
            >
              집필 중으로 복구
            </KebabItem>
            <KebabItem
              $isMajor={true}
              $isLast={true}
              onClick={(event) => {
                event.preventDefault();
                onDeleteWork();
              }}
            >
              영구 삭제
            </KebabItem>
          </KebabContainer>
        )}
      </WorkButtonKebab>
    </>
  );
}
