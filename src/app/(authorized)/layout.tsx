"use client";
import { Loading } from "@/components/Loading";
import { WarningModal } from "@/components/WarningModal";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { useLogin } from "@/stores/useLogin";
import { BREAKPOINT_NUM } from "@/styles/media";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin } = useLogin();
  const router = useRouter();
  const isMobile = window.innerWidth <= BREAKPOINT_NUM.tablet;
  const { isOpenDeleteModal, onOpenWarningModal, closeWarningModal } =
    useWarningModal();

  useEffect(() => {
    if (isMobile && isOpenDeleteModal) {
      onOpenWarningModal();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isLogin === false) {
      alert("로그인이 필요한 페이지입니다!");
      router.push("/signup");
    }
  }, [isLogin]);

  return (
    <>
      {isOpenDeleteModal && (
        <WarningModal
          messageKey="mobileAPPuse"
          onClickConfirm={closeWarningModal}
          onClickCancel={() => {
            closeWarningModal();
            router.back();
          }}
          closeModal={closeWarningModal}
        />
      )}
      {isLogin === null && <Loading />}
      {isLogin && children}
    </>
  );
}
