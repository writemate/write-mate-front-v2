import {
  ColorableText,
  FeatureDescription,
  FeatureTitle,
  LoginButton,
  FeatureContainer,
} from "@/styles/home/Home.styles";

import * as Style from "@/styles/home/Home.styles";
import Link from "next/link";

export default function EndPage() {
  return (
    <FeatureContainer
      style={{
        flexDirection: "column",
        gap: "0.5rem 0",
        paddingBottom: "5rem",
      }}
      $background={true}
    >
      <FeatureDescription
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontWeight: "700" }}>라이트메이트</span>와 함께 이 모든
        것을
      </FeatureDescription>
      <FeatureTitle>
        <ColorableText $color={false}>지금 </ColorableText>
        <ColorableText $color={true}>무료로 </ColorableText>
        <ColorableText $color={false}>시작하세요!</ColorableText>
      </FeatureTitle>
      <LoginButton>
        <Link href="/signup">무료로 시작하기</Link>
      </LoginButton>
    </FeatureContainer>
  );
}
