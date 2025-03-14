import { useEffect, useRef } from "react";
import {
  CloseButton,
  Description,
  Footer,
  Note,
  Overlay,
  PopupContainer,
  PopupContent,
  StyledLink,
  Title,
  Highlight,
} from "@/styles/Popup.style";

type Info = {
  infoTitle: string;
  infoContent: string;
};

export default function Popup({
  closePopup,
  closePopupForOneDay,
  title,
  content,
  note = null,
  extraInfo,
  link = null,
  linkText = null,
  isButtonClick = false,
  isNoti = false,
}: {
  closePopup: () => void;
  closePopupForOneDay?: () => void;
  title: string;
  content: string;
  note?: string | null;
  extraInfo: Info[];
  link?: string | null;
  linkText?: string | null;
  isButtonClick?: boolean;
  isNoti?: boolean;
}) {
  const backRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Overlay
      ref={backRef}
      onClick={(e) => e.target === backRef.current && closePopup()}
    >
      <PopupContainer>
        <PopupContent>
          <Title $isNoti={isNoti}>{title}</Title>
          <Description>
            {content}
            <br />
            <br />
            {extraInfo.map((info) => (
              <div key={info.infoTitle}>
                <Highlight $isNoti={isNoti}>| {info.infoTitle} |</Highlight>
                <br />
                {info.infoContent}
              </div>
            ))}
            {note != null && <Note>{note}</Note>}
            <br />
          </Description>
          {link != null && (
            <StyledLink
              $isNoti={isNoti}
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              {linkText}
            </StyledLink>
          )}
        </PopupContent>
        <Footer>
          {!isButtonClick && (
            <CloseButton onClick={closePopupForOneDay}>
              24시간 동안 보지 않기
            </CloseButton>
          )}
          <CloseButton onClick={closePopup} style={{ marginLeft: "auto" }}>
            닫기
          </CloseButton>
        </Footer>
      </PopupContainer>
    </Overlay>
  );
}
