"use client";
import {
  KebabDropdownContainer,
  KebabDropdownButton,
} from "@/styles/dashboard/DropdownMenu";
import { useEffect, useRef, useState } from "react";

export default function KebabDropdownMenu({
  isInProgress,
  work,
  isKebabMenuOpenWork,
  setIsKebabMenuOpenWork,
}: {
  isInProgress: boolean;
  work: { id: string; cover: string; title: string; updatedAt: string };
  isKebabMenuOpenWork: string;
  setIsKebabMenuOpenWork: (workId: string) => void;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} 선택됨`);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsKebabMenuOpenWork("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {isKebabMenuOpenWork === work.id && (
        <KebabDropdownContainer ref={menuRef}>
          <KebabDropdownButton
            onClick={(event) => {
              event.preventDefault();
              handleMenuItemClick("작품명 변경");
            }}
          >
            작품명 변경
          </KebabDropdownButton>
          <KebabDropdownButton
            onClick={(event) => {
              event.preventDefault();
              handleMenuItemClick("이미지 변경");
            }}
          >
            이미지 변경
          </KebabDropdownButton>
          <KebabDropdownButton
            onClick={(event) => {
              event.preventDefault();
              handleMenuItemClick("완결로 이동");
            }}
          >
            완결로 이동
          </KebabDropdownButton>
          <KebabDropdownButton
            $isMajor={true}
            $isLast={true}
            onClick={(event) => {
              event.preventDefault();
              handleMenuItemClick("작품 삭제");
            }}
          >
            작품 삭제
          </KebabDropdownButton>{" "}
        </KebabDropdownContainer>
      )}
    </>
  );
}
