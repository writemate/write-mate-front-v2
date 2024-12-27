import { createContext, useEffect, useState } from "react";

export function useMyPage() {
  const [isOpenMyPage, setIsOpenMyPage] = useState(false);

  const onClickMyPage = () => {
    setIsOpenMyPage(true);
  };

  const closeModal = () => {
    setIsOpenMyPage(false);
  };

  useEffect(() => {
    console.log("useMyPage", isOpenMyPage);
  }, [isOpenMyPage]);

  return {
    isOpenMyPage,
    setIsOpenMyPage,
    onClickMyPage,
    closeModal,
  };
}

export const MyPageContext = createContext({} as ReturnType<typeof useMyPage>);
