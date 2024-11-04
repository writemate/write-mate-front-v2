"use client";
import {
  Title,
  NavigationBar,
  NavigationButton,
  TitleAndNavigationBar,
} from "@/styles/dashboard/TitleAndNavigationBar";

export function WorkStudioTitleAndNavigationBar({
  isInProgress,
  setIsInProgress,
}: {
  isInProgress: string;
  setIsInProgress: Function;
}) {
  return (
    <TitleAndNavigationBar>
      <Title>대시보드</Title>
      {/* Todo
      - 네비게이션 바 
      - 작업실 버튼
      */}
      <NavigationBar>
        <NavigationButton
          onClick={() => {
            setIsInProgress("진행 중");
          }}
          $isActivated={isInProgress == "진행 중" ? true : false}
        >
          집필 중
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            setIsInProgress("완결");
          }}
          $isActivated={isInProgress == "완결" ? true : false}
        >
          완결
        </NavigationButton>
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}

export function IdeaBoxTitleAndNavigationBar({
  isInProgress,
  setIsInProgress,
}: {
  isInProgress: string;
  setIsInProgress: Function;
}) {
  return (
    <TitleAndNavigationBar>
      <Title>아이디어 보관함</Title>
      <NavigationBar>
        <NavigationButton
          onClick={() => {
            setIsInProgress("메모");
          }}
          $isActivated={isInProgress == "메모" ? true : false}
        >
          메모
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            setIsInProgress("인물");
          }}
          $isActivated={isInProgress == "인물" ? true : false}
        >
          인물
        </NavigationButton>
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}
export function TrashTitleAndNavigationBar({
  isInProgress,
  setIsInProgress,
}: {
  isInProgress: string;
  setIsInProgress: Function;
}) {
  return (
    <TitleAndNavigationBar>
      <Title>휴지통</Title>
      <NavigationBar>
        <NavigationButton
          onClick={() => {
            setIsInProgress("");
          }}
          $isActivated={isInProgress == "작품" ? true : false}
        >
          작품
        </NavigationButton>
        {/* <NavigationButton
          onClick={() => {
            setIsInProgress("");
          }}
          $isActivated={isInProgress == "작품" ? true : false}
        >
          작품
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            setIsInProgress("");
          }}
          $isActivated={isInProgress == "작품" ? true : false}
        >
          작품
        </NavigationButton> */}
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}
