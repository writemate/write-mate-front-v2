"use client";
import {
  Title,
  NavigationBar,
  NavigationButton,
  TitleAndNavigationBar,
} from "@/styles/dashboard/TitleAndNavigationBar";

export default function Dashboard({
  isInProgress,
  setIsInProgress,
}: {
  isInProgress: boolean;
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
            setIsInProgress(true);
          }}
          $isActivated={isInProgress}
        >
          집필 중
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            setIsInProgress(false);
          }}
          $isActivated={!isInProgress}
        >
          완결
        </NavigationButton>
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}
