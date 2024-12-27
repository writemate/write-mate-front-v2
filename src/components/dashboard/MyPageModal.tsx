import Modal from "../Modal";
import { useContext } from "react";
import { MyPageContext } from "@/hooks/dashboard/useMyPage";
import { MyPageContainer } from "@/styles/dashboard/MyPage";

export function MyPageModal() {
  const { closeModal, setIsOpenMyPage } = useContext(MyPageContext);

  return (
    <Modal
      closeModal={() => {
        setIsOpenMyPage(false);
      }}
      maxWidth="600px"
    >
      <MyPageContainer>
        <p>닫기 버튼</p>
        <p>이미지</p>
        <p>이름</p>
        <p>이메일</p>
        <p>집필중 작품 수</p>
        <p>완성 작품 수</p>
        <p>개인정보처리방침</p>
        <p>홈페이지 이용약관</p>
        <p>로그아웃</p>
      </MyPageContainer>
    </Modal>
  );
}
