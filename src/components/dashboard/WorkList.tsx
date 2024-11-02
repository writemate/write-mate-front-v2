"use client";
import useDashboardData from "@/hooks/dashboard/useDashboardData";
import {
  WorkButtonList,
  WorkButton,
  WorkButtonImage,
  WorkButtonTitle,
  WorkButtonDate,
  WorkButtonKebab,
  KebabDropdownContainer,
  KebabDropdownButton,
} from "@/styles/dashboard/WorkList";
import KebabMenu from "@/assets/icons/KebabMenu.svg";
import { useEffect, useRef, useState } from "react";
import { event } from "@/utils/gtag";

export default function WorkList({ isInProgress }: { isInProgress: boolean }) {
  const { data, mutate, error, isLoading, isAdding } = useDashboardData();
  const [isKebabMenuOpenWork, setIsKebabMenuOpenWork] = useState("");
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
      {isLoading && <div>로딩중...</div>}
      {error && <div>에러 발생</div>}
      {data && (
        <WorkButtonList>
          {data.map((work, i) => (
            <WorkButton key={i + 1} href={`/${work.id}/info`} passHref>
              <WorkButtonImage src={work.cover} alt={work.title} />
              <WorkButtonTitle>{work.title}</WorkButtonTitle>
              <WorkButtonDate>
                {new Date(work.updatedAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </WorkButtonDate>
              <WorkButtonKebab
                $isOpen={isKebabMenuOpenWork === work.id}
                onClick={(event) => {
                  event.preventDefault();
                  setIsKebabMenuOpenWork(work.id);
                  console.log("button");
                }}
              >
                <KebabMenu />
              </WorkButtonKebab>
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
            </WorkButton>
          ))}
        </WorkButtonList>
      )}{" "}
    </>
  );
}
