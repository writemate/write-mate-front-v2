import Modal from "../Modal";
import { useContext } from "react";
import { MyPageContext } from "@/hooks/dashboard/useMyPage";
import { getUsage } from "@/utils/APIs/dashboard";
import { getUserInfo } from "@/utils/APIs/user";
import { useQuery } from "@tanstack/react-query";
import {
  FooterContainer,
  HalfBackground,
  PolicyLinks,
  ModalContentAndFooterContainer,
  UsageContainer,
  UsageListContainer,
  UserImage,
  Logout,
  UserNameContainer,
  Name,
  EmailContainer,
  CloseButton,
} from "@/styles/dashboard/MyPage.style";
import { useLogin } from "@/stores/useLogin";
import { userQueryKeys } from "@/utils/APIs/queryKeys";
export function MyPageModal() {
  const { closeModal } = useContext(MyPageContext);
  const { data: user } = useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: getUserInfo,
  });

  const { data: usage } = useQuery({
    queryKey: userQueryKeys.usage(),
    queryFn: getUsage,
  });
  const logout = useLogin((state) => state.logout);

  return (
    <Modal closeModal={closeModal} maxWidth="450px" maxHeight="800px">
      <ModalContentAndFooterContainer>
        <HalfBackground />
        <CloseButton onClick={closeModal} />
        <UserImage $src={user?.user_image || ""} />
        <UserNameContainer>
          <Name>{user?.user_name}</Name>
          <p>작가님</p>
        </UserNameContainer>
        <EmailContainer>{user?.email}</EmailContainer>
        <UsageListContainer>
          <UsageContainer>
            {usage?.attendanceDays}
            <p>출석일 수</p>
          </UsageContainer>
          <UsageContainer>
            {usage?.allWorks}
            <p>전체 작품 수</p>
          </UsageContainer>
          <UsageContainer>
            {usage?.completedWorks}
            <p>완성 작품 수</p>
          </UsageContainer>
        </UsageListContainer>
        <FooterContainer>
          <PolicyLinks>
            <a
              href="https://write-mate-team.notion.site/400bc182b9824760be00ff8c4cbeee3e"
              onClick={() => {
                window.open(
                  "https://write-mate-team.notion.site/400bc182b9824760be00ff8c4cbeee3e",
                  "_blank"
                );
              }}
            >
              개인정보 처리방침
            </a>{" "}
            |{" "}
            <a
              href="https://write-mate-team.notion.site/f33681bdc71647619d5b447ac417c86f?pvs=4"
              onClick={() =>
                window.open(
                  "https://write-mate-team.notion.site/f33681bdc71647619d5b447ac417c86f?pvs=4",
                  "_blank"
                )
              }
            >
              이용약관
            </a>
          </PolicyLinks>
          <Logout onClick={logout}>로그아웃</Logout>
        </FooterContainer>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
