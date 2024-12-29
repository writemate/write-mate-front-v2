import { getMockUsage, getMockUser } from "@/utils/APIs/dashboard";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export function useMyPage() {
  const [isOpenMyPage, setIsOpenMyPage] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user", "mock"],
    queryFn: getMockUser,
  });

  const { data: usage } = useQuery({
    queryKey: ["usage", "mock"],
    queryFn: getMockUsage,
  });

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
    user,
    usage,
    isOpenMyPage,
    setIsOpenMyPage,
    onClickMyPage,
    closeModal,
  };
}

export const MyPageContext = createContext({} as ReturnType<typeof useMyPage>);
