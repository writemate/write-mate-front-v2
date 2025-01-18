"use client";
import { useLogin } from "@/stores/useLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  const { isLogin } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      router.push("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      {isLogin === null && <div>로딩중...</div>}
      {isLogin && children}
    </>
  );
}
