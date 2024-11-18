"use client";
import { MainContainer } from "@/styles";
import { useLogin } from "@/stores/useLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signup() {
  const { isLogin, login } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      <MainContainer>
        <h1>회원가입</h1>
        <button onClick={login}>구글로 회원가입</button>
      </MainContainer>
    </>
  );
}
