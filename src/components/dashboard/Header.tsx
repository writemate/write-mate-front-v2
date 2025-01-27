"use client";
import {
  HeaderContainer,
  HeaderLeftButton,
  HeaderRightButton,
  HeaderRightButtonList,
  HearderProfileButton,
} from "@/styles/dashboard/Header.style";
import Event from "@/assets/dashboard/header/event.svg";
import Profile from "@/assets/dashboard/header/profile.svg";
import Help from "@/assets/dashboard/header/help.svg";
import Chat from "@/assets/dashboard/header/chat.svg";
import Separator from "@/assets/dashboard/header/separator.svg";
import { MyPageContext } from "@/hooks/dashboard/useMyPage";
import { MyPageModal } from "./MyPageModal";
import { useContext } from "react";

export default function Header() {
  const { isOpenMyPage, onClickMyPage } = useContext(MyPageContext);

  return (
    <HeaderContainer>
      <HeaderLeftButton
        onClick={() => {
          window.open("https://promotion.write-mate.net/", "_blank");
        }}
      >
        <Event /> <p>이벤트 공지</p>
      </HeaderLeftButton>
      <HeaderRightButtonList>
        <HeaderRightButton
          onClick={() => {
            window.open("https://guide.write-mate.net/", "_blank");
          }}
        >
          <Help /> <p>도움말</p>
        </HeaderRightButton>
        <HeaderRightButton
          onClick={() => {
            window.open("http://pf.kakao.com/_lrfTG/chat", "_blank");
          }}
        >
          <Chat />
          <p>문의하기</p>
        </HeaderRightButton>
        <Separator />
        <HearderProfileButton onClick={onClickMyPage}>
          <Profile />
          <p>프로필</p>
        </HearderProfileButton>
        {isOpenMyPage && <MyPageModal />}
      </HeaderRightButtonList>
    </HeaderContainer>
  );
}
