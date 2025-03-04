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

export default function Popup({
  closePopup,
  closePopupForOneDay,
}: {
  closePopup: () => void;
  closePopupForOneDay?: () => void;
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
          <Title>
            라이트메이트
            <br />
            리서치 패널 모집
          </Title>
          <Description>
            더 나은 서비스를 만들기 위해 사용자분들의 소중한 의견을 듣고자
            합니다. <br />
            여러분의 경험을 바탕으로 한 피드백이 라이트메이트를 발전시키는
            원동력이 됩니다.
            <br />
            <br />
            <Highlight>| 리서치 패널 모집 안내 |</Highlight>
            <br />
            모집 기간: 2025년 3월 15일까지
            <br />
            인터뷰 진행: ZOOM을 통한 비대면 인터뷰 (약 1시간 소요)
            <br />
            참여 혜택: 인터뷰 참여시 최대 3만원 상당의 상품권 지급
            <br />
            참여 방법: 서비스를 사용하고, 사용 경험을 바탕으로 신청!
            <br />
            선정 안내: 추첨을 통해 선정된 분들께 개별 연락드립니다
            <br />
            <br />
            여러분의 소중한 의견으로 더 편리한 라이트메이트를 만들어가겠습니다.
            <br />
            <Note>
              ※ 수집된 개인정보는 패널 선정 및 인터뷰 진행 목적으로만 사용되며,
              이후 즉시 폐기됩니다.
            </Note>
            <br />
          </Description>
          <StyledLink
            href="https://forms.gle/FZF17AnsqWc2dPRT9"
            target="_blank"
            rel="noreferrer"
          >
            지금 바로 신청하기 →
          </StyledLink>
        </PopupContent>
        <Footer>
          {closePopupForOneDay && (
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
