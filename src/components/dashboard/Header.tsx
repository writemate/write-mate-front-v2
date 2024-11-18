"use client";
import {
  HeaderLeftButton,
  HeaderContainer,
  HeaderRightButton,
  HearderProfileButton,
  HeaderRightButtonList,
} from "@/styles/dashboard/Header";

import Event from "@/assets/dashboard/header/event.svg";
import Profile from "@/assets/dashboard/header/profile.svg";
import Help from "@/assets/dashboard/header/help.svg";
import Chat from "@/assets/dashboard/header/chat.svg";
import Separator from "@/assets/dashboard/header/separator.svg";

export default function Header({}: {}) {
  return (
    <HeaderContainer>
      <HeaderLeftButton
        onClick={(event) => {
          window.open("https://promotion.write-mate.net/", "_blank");
        }}
      >
        <Event /> <p>이벤트 공지</p>
      </HeaderLeftButton>
      <HeaderRightButtonList>
        <HeaderRightButton
          onClick={(event) => {
            window.open("https://guide.write-mate.net/", "_blank");
          }}
        >
          <Help />
        </HeaderRightButton>
        <HeaderRightButton
          onClick={(event) => {
            window.open("http://pf.kakao.com/_lrfTG/chat", "_blank");
          }}
        >
          <Chat />
        </HeaderRightButton>
        <Separator />
        <HearderProfileButton
          onClick={(event) => {
            console.log("마이페이지");
          }}
        >
          <Profile />
        </HearderProfileButton>
      </HeaderRightButtonList>
    </HeaderContainer>
  );
}
