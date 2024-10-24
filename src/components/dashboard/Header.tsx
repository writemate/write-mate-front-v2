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
      <HeaderLeftButton>
        <Event />
      </HeaderLeftButton>
      <HeaderRightButtonList>
        <HeaderRightButton>
          <Help />
        </HeaderRightButton>
        <HeaderRightButton>
          <Chat />
        </HeaderRightButton>
        <Separator />
        <HearderProfileButton>
          <Profile />
        </HearderProfileButton>
      </HeaderRightButtonList>
    </HeaderContainer>
  );
}
