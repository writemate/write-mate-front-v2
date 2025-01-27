"use client";
import { Loading } from "@/components/Loading";
import { useLogin } from "@/stores/useLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      alert("로그인이 필요한 페이지입니다!");
      router.push("/signup");
    }
  }, [isLogin]);

  return (
    <>
      {isLogin === null && <Loading />}
      {isLogin && children}
    </>
  );
}
