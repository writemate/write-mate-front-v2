"use client";
import {
  HeaderContainer,
  HeaderLeftButton,
  HeaderRightButton,
  HeaderRightButtonList,
  HearderProfileButton,
  PopupButton,
} from "@/styles/dashboard/Header.style";
import Event from "@/assets/dashboard/header/event.svg";
import ResearchPanel from "@/assets/dashboard/header/researchPanel.svg";
import Profile from "@/assets/dashboard/header/profile.svg";
import Help from "@/assets/dashboard/header/help.svg";
import Chat from "@/assets/dashboard/header/chat.svg";
import Separator from "@/assets/dashboard/header/separator.svg";
import { MyPageContext } from "@/hooks/dashboard/useMyPage";
import { MyPageModal } from "./MyPageModal";
import { useContext } from "react";
import Popup from "../Popup";
import { ResearchPopup, ServerPopup } from "@/utils/popupMsg";
import { usePopup } from "@/hooks/usePopup";

export default function Header() {
  const { isOpenMyPage, onClickMyPage } = useContext(MyPageContext);
  const [
    isPopupOpen,
    openPopup,
    closePopup,
    closePopupForOneDay,
    isButtonClick,
  ] = usePopup(0);
  const [
    isServerPopupOpen,
    openServerPopup,
    closeServerPopup,
    closeServerPopupForOneDay,
    isServerButtonClick,
  ] = usePopup(1);

  return (
    <HeaderContainer>
      <HeaderLeftButton
        onClick={() => {
          window.open("https://promotion.write-mate.net/", "_blank");
        }}
      >
        <Event /> <p>이벤트 공지</p>
      </HeaderLeftButton>
      <HeaderLeftButton onClick={openServerPopup}>
        <p>서버 점검 안내</p>
      </HeaderLeftButton>
      {isServerPopupOpen && (
        <Popup
          isNoti={true}
          isButtonClick={isServerButtonClick}
          closePopup={closeServerPopup}
          closePopupForOneDay={closeServerPopupForOneDay}
          title={ServerPopup.title}
          content={ServerPopup.content}
          extraInfo={ServerPopup.extraInfo}
        ></Popup>
      )}
      <PopupButton onClick={openPopup}>
        <ResearchPanel /> <p>리서치 패널 모집</p>
      </PopupButton>
      {isPopupOpen && (
        <Popup
          title={ResearchPopup.title}
          content={ResearchPopup.content}
          note={ResearchPopup.note}
          link={ResearchPopup.link}
          linkText={ResearchPopup.linkText}
          extraInfo={ResearchPopup.extraInfo}
          closePopupForOneDay={closePopupForOneDay}
          isButtonClick={isButtonClick}
          closePopup={closePopup}
        />
      )}
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
