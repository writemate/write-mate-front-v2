"use client";
import { Loading } from "@/components/Loading";
import Popup from "@/components/Popup";
import { WarningModal } from "@/components/WarningModal";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { usePopup } from "@/hooks/usePopup";
import { useLogin } from "@/stores/useLogin";
import { BREAKPOINT_NUM } from "@/styles/media";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin } = useLogin();
  const router = useRouter();
  const { isOpenDeleteModal, onOpenWarningModal, closeWarningModal } =
    useWarningModal();

  useEffect(() => {
    if (window.innerWidth <= BREAKPOINT_NUM.tablet && !isOpenDeleteModal) {
      onOpenWarningModal();
    }
  }, [isLogin]);

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
    </>
  );
}
