import {
  BottomArea,
  CopyrightNote,
  FooterContainer,
  FooterContent,
  PolicyLinks,
} from "@/styles/home/Footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <BottomArea>
          <PolicyLinks>
            <a href="https://write-mate-team.notion.site/400bc182b9824760be00ff8c4cbeee3e">
              개인정보 처리방침
            </a>{" "}
            |{" "}
            <a href="https://write-mate-team.notion.site/f33681bdc71647619d5b447ac417c86f?pvs=4">
              이용약관
            </a>
          </PolicyLinks>
          <CopyrightNote>
            &copy; Copyright 2023. write mate studio.
          </CopyrightNote>
        </BottomArea>
      </FooterContent>
    </FooterContainer>
  );
}
