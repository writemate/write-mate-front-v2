import { WorkspaceContainer } from "@/styles/workspace";
import styled from "styled-components";
import Logo from "@/assets/logoWithText.svg";
import SyncLoader from "react-spinners/SyncLoader";

export const Loading = () => {
  return (
    <WorkspaceContainer
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <StyledContainer>
        <SyncLoader size={30} speedMultiplier={0.8} color="#C55858" />
        <br />
        <StyledText>잠시만 기다려 주세요..</StyledText>
      </StyledContainer>
    </WorkspaceContainer>
  );
};

Loading.displayName = "Loading";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 120px;
`;
